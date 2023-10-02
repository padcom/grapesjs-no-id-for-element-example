// Using Lit framework to create a custom preview component
import { html, LitElement } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { Directive, directive } from 'lit/directive.js'
import { customElement, property } from 'lit/decorators.js'

const content = directive(class ScriptDirective extends Directive {
  render(type: string, body: string) {
    const container = document.createElement(type)
    container.innerHTML = body

    return container
  }
})

@customElement('content-preview')
export class ContentPreview extends LitElement {
  @property() html = ''
  @property() css = ''
  @property() js = ''

  protected render() {
    return html`
      ${unsafeHTML(this.html)}
      ${content('style', this.css)}
      ${content('script', this.js)}
    `
  }

  // Disable shadowRoot so querySelectorAll can work
  protected createRenderRoot(): Element | ShadowRoot {
    return this
  }
}
