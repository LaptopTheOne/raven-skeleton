const TOKEN_ID_KEY = 'identity-access-token';
const TOKEN_HISTORY_KEY = 'history-access-token';
const USERNAME_KEY = 'username';
const AVATAR_KEY = 'avatar-src';
const MAX_COOKIE_AGE = 604800

import { testData } from './test-data.js';

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

  static getAboutMe() {
    if (getCookie(TOKEN_ID_KEY)) {
      fetch(`http://localhost:3000/api/identity/me?token=${getCookie(TOKEN_ID_KEY)}`).then(data => {
        return data.json()
      }).then(res => {
        let username = res['name'];
        let avatarSrc = res['snoovatar_img'];
        document.cookie = `${USERNAME_KEY}=${username}; max-age=${MAX_COOKIE_AGE}`;
        document.cookie = `${AVATAR_KEY}=${avatarSrc}; max-age=${MAX_COOKIE_AGE}`;
        setUsernameAndAvatar(username, avatarSrc);
        // clear query params
        window.location.replace(document.location.origin);
      })
    }
  }

  static getSavedItems() {
    if (getCookie(TOKEN_HISTORY_KEY) && getCookie(USERNAME_KEY)) {
      document.querySelector('#raven-history-saved-items').redditHistoryToken = getCookie(TOKEN_HISTORY_KEY);
      document.querySelector('#raven-history-saved-items').username = getCookie(USERNAME_KEY);
    }
  }

  static testApiRequest() {
    fetch('https://api.github.com/repos/11ty/eleventy').then(data => {
      return data.json()
    }).then(res => console.log(res))
  }

  static testHistoryUI() {
    document.querySelector('#raven-history-saved-items').savedItems = testData
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function checkQueryParams() {
  let params = (new URL(document.location)).searchParams;
  return params.has(TOKEN_ID_KEY) || params.has(TOKEN_HISTORY_KEY)
}

function setUsernameAndAvatar(username, avatarSrc) {
  document.querySelector('menu-bar').setUserDetails(username, avatarSrc);
}

function showWelcomeMessage() {
  if (getCookie(TOKEN_ID_KEY) && getCookie(USERNAME_KEY) && getCookie(AVATAR_KEY)) {
    document.getElementsByTagName('body')[0].removeChild(document.getElementById('home-text'))
    const welcomeMessage = document.createElement("div");
    welcomeMessage.className = 'home-text-container'
    const textMessage = document.createTextNode(`Welcome ${getCookie(USERNAME_KEY)}`);
    welcomeMessage.appendChild(textMessage);
    document.getElementsByTagName('body')[0].appendChild(welcomeMessage);
  }
  document.getElementsByClassName('home-text-container').style = "display: flex"
}

window.onload = function () {
  let params = (new URL(document.location)).searchParams;
  if (checkQueryParams()) {
    if (!getCookie(TOKEN_ID_KEY)) {
      let token = params.get(TOKEN_ID_KEY);
      if (token) {
        document.cookie = `${TOKEN_ID_KEY}=${token}; max-age=${MAX_COOKIE_AGE}`;
        if (!getCookie(USERNAME_KEY) || !getCookie(AVATAR_KEY)) {
          Helpers.getAboutMe();
        }
      }
    }
    if (!getCookie(TOKEN_HISTORY_KEY)) {
      let token = params.get(TOKEN_HISTORY_KEY);
      if (token) {
        document.cookie = `${TOKEN_HISTORY_KEY}=${token}; max-age=${MAX_COOKIE_AGE}`;
        // clear query params
        window.location.replace(document.location.origin);
      }
    }
  } else {
    if (getCookie(USERNAME_KEY) && getCookie(AVATAR_KEY)) {
      setUsernameAndAvatar(getCookie(USERNAME_KEY), getCookie(AVATAR_KEY));
    }
    if (window.location.pathname == '/history/') {
      if (!getCookie(TOKEN_HISTORY_KEY)) {
        Helpers.generateHistoryScopeUrl();
      } else {
        Helpers.getSavedItems();
      }
    } else {
      // root
      showWelcomeMessage();
    }
  }
};
