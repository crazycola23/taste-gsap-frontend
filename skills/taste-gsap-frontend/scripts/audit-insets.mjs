import { realpathSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { parseArgs } from 'node:util'

// Self-contained so browser automation can pass this function to page.evaluate.
export function measureContentInsets({ surface, content, minInline = 8, minBlock = 4 }, root = document) {
  if (typeof surface !== 'string' || !surface.trim() || typeof content !== 'string' || !content.trim()) {
    throw new TypeError('Supply a surface selector and a content selector')
  }
  if (![minInline, minBlock].every(value => Number.isFinite(value) && value >= 0)) {
    throw new TypeError('Inset minimums must be finite nonnegative CSS pixels')
  }

  const view = root.defaultView
  const rectsOf = element => {
    const style = view.getComputedStyle(element)
    if (style.visibility !== 'visible' || Number(style.opacity) === 0) return []
    return Array.from(element.getClientRects()).filter(rect => rect.width > 0 && rect.height > 0)
  }

  const surfaces = Array.from(root.querySelectorAll(surface)).filter(element => rectsOf(element).length)
  const findings = []
  const unmeasured = []
  const observed = { left: Infinity, right: Infinity, top: Infinity, bottom: Infinity }
  const sides = Object.keys(observed)
  const rounded = gaps => Object.fromEntries(sides.map(side => [side, Number(gaps[side].toFixed(2))]))
  let checked = 0

  for (const [surfaceIndex, element] of surfaces.entries()) {
    const frame = element.getBoundingClientRect()
    const style = view.getComputedStyle(element)
    const borderWidth = side => Number.parseFloat(style['border' + side + 'Width']) || 0
    const inner = {
      left: frame.left + borderWidth('Left'),
      right: frame.right - borderWidth('Right'),
      top: frame.top + borderWidth('Top'),
      bottom: frame.bottom - borderWidth('Bottom'),
    }
    const vertical = /^(vertical|sideways)/.test(style.writingMode)
    const inline = vertical ? minBlock : minInline
    const block = vertical ? minInline : minBlock
    const minimum = { left: inline, right: inline, top: block, bottom: block }
    const items = Array.from(element.querySelectorAll(content), rectsOf).filter(rects => rects.length)

    if (items.length === 0) unmeasured.push(surfaceIndex + 1)
    for (const [contentIndex, rectangles] of items.entries()) {
      checked++
      const distance = {
        left: Math.min(...rectangles.map(rect => rect.left - inner.left)),
        right: Math.min(...rectangles.map(rect => inner.right - rect.right)),
        top: Math.min(...rectangles.map(rect => rect.top - inner.top)),
        bottom: Math.min(...rectangles.map(rect => inner.bottom - rect.bottom)),
      }
      for (const side of sides) observed[side] = Math.min(observed[side], distance[side])
      const shortSides = sides.filter(side => distance[side] + 0.25 < minimum[side])
      if (shortSides.length === 0) continue
      findings.push({
        surfaceIndex: surfaceIndex + 1, contentIndex: contentIndex + 1,
        sides: shortSides, gaps: rounded(distance), minimum,
      })
    }
  }

  let status = 'pass'
  if (findings.length) status = 'fail'
  else if (!checked || unmeasured.length) status = 'unmeasured'
  return {
    status, surface, content, surfaces: surfaces.length, checked, unmeasured,
    tightest: checked ? rounded(observed) : null, findings,
  }
}

async function evaluate(port, targetId, expression) {
  const socket = new WebSocket('ws://127.0.0.1:' + port + '/devtools/page/' + encodeURIComponent(targetId))
  let timer
  try {
    const reply = await new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new Error('Timed out waiting for the browser')), 8000)
      socket.addEventListener('error', () => reject(new Error('Could not connect to the browser target')), { once: true })
      socket.addEventListener('close', () => reject(new Error('The browser target closed')), { once: true })
      socket.addEventListener('open', () => socket.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: { expression, returnByValue: true },
      })), { once: true })
      socket.addEventListener('message', event => {
        try {
          const message = JSON.parse(event.data)
          if (message.id === 1) resolve(message)
        } catch (error) {
          reject(error)
        }
      })
    })
    const exception = reply.result?.exceptionDetails
    if (reply.error || exception) throw new Error(reply.error?.message || exception.exception?.description || exception.text)
    return reply.result.result.value
  } finally {
    clearTimeout(timer)
    socket.close()
  }
}

async function run() {
  const { values } = parseArgs({
    options: {
      cdp: { type: 'string' },
      target: { type: 'string', default: '' },
      surface: { type: 'string' },
      content: { type: 'string' },
      'min-inline': { type: 'string', default: '8' },
      'min-block': { type: 'string', default: '4' },
      help: { type: 'boolean' },
    },
  })
  if (values.help) {
    console.log('Usage: node audit-insets.mjs --cdp <port> [--target <URL or title text>] --surface <selector> --content <selector> [--min-inline <px>] [--min-block <px>]')
    return
  }
  const port = Number(values.cdp)
  if (!Number.isInteger(port) || port < 1 || port > 65535 || !values.surface?.trim() || !values.content?.trim()) {
    throw new Error('Supply a local CDP port, surface and content selector. See --help.')
  }
  const response = await fetch('http://127.0.0.1:' + port + '/json/list', { signal: AbortSignal.timeout(5000) })
  if (!response.ok) throw new Error('Could not read browser targets (HTTP ' + response.status + ')')
  const pages = (await response.json()).filter(page => page.type === 'page' &&
    (page.url.includes(values.target) || page.title.includes(values.target)))
  if (pages.length !== 1) throw new Error('Select one matching page with --target (matched ' + pages.length + ')')
  const settings = {
    surface: values.surface,
    content: values.content,
    minInline: Number(values['min-inline']),
    minBlock: Number(values['min-block']),
  }
  const result = await evaluate(port, pages[0].id, '(' + measureContentInsets + ')(' + JSON.stringify(settings) + ')')
  console.log(JSON.stringify(result, null, 2))
  if (result.status === 'fail') process.exitCode = 1
  if (result.status === 'unmeasured') process.exitCode = 2
}

function isMain() {
  if (!process.argv[1]) return false
  try {
    return import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
  } catch {
    return false
  }
}

if (isMain()) {
  run().catch(error => {
    console.error('audit-insets: ' + error.message)
    process.exitCode = 2
  })
}
