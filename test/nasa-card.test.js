import { html, fixture, expect } from '@open-wc/testing';
import "../nasa-card.js";

describe("nasaCard test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <nasa-card
        title="title"
      ></nasa-card>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
