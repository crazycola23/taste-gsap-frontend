# Content insets

Check the local boundary wherever a card, row, toolbar, sticky area, table cell or
control draws a border or fill. Check real text, badge and action boxes. An
ordinary overflow test can pass with content directly against the border.

1. Inspect the active theme, breakpoint and state in the rendered app. Read the
   winning declarations for padding and border. A shorthand such as
   `padding: 12px 0` can reset a component's inline inset while preserving its
   border. Use `padding-block` when the change is limited to vertical spacing.
2. Measure from the **inner edge** of the painted frame to the closest rendered
   content on each side. Use the component's spacing requirement. As a default
   for ordinary compact text UI, use at least **8 CSS px inline and 4 CSS px
   block**. Check the actual line boxes for wrapped text and the outer boxes of
   painted badges and buttons. Check that focus remains visible after clipping.
3. Repeat with long real content at the normal size and smallest supported size.
   Include the active size settings, relevant zoom, sticky states and keyboard
   focus. Native `legend` and `caption` can sit outside the content box. Align
   them with the intended inset and preserve their semantics. Select the frame
   whose edge the content must clear. Full-bleed media and intentional divider
   alignment use their own boundaries.
4. Fix the spacing where the boundary is drawn. Let labels wrap and controls
   reflow in tight layouts. Record the route, width, state, selectors, required
   gaps and observed gaps or findings. A missing or hidden target is unmeasured.

## Run on a live page

Open the affected state in a local Chromium-based browser or Electron app with
a loopback DevTools port. Use a disposable browser profile for a new session.
The checker leaves the page in its current state.

```bash
node <skill>/scripts/audit-insets.mjs --cdp 9222 --target "Work queue" \
  --surface ".task-row" --content ".status-chip, .task-action"
```

Choose rendered descendant boxes such as inline labels, chips or the actual
action. For text inside a full-width layout wrapper, select the inline label
or measure text runs with `Range.getClientRects()` in the browser inspector.
Confirm the samples include each expected control and label. Audit each relevant
frame and state. Set `--min-inline` and `--min-block` to use the project's CSS
pixel minimums. The command returns JSON with measured counts, the smallest
observed clearance per side and distances for each finding. Exit status is
0 for pass, 1 for a short gap, and 2 for an unmeasured state or a tool error.

Existing browser automation can import `measureContentInsets` from the same
script and run `page.evaluate(measureContentInsets, { surface, content })`.
Use the rendered inspector when a DevTools port is unavailable. Measure from
the frame's `getBoundingClientRect()` after subtracting the computed border
widths and compare with the selected content rects.
