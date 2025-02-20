import {User} from "../user/user";

export interface RegisterResponse {
  user: User,
  confirmationToken: string,
  refreshToken: string
}
