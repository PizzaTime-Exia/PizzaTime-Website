import cookies from 'browser-cookies';
import config from './../../config.json';

class AuthService {
  static get connect() {
    window.location.replace(`${config.api.url}login`);
  }

  static get token() {
    return cookies.get('token');
  }

  static get isAuthentified() {
    return Boolean(AuthService.token);
  }

  static get username() {
    return cookies.get('username');
  }

  static diconnect() {
    cookies.erase('token');
    cookies.erase('username');
  }
}

export default AuthService;
