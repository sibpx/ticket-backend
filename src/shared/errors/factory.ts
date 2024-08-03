import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from "./constructors";

export function createBadRequestError(msg: string) {
  return new BadRequestError(msg);
}
export function createConflictError(msg: string) {
  return new ConflictError(msg);
}
export function createForbiddenError(msg: string) {
  return new ForbiddenError(msg);
}
export function createInternalError(msg: string) {
  return new InternalError(msg);
}
export function createNotFoundError(msg: string) {
  return new NotFoundError(msg);
}
export function createUnauthorizedError(msg: string) {
  return new UnauthorizedError(msg);
}
