interface IPayload {
  userId: string;
  name: string;
  role: Role;
}

type CreateJWT = ({ payload: IPayload }) => string;

type IsTokenValid = ({ token: string }) => JwtPayload;

type AttachCookiesToResponse = ({
  res: RequestHandler,
  payload: IPayload,
}) => void;

export { IPayload, CreateJWT, IsTokenValid, AttachCookiesToResponse };
