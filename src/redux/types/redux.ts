import { Iaction } from "./Iaction";
import { Iuser } from "./Iuser";

export enum DataStatus {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    IDEL = 'IDEL'
  }

  export interface userState {
    error: string | null;
    status: DataStatus;
    data: Iuser | null;
  }

  export interface actionState {
    error: string | null;
    status: DataStatus;
    data: Iaction[];
  }