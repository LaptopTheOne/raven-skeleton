const menuTemplate = document.createElement('template');

menuTemplate.innerHTML = `
  <style>
  .menu-bar {
    background: red;
    color: green;
  }
  </style>
  <div class="menu-bar">
    Menu
  </div>
`

class Menu extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(menuTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("Menu mounted!")
    console.log("Menu items:", this.menuItems.split(','))
  }

  get menuItems() {
    return this.getAttribute('menuItems');
  }
}

window.customElements.define('menu-bar', Menu);