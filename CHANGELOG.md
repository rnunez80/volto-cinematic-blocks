# Changelog

All notable changes to `volto-cinematic-blocks` will be documented in this file.

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
