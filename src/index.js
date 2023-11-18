import { html, LitElement } from 'lit'
import './autocomplete.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
  
setBasePath('https://unpkg.com/@shoelace-style/shoelace/dist')

customElements.define('combo-example', class extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
      loading: { type: Boolean }
    }
  }

  constructor() {
    super()
    this.items = []
  }

  render() {
    return html`
      <sl-autocomplete @search=${this._load} .loading=${this.loading} @itemSelected=${console.log}>
        ${this.items.map(this.renderItem)}
      </sl-autocomplete>`
  }

  renderItem({ id, label }) {
    return html`<sl-menu-item .value=${id}>${label}</sl-menu-item>`
  }

  _load({ detail }) {
    this.loading = true
    setTimeout(() => {
      this.items = Array.from(Array(5)).map((_, i) => {
        return {
          id: `${detail.value}${i}`,
          label: `${detail.value} - ${i}`
        }
      })
      this.loading = false
    }, 1000)
  }
})
