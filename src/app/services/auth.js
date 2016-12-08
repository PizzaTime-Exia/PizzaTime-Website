import cookies from 'browser-cookies';
import config from './../../config.json';
import api from './api';

class AuthService {
  static get signin() {
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

  static load() {
    api.defaults.headers.token = AuthService.token;
  }

  static connect(username, token) {
    cookies.set('username', username);
    cookies.set('token', token);
    api.defaults.headers.token = token;
    window.location.replace(`http://${window.location.host}/`);
  }

  static disconnect() {
    cookies.erase('token');
    cookies.erase('username');
    api.defaults.headers.token = '';
    window.location.replace(`http://${window.location.host}/`);
  }
}

export default AuthService;
