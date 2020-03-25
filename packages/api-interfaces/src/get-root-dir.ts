import {
  Response,
} from './common'

export type GetRootDirEndpoint = '/get-root-dir'
export const getRootDirEndpoint: GetRootDirEndpoint = '/get-root-dir'

export interface GetRootDirResponse extends Response<string> {}
