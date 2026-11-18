import assert from 'node:assert/strict'
import test from 'node:test'
import { measureContentInsets } from '../skills/taste-gsap-frontend/scripts/audit-insets.mjs'

function rect(left, top, right, bottom) {
  return { left, top, right, bottom, width: right - left, height: bottom - top }
}

function content(rectangles, style = {}) {
  return { getClientRects: () => rectangles, style }
}

function surface(children, style = {}) {
  const boundary = rect(0, 0, 240, 60)
  return {
    ...content([boundary], {
      borderLeftWidth: '1px',
      borderRightWidth: '1px',
      borderTopWidth: '1px',
      borderBottomWidth: '1px',
      ...style,
    }),
    getBoundingClientRect: () => boundary,
    querySelectorAll: () => children,
  }
}

function scan(surfaces, thresholds = {}) {
  const root = {
    querySelectorAll: () => surfaces,
    defaultView: {
      getComputedStyle: element => ({ visibility: 'visible', opacity: '1', ...element.style }),
    },
  }
  return measureContentInsets({ surface: '.row', content: '.run', ...thresholds }, root)
}

test('reports flush status and action boxes even when everything fits in the row', () => {
  const result = scan([surface([content([rect(1, 12, 50, 32)]), content([rect(180, 12, 239, 32)])])])
  assert.equal(result.status, 'fail')
  assert.equal(result.checked, 2)
  assert.deepEqual(result.findings.map(finding => finding.sides), [['left'], ['right']])
  assert.equal(result.findings[0].gaps.left, 0)
  assert.equal(result.findings[1].gaps.right, 0)
})

test('subtracts the border and checks every wrapped rectangle', () => {
  const result = scan([surface([content([rect(9, 5, 110, 20), rect(9, 34, 232, 58)])])])
  assert.equal(result.status, 'fail')
  assert.deepEqual(result.findings[0].sides, ['right', 'bottom'])
  assert.deepEqual(result.findings[0].gaps, { left: 8, right: 7, top: 4, bottom: 1 })
})

test('accepts rendered padding and skips hidden matches', () => {
  const result = scan([surface([
    content([rect(13, 10, 226, 50)]),
    content([rect(0, 0, 240, 60)], { visibility: 'hidden' }),
    content([]),
  ])])
  assert.equal(result.status, 'pass')
  assert.equal(result.checked, 1)
  assert.deepEqual(result.tightest, { left: 12, right: 13, top: 9, bottom: 9 })
  assert.deepEqual(result.findings, [])
})

test('distinguishes an unmeasured state from a pass', () => {
  assert.equal(scan([]).status, 'unmeasured')
  assert.equal(scan([]).tightest, null)
  const result = scan([surface([content([rect(13, 10, 226, 50)])]), surface([])])
  assert.equal(result.status, 'unmeasured')
  assert.deepEqual(result.unmeasured, [2])
})

test('uses the chosen component minimums and handles invalid values', () => {
  const boundaries = [surface([content([rect(7, 4, 230, 55)])])]
  assert.equal(scan(boundaries).status, 'fail')
  assert.equal(scan(boundaries, { minInline: 6, minBlock: 3 }).status, 'pass')
  assert.throws(() => scan(boundaries, { minInline: -1 }), /minimum/i)
})
