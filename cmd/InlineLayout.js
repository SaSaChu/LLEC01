const Path = require('path')
const FileSystem = require('fs')

const rootPath = Path.resolve(__dirname, '..')
const distPath = Path.join(rootPath, 'dist')

const layouts = {
  header: {
    main: 'header-main.html',
    sub: 'header-sub.html'
  },
  footer: {
    simple: 'footer-simple.html',
    main: 'footer-main.html',
    logo: 'footer-logo.html'
  }
}

const layoutFiles = Object.values(layouts.header).concat(Object.values(layouts.footer))

const readLayout = fileName => {
  const filePath = Path.join(distPath, fileName)
  return FileSystem.existsSync(filePath) ? FileSystem.readFileSync(filePath, 'utf8') : null
}

const cleanAttributes = attributes => attributes
  .replace(/\s*data-(?:header|footer)=["'][^"']+["']/i, '')
  .trim()

const inlineLayout = (html, type, variants) => {
  const names = Object.keys(variants).join('|')
  const pattern = new RegExp(`<div([^>]*?)data-${type}=["'](${names})["']([^>]*)><\\/div>`, 'g')

  return html.replace(pattern, (match, before, variant, after) => {
    const content = readLayout(variants[variant])
    if (!content) return match

    const attributes = cleanAttributes(`${before} ${after}`)
    return attributes ? `<div ${attributes}>\n${content}\n</div>` : content
  })
}

const run = () => {
  if (!FileSystem.existsSync(distPath)) return

  FileSystem.readdirSync(distPath)
    .filter(fileName => Path.extname(fileName) === '.html' && !layoutFiles.includes(fileName))
    .forEach(fileName => {
      const filePath = Path.join(distPath, fileName)
      let html = FileSystem.readFileSync(filePath, 'utf8')

      html = inlineLayout(html, 'header', layouts.header)
      html = inlineLayout(html, 'footer', layouts.footer)

      FileSystem.writeFileSync(filePath, html, 'utf8')
    })
}

module.exports = { run }
