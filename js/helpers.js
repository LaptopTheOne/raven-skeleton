const TOKEN_ID_KEY = 'identity-access-token'
const TOKEN_HISTORY_KEY = 'history-access-token'
const USERNAME_KEY = 'username'

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
        document.cookie = `${USERNAME_KEY}=${username}; max-age=604800`;
        document.querySelector('menu-bar').setUserDetails(username, avatarSrc);
      })
    }
  }

  static getSavedItems() {
    if (getCookie(TOKEN_HISTORY_KEY) && getCookie(USERNAME_KEY)) {
      fetch(`http://localhost:3001/api/history/get-saved-items?token=${getCookie(TOKEN_HISTORY_KEY)}&username=${getCookie(USERNAME_KEY)}`).then(data => {
        return data.json()
      }).then(res => {
        document.querySelector('#raven-history-saved-items').savedItems = res;
        console.log(res)
      })
    }
  }

  static testApiRequest() {
    fetch('https://api.github.com/repos/11ty/eleventy').then(data => {
      return data.json()
    }).then(res => console.log(res))
  }

  static testHistoryUI() {
    document.querySelector('#raven-history-saved-items').savedItems = [{
      "subreddit": "rubyonrails",
      "title": "Ryan Bates (Railscasts) has surfaced!",
      "link_flair_text": null,
      "url": "https://www.reddit.com/r/rubyonrails/comments/11jkghr/ryan_bates_railscasts_has_surfaced/"
    }, {
      "subreddit": "redditdev",
      "title": "How to do a reddit search using API ? Not a subreddit search",
      "link_flair_text": "Reddit API",
      "url": "https://www.reddit.com/r/redditdev/comments/z10wzz/how_to_do_a_reddit_search_using_api_not_a/"
    }, {
      "subreddit": "CharruaDevs",
      "title": "Layoffs, recesión? Despidos masivos en ENDAVA? Escucharon algo?",
      "link_flair_text": "Opinión/Debate",
      "url": "https://www.reddit.com/r/CharruaDevs/comments/10ytwbc/layoffs_recesión_despidos_masivos_en_endava/"
    }];
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