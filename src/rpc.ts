// AUTOGENERATED CODE, DO NOT EDIT
// tslint:disable

export interface ICallable {
  exec(service: keyof typeof Services, method: string, params: any): Promise<any>;
}
export class KVClient {

  constructor(private client: ICallable) {}

  /**
   * Range gets the keys in the range from the key-value store.
   */
  public range(req: IRangeRequest): Promise<IRangeResponse> {
    return this.client.exec('KV', 'Range', req);
  }

  /**
   * Put puts the given key into the key-value store.
   * A put request increments the revision of the key-value store
   * and generates one event in the event history.
   */
  public put(req: IPutRequest): Promise<IPutResponse> {
    return this.client.exec('KV', 'Put', req);
  }

  /**
   * DeleteRange deletes the given range from the key-value store.
   * A delete request increments the revision of the key-value store
   * and generates a delete event in the event history for every deleted key.
   */
  public deleteRange(req: IDeleteRangeRequest): Promise<IDeleteRangeResponse> {
    return this.client.exec('KV', 'DeleteRange', req);
  }

  /**
   * Txn processes multiple requests in a single transaction.
   * A txn request increments the revision of the key-value store
   * and generates events with the same revision for every completed request.
   * It is not allowed to modify the same key several times within one txn.
   */
  public txn(req: ITxnRequest): Promise<ITxnResponse> {
    return this.client.exec('KV', 'Txn', req);
  }

  /**
   * Compact compacts the event history in the etcd key-value store. The key-value
   * store should be periodically compacted or the event history will continue to grow
   * indefinitely.
   */
  public compact(req: ICompactionRequest): Promise<ICompactionResponse> {
    return this.client.exec('KV', 'Compact', req);
  }

}

export class WatchClient {

  constructor(private client: ICallable) {}

  /**
   * Watch watches for events happening or that have happened. Both input and output
   * are streams; the input stream is for creating and canceling watchers and the output
   * stream sends events. One watch RPC can watch on multiple key ranges, streaming events
   * for several watches at once. The entire event history can be watched starting from the
   * last compaction revision.
   */
  public watch(req: IWatchRequest): Promise<IWatchResponse> {
    return this.client.exec('Watch', 'Watch', req);
  }

}

export class LeaseClient {

  constructor(private client: ICallable) {}

  /**
   * LeaseGrant creates a lease which expires if the server does not receive a keepAlive
   * within a given time to live period. All keys attached to the lease will be expired and
   * deleted if the lease expires. Each expired key generates a delete event in the event history.
   */
  public leaseGrant(req: ILeaseGrantRequest): Promise<ILeaseGrantResponse> {
    return this.client.exec('Lease', 'LeaseGrant', req);
  }

  /**
   * LeaseRevoke revokes a lease. All keys attached to the lease will expire and be deleted.
   */
  public leaseRevoke(req: ILeaseRevokeRequest): Promise<ILeaseRevokeResponse> {
    return this.client.exec('Lease', 'LeaseRevoke', req);
  }

  /**
   * LeaseKeepAlive keeps the lease alive by streaming keep alive requests from the client
   * to the server and streaming keep alive responses from the server to the client.
   */
  public leaseKeepAlive(req: ILeaseKeepAliveRequest): Promise<ILeaseKeepAliveResponse> {
    return this.client.exec('Lease', 'LeaseKeepAlive', req);
  }

  /**
   * LeaseTimeToLive retrieves lease information.
   */
  public leaseTimeToLive(req: ILeaseTimeToLiveRequest): Promise<ILeaseTimeToLiveResponse> {
    return this.client.exec('Lease', 'LeaseTimeToLive', req);
  }

}

export class ClusterClient {

  constructor(private client: ICallable) {}

  /**
   * MemberAdd adds a member into the cluster.
   */
  public memberAdd(req: IMemberAddRequest): Promise<IMemberAddResponse> {
    return this.client.exec('Cluster', 'MemberAdd', req);
  }

  /**
   * MemberRemove removes an existing member from the cluster.
   */
  public memberRemove(req: IMemberRemoveRequest): Promise<IMemberRemoveResponse> {
    return this.client.exec('Cluster', 'MemberRemove', req);
  }

  /**
   * MemberUpdate updates the member configuration.
   */
  public memberUpdate(req: IMemberUpdateRequest): Promise<IMemberUpdateResponse> {
    return this.client.exec('Cluster', 'MemberUpdate', req);
  }

  /**
   * MemberList lists all the members in the cluster.
   */
  public memberList(): Promise<IMemberListResponse> {
    return this.client.exec('Cluster', 'MemberList', {});
  }

}

export class MaintenanceClient {

  constructor(private client: ICallable) {}

  /**
   * Alarm activates, deactivates, and queries alarms regarding cluster health.
   */
  public alarm(req: IAlarmRequest): Promise<IAlarmResponse> {
    return this.client.exec('Maintenance', 'Alarm', req);
  }

  /**
   * Status gets the status of the member.
   */
  public status(): Promise<IStatusResponse> {
    return this.client.exec('Maintenance', 'Status', {});
  }

  /**
   * Defragment defragments a member's backend database to recover storage space.
   */
  public defragment(): Promise<IDefragmentResponse> {
    return this.client.exec('Maintenance', 'Defragment', {});
  }

  /**
   * Hash returns the hash of the local KV state for consistency checking purpose.
   * This is designed for testing; do not use this in production when there
   * are ongoing transactions.
   */
  public hash(): Promise<IHashResponse> {
    return this.client.exec('Maintenance', 'Hash', {});
  }

  /**
   * Snapshot sends a snapshot of the entire backend from a member over a stream to a client.
   */
  public snapshot(): Promise<ISnapshotResponse> {
    return this.client.exec('Maintenance', 'Snapshot', {});
  }

}

export class AuthClient {

  constructor(private client: ICallable) {}

  /**
   * AuthEnable enables authentication.
   */
  public authEnable(): Promise<IAuthEnableResponse> {
    return this.client.exec('Auth', 'AuthEnable', {});
  }

  /**
   * AuthDisable disables authentication.
   */
  public authDisable(): Promise<IAuthDisableResponse> {
    return this.client.exec('Auth', 'AuthDisable', {});
  }

  /**
   * Authenticate processes an authenticate request.
   */
  public authenticate(req: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    return this.client.exec('Auth', 'Authenticate', req);
  }

  /**
   * UserAdd adds a new user.
   */
  public userAdd(req: IAuthUserAddRequest): Promise<IAuthUserAddResponse> {
    return this.client.exec('Auth', 'UserAdd', req);
  }

  /**
   * UserGet gets detailed user information.
   */
  public userGet(req: IAuthUserGetRequest): Promise<IAuthUserGetResponse> {
    return this.client.exec('Auth', 'UserGet', req);
  }

  /**
   * UserList gets a list of all users.
   */
  public userList(): Promise<IAuthUserListResponse> {
    return this.client.exec('Auth', 'UserList', {});
  }

  /**
   * UserDelete deletes a specified user.
   */
  public userDelete(req: IAuthUserDeleteRequest): Promise<IAuthUserDeleteResponse> {
    return this.client.exec('Auth', 'UserDelete', req);
  }

  /**
   * UserChangePassword changes the password of a specified user.
   */
  public userChangePassword(req: IAuthUserChangePasswordRequest): Promise<IAuthUserChangePasswordResponse> {
    return this.client.exec('Auth', 'UserChangePassword', req);
  }

  /**
   * UserGrant grants a role to a specified user.
   */
  public userGrantRole(req: IAuthUserGrantRoleRequest): Promise<IAuthUserGrantRoleResponse> {
    return this.client.exec('Auth', 'UserGrantRole', req);
  }

  /**
   * UserRevokeRole revokes a role of specified user.
   */
  public userRevokeRole(req: IAuthUserRevokeRoleRequest): Promise<IAuthUserRevokeRoleResponse> {
    return this.client.exec('Auth', 'UserRevokeRole', req);
  }

  /**
   * RoleAdd adds a new role.
   */
  public roleAdd(req: IAuthRoleAddRequest): Promise<IAuthRoleAddResponse> {
    return this.client.exec('Auth', 'RoleAdd', req);
  }

  /**
   * RoleGet gets detailed role information.
   */
  public roleGet(req: IAuthRoleGetRequest): Promise<IAuthRoleGetResponse> {
    return this.client.exec('Auth', 'RoleGet', req);
  }

  /**
   * RoleList gets lists of all roles.
   */
  public roleList(): Promise<IAuthRoleListResponse> {
    return this.client.exec('Auth', 'RoleList', {});
  }

  /**
   * RoleDelete deletes a specified role.
   */
  public roleDelete(req: IAuthRoleDeleteRequest): Promise<IAuthRoleDeleteResponse> {
    return this.client.exec('Auth', 'RoleDelete', req);
  }

  /**
   * RoleGrantPermission grants a permission of a specified key or range to a specified role.
   */
  public roleGrantPermission(req: IAuthRoleGrantPermissionRequest): Promise<IAuthRoleGrantPermissionResponse> {
    return this.client.exec('Auth', 'RoleGrantPermission', req);
  }

  /**
   * RoleRevokePermission revokes a key or range permission of a specified role.
   */
  public roleRevokePermission(req: IAuthRoleRevokePermissionRequest): Promise<IAuthRoleRevokePermissionResponse> {
    return this.client.exec('Auth', 'RoleRevokePermission', req);
  }

}

export interface IResponseHeader {
  clusterId?: number;
  memberId?: number;
  /**
   * revision is the key-value store revision when the request was applied.
   */
  revision?: number;
  /**
   * raftTerm is the current raft term of the responding member.
   */
  raftTerm?: number;
}

export enum SortOrder {
  /**
   * default, no sorting
   */
  NONE = 0,
  /**
   * lowest target value first
   */
  ASCEND = 1,
  /**
   * highest target value first
   */
  DESCEND = 2,
}

export enum SortTarget {
  KEY = 0,
  VERSION = 1,
  CREATE = 2,
  MOD = 3,
  VALUE = 4,
}

export interface IRangeRequest {
  /**
   * key is the first key for the range. If range_end is not given, the request only looks up key.
   */
  key?: string | Buffer | Uint8Array;
  rangeEnd?: string | Buffer | Uint8Array;
  /**
   * limit is a limit on the number of keys returned for the request. When limit is set to 0,
   */
  limit?: number;
  /**
   * revision is the point-in-time of the key-value store to use for the range.
   */
  revision?: number;
  sortOrder?: SortOrder;
  sortTarget?: SortTarget;
  /**
   * serializable sets the range request to use serializable member-local reads.
   */
  serializable?: boolean;
  keysOnly?: boolean;
  countOnly?: boolean;
  minModRevision?: number;
  maxModRevision?: number;
  minCreateRevision?: number;
  maxCreateRevision?: number;
}

export interface IRangeResponse {
  header?: IResponseHeader;
  /**
   * kvs is the list of key-value pairs matched by the range request.
   */
  kvs?: IKeyValue;
  /**
   * more indicates if there are more keys to return in the requested range.
   */
  more?: boolean;
  /**
   * kvs is empty when count is requested.
   */
  count?: number;
}

export interface IPutRequest {
  /**
   * key is the key, in bytes, to put into the key-value store.
   */
  key?: string | Buffer | Uint8Array;
  /**
   * key is the key, in bytes, to put into the key-value store.
   */
  value?: string | Buffer | Uint8Array;
  /**
   * lease is the lease ID to associate with the key in the key-value store. A lease
   */
  lease?: number;
  prevKv?: boolean;
  ignoreValue?: boolean;
  ignoreLease?: boolean;
}

export interface IPutResponse {
  header?: IResponseHeader;
  prevKv?: IKeyValue;
}

export interface IDeleteRangeRequest {
  /**
   * key is the first key to delete in the range.
   */
  key?: string | Buffer | Uint8Array;
  rangeEnd?: string | Buffer | Uint8Array;
  prevKv?: boolean;
}

export interface IDeleteRangeResponse {
  header?: IResponseHeader;
  /**
   * deleted is the number of keys deleted by the delete range request.
   */
  deleted?: number;
  prevKvs?: IKeyValue;
}

export interface IRequestOp {
  requestRange?: IRangeRequest;
  requestPut?: IPutRequest;
  requestDeleteRange?: IDeleteRangeRequest;
}

export interface IResponseOp {
  responseRange?: IRangeResponse;
  responsePut?: IPutResponse;
  responseDeleteRange?: IDeleteRangeResponse;
}

export enum CompareResult {
  EQUAL = 0,
  GREATER = 1,
  LESS = 2,
  NOT_EQUAL = 3,
}

export enum CompareTarget {
  VERSION = 0,
  CREATE = 1,
  MOD = 2,
  VALUE = 3,
}

export interface ICompare {
  /**
   * result is logical comparison operation for this comparison.
   */
  result?: CompareResult;
  /**
   * target is the key-value field to inspect for the comparison.
   */
  target?: CompareTarget;
  /**
   * target is the key-value field to inspect for the comparison.
   */
  key?: string | Buffer | Uint8Array;
  /**
   * version is the version of the given key
   */
  version?: number;
  createRevision?: number;
  modRevision?: number;
  /**
   * target is the key-value field to inspect for the comparison.
   */
  value?: string | Buffer | Uint8Array;
}

export interface ITxnRequest {
  /**
   * compare is a list of predicates representing a conjunction of terms.
   */
  compare?: ICompare;
  /**
   * If the comparisons succeed, then the success requests will be processed in order,
   */
  success?: IRequestOp;
  /**
   * If the comparisons fail, then the failure requests will be processed in order,
   */
  failure?: IRequestOp;
}

export interface ITxnResponse {
  header?: IResponseHeader;
  /**
   * succeeded is set to true if the compare evaluated to true or false otherwise.
   */
  succeeded?: boolean;
  /**
   * responses is a list of responses corresponding to the results from applying
   */
  responses?: IResponseOp;
}

export interface ICompactionRequest {
  /**
   * revision is the key-value store revision for the compaction operation. 
   */
  revision?: number;
  /**
   * physical is set so the RPC will wait until the compaction is physically
   */
  physical?: boolean;
}

export interface ICompactionResponse {
  header?: IResponseHeader;
}

export interface IHashResponse {
  header?: IResponseHeader;
  /**
   * hash is the hash value computed from the responding member's key-value store.
   */
  hash?: number;
}

export interface ISnapshotResponse {
  /**
   * header has the current key-value store information. The first header in the snapshot
   */
  header?: IResponseHeader;
  remainingBytes?: number;
  /**
   * remaining_bytes is the number of blob bytes to be sent after this message
   */
  blob?: string | Buffer | Uint8Array;
}

export interface IWatchRequest {
  createRequest?: IWatchCreateRequest;
  cancelRequest?: IWatchCancelRequest;
}

export enum FilterType {
  /**
   * filter out put event.
   */
  NOPUT = 0,
  /**
   * filter out delete event.
   */
  NODELETE = 1,
}

export interface IWatchCreateRequest {
  /**
   * key is the key to register for watching.
   */
  key?: string | Buffer | Uint8Array;
  rangeEnd?: string | Buffer | Uint8Array;
  startRevision?: number;
  progressNotify?: boolean;
  /**
   * filters filter the events at server side before it sends back to the watcher.
   */
  filters?: FilterType;
  prevKv?: boolean;
}

export interface IWatchCancelRequest {
  watchId?: number;
}

export interface IWatchResponse {
  header?: IResponseHeader;
  watchId?: number;
  /**
   * created is set to true if the response is for a create watch request.
   */
  created?: boolean;
  /**
   * canceled is set to true if the response is for a cancel watch request.
   */
  canceled?: boolean;
  compactRevision?: number;
  /**
   * The client should record the watch_id and expect to receive events for
   */
  events?: IEvent;
}

export interface ILeaseGrantRequest {
  /**
   * TTL is the advisory time-to-live in seconds.
   */
  TTL?: number;
  /**
   * ID is the requested ID for the lease. If ID is set to 0, the lessor chooses an ID.
   */
  ID?: number;
}

export interface ILeaseGrantResponse {
  header?: IResponseHeader;
  /**
   * ID is the lease ID for the granted lease.
   */
  ID?: number;
  /**
   * TTL is the server chosen lease time-to-live in seconds.
   */
  TTL?: number;
  error?: string;
}

export interface ILeaseRevokeRequest {
  /**
   * ID is the lease ID to revoke. When the ID is revoked, all associated keys will be deleted.
   */
  ID?: number;
}

export interface ILeaseRevokeResponse {
  header?: IResponseHeader;
}

export interface ILeaseKeepAliveRequest {
  /**
   * ID is the lease ID for the lease to keep alive.
   */
  ID?: number;
}

export interface ILeaseKeepAliveResponse {
  header?: IResponseHeader;
  /**
   * ID is the lease ID from the keep alive request.
   */
  ID?: number;
  /**
   * TTL is the new time-to-live for the lease.
   */
  TTL?: number;
}

export interface ILeaseTimeToLiveRequest {
  /**
   * ID is the lease ID for the lease.
   */
  ID?: number;
  /**
   * keys is true to query all the keys attached to this lease.
   */
  keys?: boolean;
}

export interface ILeaseTimeToLiveResponse {
  header?: IResponseHeader;
  /**
   * ID is the lease ID from the keep alive request.
   */
  ID?: number;
  /**
   * TTL is the remaining TTL in seconds for the lease; the lease will expire in under TTL+1 seconds.
   */
  TTL?: number;
  /**
   * GrantedTTL is the initial granted time in seconds upon lease creation/renewal.
   */
  grantedTTL?: number;
  /**
   * Keys is the list of keys attached to this lease.
   */
  keys?: string | Buffer | Uint8Array;
}

export interface IMember {
  /**
   * ID is the member ID for this member.
   */
  ID?: number;
  /**
   * name is the human-readable name of the member. If the member is not started, the name will be an empty string.
   */
  name?: string;
  /**
   * peerURLs is the list of URLs the member exposes to the cluster for communication.
   */
  peerURLs?: string;
  /**
   * clientURLs is the list of URLs the member exposes to clients for communication. If the member is not started, clientURLs will be empty.
   */
  clientURLs?: string;
}

export interface IMemberAddRequest {
  /**
   * peerURLs is the list of URLs the added member will use to communicate with the cluster.
   */
  peerURLs?: string;
}

export interface IMemberAddResponse {
  header?: IResponseHeader;
  /**
   * member is the member information for the added member.
   */
  member?: IMember;
}

export interface IMemberRemoveRequest {
  /**
   * ID is the member ID of the member to remove.
   */
  ID?: number;
}

export interface IMemberRemoveResponse {
  header?: IResponseHeader;
}

export interface IMemberUpdateRequest {
  /**
   * ID is the member ID of the member to update.
   */
  ID?: number;
  /**
   * peerURLs is the new list of URLs the member will use to communicate with the cluster.
   */
  peerURLs?: string;
}

export interface IMemberUpdateResponse {
  header?: IResponseHeader;
}

export interface IMemberListResponse {
  header?: IResponseHeader;
  /**
   * members is a list of all members associated with the cluster.
   */
  members?: IMember;
}

export interface IDefragmentResponse {
  header?: IResponseHeader;
}

export enum AlarmType {
  /**
   * default, no sorting
   */
  NONE = 0,
  /**
   * space quota is exhausted
   */
  NOSPACE = 1,
}

export enum AlarmAction {
  GET = 0,
  ACTIVATE = 1,
  DEACTIVATE = 2,
}

export interface IAlarmRequest {
  /**
   * action is the kind of alarm request to issue. The action
   */
  action?: AlarmAction;
  /**
   * memberID is the ID of the member associated with the alarm. If memberID is 0, the
   */
  memberID?: number;
  /**
   * action is the kind of alarm request to issue. The action
   */
  alarm?: AlarmType;
}

export interface IAlarmMember {
  /**
   * memberID is the ID of the member associated with the raised alarm.
   */
  memberID?: number;
  /**
   * memberID is the ID of the member associated with the raised alarm.
   */
  alarm?: AlarmType;
}

export interface IAlarmResponse {
  header?: IResponseHeader;
  /**
   * alarms is a list of alarms associated with the alarm request.
   */
  alarms?: IAlarmMember;
}

export interface IStatusResponse {
  header?: IResponseHeader;
  /**
   * version is the cluster protocol version used by the responding member.
   */
  version?: string;
  /**
   * dbSize is the size of the backend database, in bytes, of the responding member.
   */
  dbSize?: number;
  /**
   * leader is the member ID which the responding member believes is the current leader.
   */
  leader?: number;
  /**
   * raftIndex is the current raft index of the responding member.
   */
  raftIndex?: number;
  /**
   * raftTerm is the current raft term of the responding member.
   */
  raftTerm?: number;
}

export interface IAuthenticateRequest {
  name?: string;
  password?: string;
}

export interface IAuthUserAddRequest {
  name?: string;
  password?: string;
}

export interface IAuthUserGetRequest {
  name?: string;
}

export interface IAuthUserDeleteRequest {
  /**
   * name is the name of the user to delete.
   */
  name?: string;
}

export interface IAuthUserChangePasswordRequest {
  /**
   * name is the name of the user whose password is being changed.
   */
  name?: string;
  /**
   * name is the name of the user whose password is being changed.
   */
  password?: string;
}

export interface IAuthUserGrantRoleRequest {
  /**
   * user is the name of the user which should be granted a given role.
   */
  user?: string;
  /**
   * user is the name of the user which should be granted a given role.
   */
  role?: string;
}

export interface IAuthUserRevokeRoleRequest {
  name?: string;
  role?: string;
}

export interface IAuthRoleAddRequest {
  /**
   * name is the name of the role to add to the authentication system.
   */
  name?: string;
}

export interface IAuthRoleGetRequest {
  role?: string;
}

export interface IAuthRoleDeleteRequest {
  role?: string;
}

export interface IAuthRoleGrantPermissionRequest {
  /**
   * name is the name of the role which will be granted the permission.
   */
  name?: string;
  /**
   * name is the name of the role which will be granted the permission.
   */
  perm?: IPermission;
}

export interface IAuthRoleRevokePermissionRequest {
  role?: string;
  key?: string;
  rangeEnd?: string;
}

export interface IAuthEnableResponse {
  header?: IResponseHeader;
}

export interface IAuthDisableResponse {
  header?: IResponseHeader;
}

export interface IAuthenticateResponse {
  header?: IResponseHeader;
  /**
   * token is an authorized token that can be used in succeeding RPCs
   */
  token?: string;
}

export interface IAuthUserAddResponse {
  header?: IResponseHeader;
}

export interface IAuthUserGetResponse {
  header?: IResponseHeader;
  roles?: string;
}

export interface IAuthUserDeleteResponse {
  header?: IResponseHeader;
}

export interface IAuthUserChangePasswordResponse {
  header?: IResponseHeader;
}

export interface IAuthUserGrantRoleResponse {
  header?: IResponseHeader;
}

export interface IAuthUserRevokeRoleResponse {
  header?: IResponseHeader;
}

export interface IAuthRoleAddResponse {
  header?: IResponseHeader;
}

export interface IAuthRoleGetResponse {
  header?: IResponseHeader;
  perm?: IPermission;
}

export interface IAuthRoleListResponse {
  header?: IResponseHeader;
  roles?: string;
}

export interface IAuthUserListResponse {
  header?: IResponseHeader;
  users?: string;
}

export interface IAuthRoleDeleteResponse {
  header?: IResponseHeader;
}

export interface IAuthRoleGrantPermissionResponse {
  header?: IResponseHeader;
}

export interface IAuthRoleRevokePermissionResponse {
  header?: IResponseHeader;
}

export interface IKeyValue {
  /**
   * Range gets the keys in the range from the key-value store.
   */
  key?: string | Buffer | Uint8Array;
  createRevision?: number;
  modRevision?: number;
  /**
   * version is the version of the given key
   */
  version?: number;
  /**
   * Range gets the keys in the range from the key-value store.
   */
  value?: string | Buffer | Uint8Array;
  /**
   * LeaseGrant creates a lease which expires if the server does not receive a keepAlive
   */
  lease?: number;
}

export enum EventType {
  /**
   * filter out put event.
   */
  PUT = 0,
  /**
   * filter out delete event.
   */
  DELETE = 1,
}

export interface IEvent {
  /**
   * request is a union of request types accepted by a transaction.
   */
  type?: EventType;
  kv?: IKeyValue;
  prevKv?: IKeyValue;
}

export interface IUser {
  /**
   * name is the human-readable name of the member. If the member is not started, the name will be an empty string.
   */
  name?: string | Buffer | Uint8Array;
  /**
   * UserChangePassword changes the password of a specified user.
   */
  password?: string | Buffer | Uint8Array;
  /**
   * RoleList gets lists of all roles.
   */
  roles?: string;
}

export enum PermissionType {
  READ = 0,
  WRITE = 1,
  READWRITE = 2,
}

export interface IPermission {
  permType?: PermissionType;
  /**
   * Range gets the keys in the range from the key-value store.
   */
  key?: string | Buffer | Uint8Array;
  rangeEnd?: string | Buffer | Uint8Array;
}

export interface IRole {
  /**
   * name is the human-readable name of the member. If the member is not started, the name will be an empty string.
   */
  name?: string | Buffer | Uint8Array;
  keyPermission?: IPermission;
}

export const Services = {
  KV: KVClient,
  Watch: WatchClient,
  Lease: LeaseClient,
  Cluster: ClusterClient,
  Maintenance: MaintenanceClient,
  Auth: AuthClient,
};
