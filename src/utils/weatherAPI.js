export default class Api {
  constructor(baseUrl) {
    this._method = `GET`;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  request() {
    return fetch(this._baseUrl).then(this._checkResponse);
  }

  returnFeel(temp) {
    if (temp >= 70) {
      return "hot";
    } else if (temp >= 50 && temp <= 69) {
      return "warm";
    } else {
      return "cold";
    }
  }
}
