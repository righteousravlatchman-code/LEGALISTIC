# Prompting Guide: Royal Amethyst & Gold Luxury Aesthetic

## Quick Reference Color Palette

```
Brand Purple Dark: #12002f (deepest background)
Brand Purple: #4a148c (rich purple)
Brand Purple Light: #7c43bd (ethereal, highlights)
Brand Gold: #ffab00 (primary accent)
Brand Gold Light: #ffd740 (brighter, more vibrant gold)
Pure White: #ffffff (primary text)
Light Grey: #d1d5db (secondary text, sophisticated)
```

---

## Effective Prompting Formulas

### Formula 1: DIRECT COLOR SPECIFICATION (Most Effective)

```
"Create a [component/app] with this specific color palette:
- Primary background: #12002f (deep purple-black)
- Accent color: #ffab00 (brand gold)
- Secondary color: #7c43bd (light purple)
- Text: #ffffff (white) for primary, #d1d5db (light grey) for secondary
- Borders/highlights: Use the accent color (#ffab00) for luxury premium feel

Apply these colors to all UI elements, buttons, cards, and text."
```

### Formula 2: AESTHETIC + INDUSTRY EXAMPLE

```
"Build a [app name] with a [industry] aesthetic that looks like:
- Luxury brand website (think high-end jewelry, finance, luxury goods)
- Mystical/spiritual vibe (think tarot, astrology platforms)
- Premium dark mode with gold and purple accents
- Feel: Sophisticated, exclusive, high-end

Use color scheme: Deep purple backgrounds (#12002f), rich gold accents (#ffab00), 
light purple for spiritual elements (#7c43bd), white text."
```

### Formula 3: THE "INSPIRATION" METHOD

```
"Style this like premium luxury apps such as:
- Soho House membership app
- High-end crypto wallets
- Luxury brand e-commerce platforms
- Spiritual/wellness premium apps

Dark, sophisticated, gold and deep purple color scheme.
Looks expensive and exclusive. Make it feel like membership-only content."
```

### Formula 4: EMOTION-BASED PROMPT

```
"Create [component] that feels:
- Exclusive and premium (not cheap or casual)
- Mysterious and spiritual
- Sophisticated and refined
- High-luxury (like 5-star hotels, fine jewelry)
- Professional yet mystical

Color language: Deep purples, rich golds, spiritual light purples. 
Every element should scream 'premium' and 'exclusive'."
```

---

## Detailed Design System Prompt

### THE COMPREHENSIVE PROMPT

```
"Build a [React component] for [purpose] with this complete design system:

COLORS:
- Background: Linear gradient from #12002f to #4a148c (deep purple-black to rich purple)
- Primary accent: #ffab00 (brand gold) - use for buttons, headings, important elements
- Secondary accent: #7c43bd (light purple) - use for highlights, special features
- Text primary: #ffffff (white) for main content
- Text secondary: #d1d5db (light grey) for supporting text
- Borders: 1px solid #ffab00 for premium feel
- Hover states: Slightly lighter/brighter versions of accent colors

TYPOGRAPHY:
- Font family: 'Cinzel', Georgia, serif (elegant, luxury)
- Headings: 700 weight (bold, impactful)
- Body: 500-600 weight (readable, refined)
- Letter spacing: Increased spacing for luxury feel (0.5px to 2px)

SPACING:
- Large padding: 20-40px
- Card gaps: 20-30px
- Border radius: 15-20px for organic feel (not too sharp)
- Use generous whitespace for upscale look

EFFECTS:
- Subtle gradients: Linear gradients for depth
- Border glow: Box-shadow with purple or gold color for premium feel
- Hover animations: Smooth transitions (0.3s ease)
- Use soft, sophisticated glow shadows: box-shadow: 0 0 15px rgba(124, 67, 189, 0.6)

COMPONENTS:
- Cards: Gradient backgrounds with gold borders and a purple glow shadow.
- Buttons: Gold background with black text on hover states
- Badges/Tags: Small gold backgrounds with uppercase text
- Icons: Gold or white color, 16-24px size
- Forms: Transparent backgrounds with gold borders, light focus states

OVERALL FEEL:
- Elegant and sophisticated
- Exclusive and premium
- Mysterious yet refined
- High-end luxury aesthetic
- NOT colorful or playful - restrained color palette"
```

---

## Specific Component Prompts

### For Buttons

```
"Make premium buttons styled like luxury brands:
- Background: linear-gradient(135deg, #ffab00 0%, #ffd740 100%) (gold gradient)
- Text: #12002f (black text on gold)
- Padding: 12px 24px (generous)
- Border-radius: 25px (rounded, modern)
- Font-weight: 700 (bold)
- Hover effect: Transform scale(1.05) and enhanced shadow
- Shadow: 0 10px 30px rgba(255, 171, 0, 0.3)
- Transition: all 0.3s ease

Make them look like buttons on luxury brand websites."
```

### For Cards

```
"Style cards with luxury aesthetic:
- Background: linear-gradient(135deg, rgba(124, 67, 189, 0.1) 0%, rgba(18, 0, 47, 0.8) 100%)
  (subtle light purple to deep purple gradient)
- Border: 1px solid #ffab00 (gold border)
- Border-radius: 15px
- Padding: 20-25px
- Shadow: 0 0 15px rgba(124, 67, 189, 0.6) (purple glow)
- Hover: transform translateY(-10px) and box-shadow enhancement
- Transition: all 0.3s ease

Each card should feel like an exclusive, premium container."
```

### For Headers/Titles

```
"Make headings luxurious:
- Color: #ffab00 (brand gold)
- Font: 'Cinzel', serif (elegant)
- Font-size: 2-3rem (large, impactful)
- Font-weight: 700 (bold)
- Letter-spacing: 2px (spread out, sophisticated)
- Text-transform: uppercase (modern luxury)
- Optional: text shadow with gold glow
- Add underline decoration: linear-gradient going through gold

Should feel like high-end brand logos/titles."
```

### For Background/Container

```
"Create sophisticated background:
- Base: #12002f (deep purple-black)
- Enhanced with radial-gradient for depth:
  radial-gradient(circle at 25% 40%, rgba(124, 67, 189, 0.1) 0%, transparent 50%),
  radial-gradient(circle at 75% 20%, rgba(255, 171, 0, 0.1) 0%, transparent 50%),
  var(--color-bg-primary)
  
OR

- Linear gradient: linear-gradient(135deg, #12002f 0%, #4a148c 100%)
  (deep purple-black to rich purple)

Should look like premium dark mode, not boring black."
```

---

## Real Prompt Examples You Can Copy/Paste

### Example 1: Complete App

```
"Create a React component for a CRM application with this design:

DESIGN SYSTEM:
- Color palette: Premium luxury with gold and purple accents
  - Backgrounds: #12002f (deep purple-black), gradients to #4a148c
  - Primary accent: #ffab00 (brand gold) for all interactive elements
  - Secondary accent: #7c43bd (light purple) for spiritual/special elements
  - Text: #ffffff (white) and #d1d5db (light grey)
  - Borders: Gold (#ffab00) at 1px

- Typography: 'Cinzel' serif font, bold headings, sophisticated styling
- Spacing: Generous padding (20-40px), large gap between elements
- Styling: Gradient backgrounds, gold borders, smooth transitions

COMPONENTS:
- All cards: Gradient background with 1px gold border, rounded corners, purple glow shadow
- All buttons: Gold gradient, black text, hover with scale effect
- All headings: Large, bold, gold, uppercase, letter-spaced
- All text: White primary, light grey secondary
- All interactive elements: Smooth 0.3s transitions

OVERALL: Should look like a premium luxury membership app, exclusive and sophisticated."
```

### Example 2: Dashboard/Analytics

```
"Build a dashboard with luxury dark aesthetic:

Use only these colors:
- Deep Purple-Black: #12002f
- Brand Gold: #ffab00  
- Light Purple: #7c43bd
- White: #ffffff
- Light Grey: #d1d5db

Every statistic card should have:
1. A gradient background (dark with subtle color)
2. Gold border (1px)
3. Large gold numbers (#ffab00)
4. Light grey labels and supporting text
5. Padding of at least 25px
6. Border-radius of 15px
7. A subtle purple glow shadow.

Buttons should be full gold gradient with black text.
Headings should be 2-3rem, bold, gold, uppercase."
```

### Example 3: Profile/Card Component

```
"Create a user profile card with luxury styling:

Specifications:
- Card background: Linear gradient (135deg) from rgba(124, 67, 189, 0.1) to rgba(18, 0, 47, 0.8)
- Border: 1px solid #ffab00
- Corner radius: 15px
- Padding: 20px
- Shadow: 0 0 15px rgba(124, 67, 189, 0.6)

Content styling:
- Name/Title: #ffab00, bold, larger font
- Supporting text: #d1d5db, smaller, elegant
- Important values: #ffab00, bold
- Regular text: #ffffff

Hover effect:
- Transform up (translateY(-10px))
- Enhanced shadow with gold glow
- Smooth transition (0.3s)

Should feel like a premium business card digitized with luxury branding."
```

---

## Pro Tips

1. **Always include hex codes** - #12002f is clearer than "very dark purple"
2. **Specify exact sizes** - "2rem font", "15px padding" not "big" or "small"
3. **Show gradient direction** - "135deg" is clearer than just gradients
4. **Name the feeling** - "exclusive", "premium", "mysterious" helps AI understand intent
5. **Give examples** - Reference real apps/brands that have the aesthetic you want
6. **Repeat key colors** - Mention them in multiple ways so AI emphasizes them
7. **Specify transitions** - "transition: all 0.3s ease" creates sophistication
8. **Use CSS patterns** - Actual code snippets are more precise than descriptions

---

## Your Signature Palette (The One Used in Your App)

Save this for future projects:

```
BRAND PURPLE DARK:   #12002f
BRAND PURPLE:        #4a148c
BRAND PURPLE LIGHT:  #7c43bd
BRAND GOLD:          #ffab00
BRAND GOLD LIGHT:    #ffd740
PURE WHITE:          #ffffff
LIGHT GREY:          #d1d5db
```