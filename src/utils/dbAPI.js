export default class DbApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._options = {
      method: "",
      headers: {
        "Content-type": "application/json",
        authorization: "",
      },
      body: null,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _reset() {
    this._options.method = "";
    this._options.body = null;
    this._options.headers.authorization = null;
  }

  _request(url) {
    return fetch(this._baseUrl + url, this._options)
      .then(this._checkResponse)
      .finally(() => {
        this._reset();
      });
  }

  _fetch = (endpoint, how) => {
    this._options.method = how;
    return this._request(endpoint);
  };

  _send = (endpoint, parcel, how) => {
    this._options.method = how;
    this._options.body = JSON.stringify(parcel);
    return this._request(endpoint);
  };

  getImages() {
    return this._fetch("/items", "GET");
  }

  postImage(parcel) {
    return this._send("/items", parcel, "POST");
  }

  deleteImage(id) {
    return this._fetch(`/items/${id}`, "DELETE");
  }

  //like stuff
  addLike(cardId, userInfo) {
    return this._send(`/items/${cardId}/likes`, { user: userInfo }, "PUT");
  }

  removeLike(cardId, userInfo) {
    return this._send(`/items/${cardId}/likes`, { user: userInfo }, "DELETE");
  }

  changeProfile(parcel) {
    return this._send("/users/me", parcel, "PATCH");
  }
}
