export interface IContext {
  req: any & { headers: { authorizations: string | null | undefined } };
  res: any;
  authUser: DecodeTokenType | null;
}

export type DecodeTokenType = {
  username: string;
  id: number;
  iat: number;
  exp: number;
};
