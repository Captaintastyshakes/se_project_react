import DbApi from "./dbAPI.js";

export default class AuthorizationApi extends DbApi {
  constructor(url) {
    super(url); //I use the unique functions of this object class somewhat rarely but it seemed more parsimonious to just use this in almost all the places I would normally call the base api
    this._defImage = "https://www.notarealurl.com"; //whenever users signup their avatar should be defaulted as this essentially useless value which will then prompt the header component to use their first initial as a placeholder.
  }

  signUp(userData) {
    const { name, avatar = this._defImage, email, password } = userData;
    return this._send("/signup", { name, avatar, email, password }, "POST");
  }

  signIn(userData) {
    const { email, password } = userData;
    return this._send("/signin", { email, password }, "POST");
  }

  setToken(token) {
    this._options.headers.authorization = `Bearer ${token}`;
  } //this function is maybe better understood as, "let's check in the token," as a way of dissociating it from an actual asynchronous function- all it's doing really is modifying the headers of the next request after it's called.
  //I've modified the base api call to reset/wipeout this header as a security measure, if that's a concern.

  userCheck() {
    return this._fetch("/users/me", "GET");
  }
}
