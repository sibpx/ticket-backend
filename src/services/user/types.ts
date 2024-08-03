import { User } from "db";

export interface IUserService {
  createUser(dto: CreateUserDto): Promise<User | void>;
  authorizeUser(dto: AuthorizeUserDto): Promise<string | void>;
  checkUniqueField(
    field: string,
    value: string,
    errorMessage: string
  ): Promise<void>;
  getUserById(id: string): Promise<User | void>;
}

export interface AuthorizeUserDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  regCode: string;
  password: string;
}
