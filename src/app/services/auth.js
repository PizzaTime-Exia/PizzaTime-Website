class AuthService {
  static get authenticate() {
    return null;
  }

  static get isAuthentified() {
    return true;// Boolean(AuthService.user) && AuthService.user.id > -1;
  }

  static get user() {
    return null;
  }
}

export default AuthService;
