const template = document.createElement('template');

template.innerHTML = `
  <div style="color:red">
    Hello Weather App
  </div>
`

class WeatherCard extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    var xmlHttp = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=b86d21440d8c9a110912a2eb0845abb4`
    xmlHttp.open( "GET", url , false );
    xmlHttp.send( null );
    console.log(xmlHttp.responseText)
    this.$card = this._shadowRoot.querySelector('div');
    let responseObj = JSON.parse(xmlHttp.responseText);
    let $townName = document.createElement('p');
    $townName.innerHTML = `Town: ${responseObj.name}`;
    this._shadowRoot.appendChild($townName);
    let $temperature =  document.createElement('p');
    $temperature.innerHTML = `${parseInt(responseObj.main.temp - 273)} &deg;C`
    this._shadowRoot.appendChild($temperature);
  }

  get longitude() {
    return this.getAttribute('longitude');
  }

  get latitude() {
    return this.getAttribute('latitude');
  }
}

window.customElements.define('weather-card', WeatherCard);