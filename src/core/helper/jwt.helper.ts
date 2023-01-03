import { JwtHelperService } from '@auth0/angular-jwt';
import { get } from 'lodash';

const helper = new JwtHelperService();
export const JWTDecodeMe = (token: string): any => helper.decodeToken(token);
