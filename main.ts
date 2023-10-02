import grapesjs, { Editor } from 'grapesjs'
import type { ContentPreview } from './preview'

function example(editor: Editor) {
  editor.Components.addType('example', {
    model: {
      defaults: {
        script() {
          const containerType = window.self === window.top ? 'top frame' : 'an iframe'
          console.log('Initializing in', containerType, this)
        },
      },

      //
      // This ensures that the example is always rendered with the `id` attribute
      // If there are no component instance styles this component will not have
      // the `id` attribute even though it has the `script`.
      //
      // This is probably a bug in GrapesJS - need to report it!
      //
      // toHTML() {
      //   return `<div id="${this.getId()}">${this.getInnerHTML()}</div>`
      // }
    },
  })

  editor.Blocks.add('example', {
    label: 'Example',
    activate: true,
    content: {
      type: 'example',
      components: '<h2>Hello, World!</h2>',
    },
  })
}

function preview(editor: Editor) {
  // Skip the `<body>` element when rendering wrapper
  editor.Components.addType('wrapper', {
    model: {
      toHTML() {
        return this.getInnerHTML()
      },
    },
  })

  // When loading and saving update the preview
  editor.on('load storage:end:store', () => {
    const contentPreview = document.querySelector('content-preview') as ContentPreview
    if (contentPreview) {
      contentPreview.html = editor.getHtml()
      contentPreview.css = editor.getCss()
      contentPreview.js = editor.getJs()
    }
  })
}

function openBlocksByDefault(editor: Editor) {
  editor.on('load', () => {
    editor.Panels.getButton('views', 'open-blocks').set('active', true)
  })
}

grapesjs.init({
  container: '#gjs',
  height: '50vh',
  jsInHtml: false,
  plugins: [
    example,
    preview,
    openBlocksByDefault,
  ],
})
