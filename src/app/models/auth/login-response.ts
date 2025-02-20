import {User} from "../user/user";

export interface LoginResponse {
  user: User,
  accessToken: string,
  refreshToken: string
}
