# volto-cinematic-blocks

A collection of cinematic-style interactive blocks for Volto CMS.

## Installation

```bash
npm install @cinematic/volto-blocks
```

## Available Blocks

### 1. Typewriter Block

The Typewriter block adds an animated text effect that simulates typing and deleting text.

#### Features

- Cycle through multiple phrases with typing/deletion animation
- Customizable typing speed, delete speed, and pause duration
- Configurable text color, font size, text alignment, and block height
- Optional cursor with customizable character and color
- Loop or single-play animation modes

#### How to Use

1. Add the Typewriter block to your page
2. Configure the settings in the sidebar:

**Content:**
- **Static Text**: Text that stays fixed before the cycling portion (default: "We build ")
- **Cycling Phrases**: Comma-separated list of phrases to cycle through (e.g., "websites, applications, experiences")
- **Text After**: Optional text that stays fixed after the cycling portion

**Animation:**
- **Typing Speed**: Milliseconds between characters (default: 80)
- **Delete Speed**: Milliseconds between deleting characters (default: 40)
- **Pause Duration**: Milliseconds to pause before deleting (default: 1500)
- **Loop Animation**: Toggle to repeat or stop after one cycle

**Styling:**
- **Cursor Character**: Character to use as cursor (default: "|")
- **Cursor Color**: Color of the cursor
- **Font Size**: Size of the text (default: 3rem)
- **Text Color**: Color of the text
- **Text Alignment**: Left, center, or right alignment
- **Block Height**: Pre-defined heights (auto, Small, Medium, Large, Extra Large)

#### Example Configuration

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

#### CSS Classes

- `.cinematic-typewriter` - Main block container
- `.cinematic-typewriter__inner` - Inner wrapper with height
- `.cinematic-typewriter__text` - The text element
- `.cinematic-typewriter__static` - Static text span
- `.cinematic-typewriter__dynamic` - Animated text span
- `.cinematic-typewriter__cursor` - Cursor element
- `.cinematic-typewriter__postfix` - Postfix text span

---

### 2. Text Scramble Block

The Text Scramble block creates a text effect where characters decode into your headline text. Can be triggered on scroll or on page load.

#### Features

- Text characters scramble and decode into final text
- Configurable scramble characters and decode speed
- Trigger on scroll (when element enters viewport) or on page load
- Customizable font size, text alignment, and font family

#### Settings

**Content:**
- **Headline Text**: Final text to reveal (default: "Characters decode into your headline")

**Animation:**
- **Trigger**: When to start the animation (default: "on-scroll")
- **Scramble Characters**: Characters used for scrambling effect (default: random special chars)
- **Decode Speed**: Milliseconds between character changes (default: 50)

**Styling:**
- **Font Size**: Size of the text
- **Text Alignment**: Left, center, or right alignment
- **Font Family**: Font style (default: "monospace")

---

### 3. Kinetic Marquee Block

The Kinetic Marquee block creates an infinite scrolling text display with multiple bands that can move in alternating directions.

#### Features

- Multiple text bands scrolling horizontally
- Alternating directions for visual interest
- Pause on hover (optional)
- Customizable speed, font size, and weight

#### Settings

**Content:**
- **Text Bands**: Add multiple text bands with any text

**Animation:**
- **Speed**: Scroll speed ('Fast', 'Medium', 'Slow', 'Very Slow')
- **Direction**: Left or right direction for first band
- **Pause on Hover**: Pause scroll when hovering over marquee

**Typography:**
- **Font Size**: Size of the text
- **Separator**: Character/string between repeated text (default: " · ")
- **Font Weight**: Normal, Semi Bold, Bold, or Black

---

### 4. Flip Cards Block

The Flip Cards block displays a grid of cards that flip to reveal content on hover or focus.

#### Features

- Grid layout with configurable columns (2, 3, or 4)
- Flip animation on hover or keyboard interaction
- Front and back content with custom colors
- Accessible with focus support

#### Settings

**Cards:**
- **Cards**: Add cards with front and back content
  - Front: Title and background color
  - Back: Title, description, background color, CTA text and link

**Layout:**
- **Columns**: Number of columns in grid (default: 4)
- **Card Height**: Fixed height for all cards
- **Gap**: Spacing between cards
- **Border Radius**: Rounded corners (default: 16px)

---

### 5. Sticky Cards Block

The Sticky Cards block creates a vertical stacking effect where cards stick in place as you scroll, creating a parallax-like illusion.

#### Features

- Cards stick in place while content underneath them scrolls
- Configurable offset between stacked cards
- Customizable card colors and corner radius
- Falls back to relative positioning on reduced motion

#### Settings

**Cards:**
- **Cards**: Add cards with title, description, background color, and text color

**Layout:**
- **Card Height**: Fixed height for all cards (default: 400px)
- **Border Radius**: Rounded corners (default: 20px)
- **Stack Offset**: Vertical offset between cards in pixels (default: 30px)

---

### 6. Accordion Slider Block

The Accordion Slider block displays a row of panels that expand when interacted with, revealing titles and descriptions.

#### Features

- Horizontal accordion-style expand/collapse
- Panels expand on hover, focus, or keyboard interaction
- Background images with fallback colors
- Animated transitions between states

#### Settings

**Panels:**
- **Panels**: Add panels with title, description, background image, and fallback color

**Styling:**
- **Panel Height**: Height of the slider area (default: 500px)
- **Transition Speed**: Animation duration in milliseconds (default: 500ms)
- **Expanded Width Ratio**: How many times wider the expanded panel is (default: 4x)
- **Overlay Opacity**: Darkness of collapsed panel overlays (default: 0.4)
- **Border Radius**: Rounded corners (default: 12px)

---

### 7. Horizontal Scroll Block

The Horizontal Scroll block creates a horizontal scrolling gallery with GSAP ScrollTrigger integration.

#### Features

- Horizontal scroll with GSAP ScrollTrigger pinning
- Scroll-pinned section with content that scrolls left-to-right
- Smooth animations with reduced motion support
- Fallback grid layout when JavaScript is disabled

#### Settings

**Items:**
- **Items**: Add items with title, description, and background color

**Layout:**
- **Section Height Multiplier**: How many screen-heights tall (default: 3x)
- **Item Width**: Width of each item (default: 400px)
- **Gap**: Spacing between items (default: 2rem)

---

### 8. Slider Hero Block

The Slider Hero block creates an interactive hero slider with thumbnail navigation, transitions, and automated playback.

#### Features

- Full-screen hero slider with background images
- Thumbnail navigation at the bottom
- Next/Previous arrow buttons
- Smooth slide transitions with animations
- Automated playback with progress bar
- Responsive design for mobile devices

#### Settings

**Content:**
- **Slides**: Add slides with title, topic, author, and image
  - Each slide features large typography on top of a background image

**Navigation:**
- **Show Arrows**: Display left/right arrow buttons (default: true)
- **Show Thumbnails**: Display thumbnail strip at bottom (default: true)
- **Auto Play**: Automatically advance slides (default: true)

**Styling:**
- **Arrow Color**: Color of navigation arrows (default: white)
- **Arrow Background**: Background of arrows (default: rgba(255,255,255,0.4))

---

### 9. Split Scroll Block

The Split Scroll block creates a split-screen scrolling effect where the two columns move in opposite directions, creating visual tension and keeping the user's attention. One column stays pinned (sticky) while the other scrolls, then they swap roles depending on which column is designated as sticky.

#### Features

- Two columns that scroll in opposite directions
- Sticky column stays fixed while the other scrolls relative to it
- Left column scrolls down while right column scrolls up (or vice versa)
- Perfect for comparisons, before/after, or dual narratives
- Configurable sticky column (left, right, or none)
- Smooth scroll interaction with reduced motion support

#### Settings

**Content:**
- **Left Column Items**: Items in the left column
- **Right Column Items**: Items in the right column
  - Each item supports title, description, image, background image/color, and button

**Layout:**
- **Section Height**: Height of the section (default: 400vh to allow scrolling)
- **Column Gap**: Spacing between columns (default: 0rem)
- **Sticky Column**: Which column stays pinned during scroll (left, right, or none)

---

### 10. Curtain Reveal Block

The Curtain Reveal block creates a dramatic reveal effect where a curtain slides away to reveal content.

#### Features

- Simulates a theater curtain sliding away
- Four reveal directions: left, right, up, down
- Content underneath reveals as curtain moves
- Background image support with overlay

#### Settings

**Content:**
- **Title**: Main heading
- **Description**: Subtitle or description
- **Background Image**: Image behind the curtain
- **CTA Text**: Call-to-action button text
- **CTA Link**: Link for the button

**Curtain:**
- **Curtain Color**: Base color of the curtain (default: #1a1a2e)
- **Curtain Gradient**: Optional CSS gradient (overrides color)
- **Reveal Direction**: Direction curtain slides (default: left)

**Styling:**
- **Section Height**: Height of the section (default: 100vh)

---

### 11. Zoom Parallax Block

The Zoom Parallax block creates a 3D parallax effect with background, midground, and foreground layers that move at different speeds during scroll.

#### Features

- Three parallax layers: background, midground, and foreground
- All layers scale and move differently during scroll
- Background image with adjustable overlay
- Smooth GSAP ScrollTrigger integration

#### Settings

**Content:**
- **Background Image**: Main background image
- **Midground Headline**: Text in the middle layer
- **Foreground Text**: Text in the front layer
- **CTA Button Text**: Call-to-action text
- **CTA Link**: Link for the button

**Styling:**
- **Overlay Color**: Color of dark overlay (default: black)
- **Overlay Opacity**: Darkness level (default: 0.4)
- **Section Height**: Height of the section (default: 100vh)

---

## Customization

All blocks include reduced motion support and accessibility features. Override the CSS classes in your project to customize styling. The blocks use descriptive class names in the pattern: `.cinematic-{block-name}__{element}`.
