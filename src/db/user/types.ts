export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  tickets: [];
};

export enum UserRole {
  admin = "ADMIN",
  user = "USER"
}
