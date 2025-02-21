import { User } from "../user/user";

export class AuthResponse {
  user: User;
  token: string;
  refreshToken: string;

  constructor(user: User, accessToken: string, refreshToken: string) {
    this.user = user;
    this.token = accessToken;
    this.refreshToken = refreshToken;
  }
}
