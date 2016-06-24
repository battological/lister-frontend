var Token = {
  tokenId: 'token',

  getToken: function() {
    return localStorage.getItem(this.tokenId);
  },

  getPayload(token) {
    return JSON.parse(window.atob(token.split('.')[1]));
  },

  getValidToken: function() {
    var token = this.getToken();
    if (token) {
      var expires = this.getPayload(token).exp;
      if (expires < Math.floor(Date.now() / 1000)) {
        token = null;
        localStorage.removeItem(this.tokenId);
      }
    }
    return token;
  },

  setToken: function(token) {
    localStorage.setItem(this.tokenId, token);
    return token;
  },

  removeToken: function() {
    localStorage.removeItem(this.tokenId);
    return null;
  }
}

module.exports = Token;
