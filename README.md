# volto-cinematic-blocks

A collection of cinematic-style blocks for Volto CMS.

## Installation

```bash
npm install @cinematic/volto-blocks
```

## Typewriter Block

The Typewriter block adds an animated text effect that simulates typing and deleting text.

### Features

- Cycle through multiple phrases with typing/deletion animation
- Customizable typing speed, delete speed, and pause duration
- Configurable text color, font size, and alignment
- Optional cursor with customizable character and color
- Loop or single-play animation modes
- Customizable block height

### How to Use

1. Add the Typewriter block to your page
2. Configure the settings in the sidebar:
   - **Static Text**: Text that stays fixed before the cycling portion (default: "We build ")
   - **Cycling Phrases**: Comma-separated list of phrases to cycle through (e.g., "websites, applications, experiences")
   - **Text After**: Optional text that stays fixed after the cycling portion
   - **Typing Speed**: Milliseconds between characters (default: 80)
   - **Delete Speed**: Milliseconds between deleting characters (default: 40)
   - **Pause Duration**: Milliseconds to pause before deleting (default: 1500)
   - **Loop Animation**: Toggle to repeat or stop after one cycle
   - **Cursor Character**: Character to use as cursor (default: "|")
   - **Cursor Color**: Color of the cursor
   - **Font Size**: Size of the text (default: 3rem)
   - **Text Color**: Color of the text
   - **Text Alignment**: Left, center, or right alignment
   - **Block Height**: Pre-defined heights (auto, small, medium, large, extra large)

### Example Configuration

```json
{
  "staticText": "We create ",
  "phrases": "modern websites, fast applications, amazing experiences",
  "postfixText": "for your business",
  "typingSpeed": 100,
  "deleteSpeed": 50,
  "pauseDuration": 2000,
  "fontSize": "4rem",
  "textColor": "#ffffff",
  "textAlign": "center",
  "blockHeight": "300px"
}
```

### Customization

The block uses CSS classes for styling:
- `.cinematic-typewriter` - Main block container
- `.cinematic-typewriter__inner` - Inner wrapper with height
- `.cinematic-typewriter__text` - The text element
- `.cinematic-typewriter__static` - Static text span
- `.cinematic-typewriter__dynamic` - Animated text span
- `.cinematic-typewriter__cursor` - Cursor element
- `.cinematic-typewriter__postfix` - Postfix text span

Override these classes in your project's CSS to customize the appearance.
