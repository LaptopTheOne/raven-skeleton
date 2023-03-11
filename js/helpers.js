class Helpers {
  static generateHistoryScopeUrl() {
    fetch('http://localhost:3000/api/oauth/authorization_token?scope=history').then(data => {
      return data.json()
    }).then(res => {
      console.log(res);
      window.location.replace(res);
    })
  }

  static testApiRequest() {
    fetch('https://api.github.com/repos/11ty/eleventy').then(data => {
      return data.json()
    }).then(res => console.log(res))
  }
}