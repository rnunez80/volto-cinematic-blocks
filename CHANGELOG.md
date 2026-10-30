# Changelog

All notable changes to `volto-cinematic-blocks` will be documented in this file.

## [1.2.0] - 2026-10-29

### Features & Layout Enhancements

- **Slider Hero (`cinematicSlider`):**
  - Configured 100vw edge-to-edge breakout (`calc(100vw - var(--volto-toolbar-width, 0px))`) and full viewport height (`100vh` / `100dvh`) in View mode.
  - Enabled full canvas width and `100vh` height in Edit mode across `.block-editor-cinematicSlider`, `.block.cinematicSlider`, and `.cinematic-slider-wrapper`, resolving 0px height collapse and container clipping during editing.
  - Preserved original LunDev crazy effect thumbnail-to-hero expansion animation (`showImage`, `showThumbnail`, `effectNext`, and full `object-fit: cover`).
- **Horizontal Scroll (`cinematicHorizontalScroll`):**
  - Enforced 100vw edge-to-edge breakout (`calc(100vw - var(--volto-toolbar-width, 0px))`) across `.cinematic-horizontal-scroll` when unpinned and on `.pin-spacer:has(> .cinematic-horizontal-scroll)`.
  - Resolved GSAP ScrollTrigger pinning and disappearance issues by eliminating `position: relative !important` conflicts inside `.pin-spacer`, enabling smooth `position: fixed` pinning and horizontal card translation (`translate3d`).
  - Added full canvas width support in Edit mode (`block-editor-cinematicHorizontalScroll`).
- **Block Chooser Icons:**
  - Added distinct Volto SVG icons for all cinematic blocks in the add block menu (`textSVG`, `imagesSVG`, `cardsSVG`, `fastForwardSVG`, `randomSVG`, `copySVG`, `horizontalSVG`, `zoomSVG`, `openingSVG`, `sliderSVG`).

## [1.1.0] - 2026-10-24

### Features & Accessibility

- **Flip Cards Accessibility:** Replaced the flip card front face `div` with a semantic, focusable `<button>` element with accessible `aria-label` and keyboard flip triggers for WCAG compliance.
- **Volto 19 Compatibility:** Updated `peerDependencies` to support `@plone/volto` 17, 18, and 19 (`>=17.0.0 || >=18.0.0-alpha.0 || >=19.0.0-alpha.0`).
- **Dependencies:** Updated GSAP and build configurations.

## [1.0.2] - 2026-06-10

### Bug Fixes

- Fixed color and text contrast on Slider Crazy Effects component.

## [1.0.1] - 2026-05-22

### Changed

- **Typewriter Block:** "Cycling Phrases" are now separated by line breaks instead of commas, allowing for phrases that naturally contain commas.

## [1.0.0] - 2026-05-10

### Initial Release

- Initial release containing cinematic animated blocks: Typewriter, Accordion Slider, Flip Cards, Marquee, Text Scramble, Sticky Cards, Horizontal Scroll, Zoom Parallax, Split Scroll, and Curtain Reveal.
