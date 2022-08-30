interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>;
}

export { IUser, IUserDocument };
