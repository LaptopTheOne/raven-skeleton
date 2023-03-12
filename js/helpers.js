class Helpers {
  static generateIdentityScopeUrl() {
    fetch('http://localhost:3000/api/oauth/authorization_token?scope=identity').then(data => {
      return data.json()
    }).then(res => {
      window.location.replace(res);
    })
  }

  static generateHistoryScopeUrl() {
    fetch('http://localhost:3000/api/oauth/authorization_token?scope=history').then(data => {
      return data.json()
    }).then(res => {
      window.location.replace(res);
    })
  }

  static testApiRequest() {
    fetch('https://api.github.com/repos/11ty/eleventy').then(data => {
      return data.json()
    }).then(res => console.log(res))
  }
}

const TOKEN_ID_KEY = 'identity-access-token'
const TOKEN_HISTORY_KEY = 'history-access-token'

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function checkQueryParams() {
  let params = (new URL(document.location)).searchParams;
  return params.has(TOKEN_ID_KEY) || params.has(TOKEN_HISTORY_KEY)
}

window.onload = function () {
  let params = (new URL(document.location)).searchParams;
  if (checkQueryParams()) {
    if (!getCookie(TOKEN_ID_KEY)) {
      let token = params.get(TOKEN_ID_KEY);
      if (token) {
        document.cookie = `${TOKEN_ID_KEY}=${token}; max-age=604800`;
      }
    }
    if (!getCookie(TOKEN_HISTORY_KEY)) {
      let token = params.get(TOKEN_HISTORY_KEY);
      if (token) {
        document.cookie = `${TOKEN_HISTORY_KEY}=${token}; max-age=604800`;
      }
    }
    // clear query params
    window.location.replace(document.location.origin);
  }
};