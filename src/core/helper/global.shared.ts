import { JWTDecodeMe } from '../helper/jwt.helper';

class globalClass {
  private _me: any = {};
  private _token: string = '';
  private _refreshToken: string = '';

  initToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      if (!Object.keys(this._me).length) {
        this._me = JWTDecodeMe(token);
      }
      this._token = token;
    }

    return this._token;
  }

  setToken(data: string) {
    localStorage.setItem('token', data);
    this._me = JWTDecodeMe(data);
    this._token = data;
  }

  setRefreshToken(data: string) {
    localStorage.setItem('refreshToken', data);
    this._refreshToken = data;
  }

  get me(): any {
    const token = localStorage.getItem('token') || '';
    this._me = JWTDecodeMe(token.toString());
    return this._me;
  }

  get token(): string {
    return this._token;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._me = {};
    this._token = '';
    this._refreshToken = '';
  }
}

const obj = new globalClass();
export const global = obj;
