export enum StatusAction {
  lanched = "LANCHED",
  INTERCEPT = "INTERCEPT",
  hit = "HIT",
}

export interface Iaction {
  _id: string;
  teroristId: string;
  userId: string;
  status: StatusAction;
  target: string;
  timeHit: number;
  misseilName:string
}
