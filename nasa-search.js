import { LitElement, html, css } from 'lit';
import "./nasa-image.js";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
 
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }

      details {
        margin: 1var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-slateGray);
        border-radius: var(--ddd-spacing-3);
      }
      summary {
        font-size: 24px;
        padding: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-shrineMaxLight);
        font-size: 36px;
      }
      input {
        font-size: 20px;
        line-height: var(--ddd-spacing-10);
        width: 80%;
        border-radius: var(--ddd-spacing-3);
      }
      button {
        font-size: 20px;
        line-height: 40px;
        margin-left: 8px;
        padding: 0 24px;
        border-radius: 12px;
      }
      button:hover {
        background-color: var(--ddd-theme-default-potential0);
        color: var(--ddd-theme-default-slateMaxLight);
        transition-duration: 0.1s;
      }

    `;
  }

  constructor() {
    super();
    this.value = '';
    this.title = '';
    this.loading = false;
    this.items = [];
  }
//added a search button so the NASA api is not spammed with queries for each character input
  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search Inputs</summary>
      <div> 
        <input id="input" placeholder="  Search NASA images" @keyup="${this.handleKeyUp}" />
        <button @click="${this.search}">Search</button> 
      </div>
    </details>
    <div class="results">
      ${this.items.map((item) => html`
      <nasa-image
        source="${item.links[0].href}"
        title="${item.data[0].title}"
        alt="${item.data[0].description}"
      ></nasa-image>
      `)}
    </div>
    `;
  }
//when a user hits the enter button it searches
  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  search() {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = data.collection.items;
        this.loading = false;
      }  
    });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);
