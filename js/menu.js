const menuTemplate = document.createElement('template');

menuTemplate.innerHTML = `
  <style>
  #menu-bar {
    color: #e0e1e2;
    display:flex;
    align-items: center;
  }

  #menu-button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding-right: 4px;
  }

  .menu-items-container {
    overflow: hidden;
    display:flex;
    width: 25%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s linear;
  }

  .show-menu-items-container {
    pointer-events: auto;
    opacity: 1;
  }

  .menu-item {
    padding-left: 4px;
    padding-right: 4px;
    transition: padding 0.2s ease-in;
  }

  .menu-item:hover {
    padding-left: 12px;
    padding-right: 12px;
    -webkit-box-shadow: inset 0px -5px 0px -4px rgba(255,0,0,1);
    -moz-box-shadow: inset 0px -5px 0px -4px rgba(255,0,0,1);
    box-shadow: inset 0px -5px 0px -4px rgba(255,0,0,1);
    transition: padding 0.2s ease-in;
  }

  #menu-title {
    font-size: 32px;
    letter-spacing: 4px;
  }

  </style>
  <div id="menu-bar">
    <button id="menu-button">
      <img src="./assets/menu.svg" />
    </button>
    <div id="menu-items-container" class="menu-items-container"></div>
    <div id="menu-title"></div>
    <div></div>
  </div>
`

class Menu extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(menuTemplate.content.cloneNode(true));

    this._menuBar = this._shadowRoot.querySelector('#menu-items-container');
    this._title = this._shadowRoot.querySelector('#menu-title');
  }

  connectedCallback() {
    const menuItemsNames = this.menuItemsNames.split(',');
    const menuItemsLinks = this.menuItemsLinks.split(',');

    const menuButton = this._shadowRoot.querySelector('#menu-button');
    menuButton.addEventListener('click', () => {
      this._menuBar.classList.toggle('show-menu-items-container')
    })

    menuItemsNames.forEach((item, index) => {
      const menuItem = this._menuBar.appendChild(document.createElement('a'))
      menuItem.href = `${menuItemsLinks[index]}`
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `<img src="./assets/${item}.svg" />`;
    })

    this._title.textContent = this.title;
  }

  get menuItemsNames() {
    return this.getAttribute('menuItemsNames');
  }

  get menuItemsLinks() {
    return this.getAttribute('menuItemsLinks');
  }

  get title() {
    return this.getAttribute('title');
  }
}

window.customElements.define('menu-bar', Menu);