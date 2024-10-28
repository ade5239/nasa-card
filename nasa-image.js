import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.alt = '';
    this.owner = '';
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      alt: { type: String },
      owner: { type: String },
    };
  }

  static get styles() {
    return css`
      .card {
        display: inline-block;
        width: 240px;
        margin: var(--ddd-spacing-2);
        border: 1px solid var(--ddd-primary-8);
        border-radius: var(--ddd-radius-md);
        overflow: hidden;
        transition: background-color 0.3s ease;
        box-shadow: var(--ddd-boxShadow-sm);
      }

      .card:hover {
        background-color: var(--ddd-theme-default-limestoneGray);
      }

      .card:focus-within {
        border: 2px solid var(--ddd-primary-17);
      }

      .card a {
        text-decoration: none;
        color: inherit;
        display: block;
      }

      .card img {
        width: 240px;
        height: 160px; /* Set a uniform height */
        object-fit: cover;
      }

      .card div {
        padding: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-sm);
      }

      .title {
        font-weight: bold;
        margin-bottom: var(--ddd-spacing-1);
      }

      .owner {
        color: var(--ddd-primary-17);
        font-size: var(--ddd-font-size-xs);
      }
    `;
  }

  // Displays the alt property and owner of the image
  render() {
    return html`
      <div class="card">
        <a href="${this.source}" target="_blank" rel="noopener noreferrer">
          <img src="${this.source}" alt="${this.alt}" />
          <div class="title">${this.title}</div>
          <div class="owner">Owner: ${this.owner}</div>
        </a>
      </div>
    `;
  }

  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);
