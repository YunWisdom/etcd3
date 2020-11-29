import { expect } from 'chai';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { Election, Etcd3 } from '../';
import { Campaign } from '../election';
import { EtcdNotLeaderError } from '../errors';
import { delay } from '../util';
import { getOptions, tearDownTestClient } from './util';

const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t));

describe('election', () => {
  let client: Etcd3;
  let election: Election;
  let campaign: Campaign;

  beforeEach(async () => {
    client = new Etcd3(getOptions());
    election = new Election(client, 'test-election', 1);
    campaign = await election.campaign('candidate').wait();
  });

  afterEach(async () => {
    await campaign.resign();
    await tearDownTestClient(client);
  });

  describe('campaign', () => {
    it('should wait for elected in campaign', async () => {
      const client2 = new Etcd3(getOptions());
      const election2 = new Election(client2, 'test-election', 1);

      const client3 = new Etcd3(getOptions());
      const election3 = new Election(client3, 'test-election', 1);

      /**
       * phase 0: client elected
       * phase 1: client resigned, client2 elected
       * phase 2: client2 resigned, client3 elected
       */
      let phase = 0;

      const campaign2 = election2.campaign('candidate2');
      const waitElection2 = campaign2
        .wait()
        .then(() => election.leader())
        .then(leader => {
          expect(phase).to.equal(1);
          expect(leader).to.equal('candidate2');
        });

      // essure client2 has joined campaign before client3
      await sleep(100);

      const campaign3 = election3.campaign('candidate3');
      const waitElection3 = campaign3
        .wait()
        .then(() => election.leader())
        .then(leader => {
          expect(phase).to.equal(2);
          expect(leader).to.equal('candidate3');
        });

      // ensure client3 joined campaign
      await sleep(100);

      phase = 1;

      await campaign.resign();

      // ensure client2 and client3 watcher triggered
      await sleep(100);

      phase = 2;

      await campaign2.resign();

      await sleep(100);

      await campaign3.resign();

      await Promise.all([waitElection2, waitElection3]);
    });

    it('should proclaim initial value', async () => {
      const key = await campaign.getCampaignKey();
      const oldValue = await client.get(key);
      expect(oldValue).to.equal('candidate');
    });
  });

  describe('proclaim', () => {
    it('should update if campaign', async () => {
      const key = await campaign.getCampaignKey();
      const oldValue = await client.get(key);
      expect(oldValue).to.equal('candidate');

      await campaign.proclaim('new-candidate');
      const newValue = await client.get(key);
      expect(newValue).to.equal('new-candidate');
    });

    it('should not update if resigned', async () => {
      await campaign.resign();
      await expect(campaign.proclaim('new-candidate')).to.eventually.be.rejectedWith(
        EtcdNotLeaderError,
      );
    });

    it('should not update key was tampered with', async () => {
      await client.delete().key(await campaign.getCampaignKey());
      await expect(campaign.proclaim('new-candidate')).to.eventually.be.rejectedWith(
        EtcdNotLeaderError,
      );
    });

    it('should proclaim changes during initial publish', async () => {
      await campaign.resign();

      campaign = election.campaign('old-value');
      const key = await campaign.getCampaignKey(); // wait until initial is running

      await campaign.proclaim('new-value');
      expect(await client.get(key).string()).to.equal('new-value');
    });
  });

  describe('getLeader', () => {
    it('should return leader value', async () => {
      expect(await election.leader()).to.equal('candidate');
    });

    it('return undefined no leader', async () => {
      await campaign.resign();
      expect(await election.leader()).to.be.undefined;
    });
  });

  describe('observe', () => {
    it('emits when existing leader resigns and other in queue', async () => {
      const client2 = new Etcd3(getOptions());
      const election2 = new Election(client2, 'test-election', 1);

      const observer = await election.observe();
      const changeEvent = fromEvent(observer, 'change');

      expect(observer.leader()).to.equal('candidate');

      const waitElection2 = election2.campaign('candidate2');
      while ((await client2.getAll().prefix('election').keys()).length < 2) {
        await delay(5);
      }

      const [newLeader] = await Promise.all([
        changeEvent.pipe(take(1)).toPromise(),
        campaign.resign(),
        waitElection2,
      ]);

      expect(newLeader).to.equal('candidate2');
      await observer.cancel();
    });

    it('emits when leader steps down', async () => {
      const observer = await election.observe();
      expect(observer.leader()).to.equal('candidate');

      const changeEvent = fromEvent(observer, 'change');
      const [newLeader] = await Promise.all([
        changeEvent.pipe(take(1)).toPromise(),
        campaign.resign(),
      ]);

      expect(newLeader).to.be.undefined;
    });

    it('emits when leader is newly elected', async () => {
      await campaign.resign();

      const observer = await election.observe();
      const changeEvent = fromEvent(observer, 'change');

      expect(observer.leader()).to.be.undefined;

      const campaign2 = election.campaign('candidate');
      const [, newLeader] = await Promise.all([
        campaign2.wait(),
        changeEvent.pipe(take(1)).toPromise(),
      ]);

      expect(newLeader).to.equal('candidate');
      campaign2.resign();
      await observer.cancel();
    });
  });
});