import jwt from 'jsonwebtoken';

type DecodeTokenType = {
  username: string;
  id: number;
  iat: number;
  exp: number;
};

export const createToken = ({
  username,
  id,
}: {
  username: string;
  id: number;
}) => {
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return token;
};

export const decodeToken = (token: string): DecodeTokenType | null =>
  jwt.decode(token) as DecodeTokenType | null;
