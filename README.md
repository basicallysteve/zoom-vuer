# Zoom Vuer

This component provides an image zooming functionality based on user interaction. It supports zooming on hover or click, depending on the `zoomOn` prop.

### Props
- **`zoom` (Number)**: The zoom factor for the image. Default is `1.5`.
- **`zoomOn` (String)**: The interaction type to trigger zoom. Options are `"hover"` or `"click"`. Default is `"hover"`.


### Notes
- The zoom overlay is dynamically created and styled using JavaScript.
- The zoomed image is scaled, and its transform origin is adjusted based on mouse movement.
- The zoom overlay is positioned absolutely within the container to ensure proper alignment.
- The `pointerEvents` property is set to `"none"` for the overlay and zoomed image to avoid interfering with user interactions.


### Roadmap
- Composable based approach to zooming
- Expansion into other frontend frameworks