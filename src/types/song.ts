// specialType = 10 榜单
export interface TrackId {
  id: number;
  v: number;
  at: number;
  alg?: any;
  lr: number; // 上次排名
}

export interface Track {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: any[];
  pop: number;
  st: number;
  rt?: string;
  fee: number;
  v: number;
  crbt?: any;
  cf: string;
  al: Al;
  dt: number;
  h?: H;
  m?: H;
  l: H;
  a?: any;
  cd: string;
  no: number;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  noCopyrightRcmd?: any;
  rtype: number;
  rurl?: any;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}

export interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

export interface LyricData {
  sgc: boolean;
  sfy: boolean;
  qfy: boolean;
  transUser?: TransUser;
  lyricUser?: TransUser;
  lrc?: Lrc;
  klyric?: Lrc;
  tlyric?: Lrc;
  code: number;
  nolyric?: boolean;
}

export interface Lrc {
  version: number;
  lyric: string;
}

export interface TransUser {
  id: number;
  status: number;
  demand: number;
  userid: number;
  nickname: string;
  uptime: number;
}

export interface Lyric {
  time: number;
  value: string;
}

export interface ParsedLyricData {
  transUser?: TransUser;
  lyricUser?: TransUser;
  nolyric?: boolean;
  lrc?: Lyric[];
  klyric?: Lyric[];
  tlyric?: Lyric[];
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic_str?: string;
  pic: number;
}

export enum PlayMode {
  sequence = 0,
  random,
  loop,
}
