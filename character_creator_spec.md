# Character Creation Screen - Supplemental Specification

## Overview
A simple, text-free character customization screen where the child can choose their character's appearance before playing. The screen uses large arrows and visual previews to make selection intuitive for a non-reader.

---

## Character Customization Options

### Body Shapes (4 Options - Classic Nugget Shapes)
1. **Boot** - Tall with a wider top, narrower bottom (like a boot or bowling pin)
2. **Bone** - Dog bone shape with rounded ends and narrow middle
3. **Bell** - Bell-shaped, wider at bottom, narrower at top
4. **Ball** - Classic round nugget (like current character)

**Design Notes:**
- All should be same approximate size (~200px height)
- Same friendly face style (big eyes, simple smile) on each shape
- Base color can vary per shape to help distinguish them
- Nugget-style means organic, rounded edges (not geometric/sharp)
- Each shape should feel friendly and huggable

### Arm Types (4 Options)
1. **Octopus Tentacles** - Curvy, wiggly purple/pink tentacles (2-3 per side)
2. **Short Robot Arms** - Stubby mechanical arms with small hands (current style, compact version)
3. **Wiggly Long Robot Arms** - Extended segmented robot arms with flexible appearance
4. **T-Rex Arms** - Tiny, comically short arms (like dinosaur)

**Design Notes:**
- Octopus tentacles should be organic/curvy (contrast to robot arms)
- Robot arms use grays/silvers with mechanical details
- T-Rex arms should be disproportionately small (comedic effect)
- All should attach naturally to all body shapes
- Scale appropriately to body size

### Hats (4 Options)
1. **Daisy** - Flower with white petals and yellow center sitting on top
2. **Bike Helmet** - Rounded protective helmet with vents
3. **Mohawk** - Spiky punk-style mohawk (bright color)
4. **Top Hat** - Classic tall black top hat (Abraham Lincoln style)

**Design Notes:**
- Should sit naturally on top of all body shapes
- Daisy: White petals (#FFFFFF), yellow center (#FFD700), green stem/base (#4CAF50)
- Bike Helmet: Bright safety colors (red, blue, or yellow) with black vents
- Mohawk: Vibrant punk colors (hot pink, electric blue, or lime green) with spikes
- Top Hat: Classic black (#1A1A1A) with subtle gray band
- Simple 8-bit pixel art style with clear silhouettes

---

## Asset Generation Strategy

### Do You Need ChatGPT/DALL-E for PNG Assets?

**Short Answer: No, but it could help.**

**Three Options:**

#### Option 1: Claude Code Generates CSS/Canvas Graphics (Recommended for MVP)
- **Pros:** 
  - Faster to iterate
  - Perfect style consistency
  - Easy to modify colors/sizes
  - No external dependencies
- **Cons:** 
  - Might not be as polished as hand-drawn
  - Requires more CSS/Canvas work
- **Best for:** Getting it working quickly, then upgrading visuals later

#### Option 2: AI Image Generation (ChatGPT/DALL-E/Midjourney)
- **Pros:**
  - Can create polished pixel art quickly
  - Good variety
  - Professional looking
- **Cons:**
  - Need to get style consistency right
  - Multiple iterations to match your existing character
  - Compositing layers might be tricky
- **Best for:** Final polished version

#### Option 3: Manual Pixel Art (Piskel, Aseprite)
- **Pros:**
  - Complete control
  - Perfect consistency
  - Can be a fun project
- **Cons:**
  - Time consuming
  - Requires pixel art skills
- **Best for:** If you want to learn pixel art or have time

**My Recommendation:**
Start with **Option 1** (CSS/Canvas) to get the character creator working. The shapes are simple enough that CSS can handle them well. Once your son is enjoying the game, you can upgrade to AI-generated or hand-drawn assets later.

---

## Screen Layout & UI Design

### Overall Screen Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│          🎨 CREATE YOUR CHARACTER 🎨                │
│                                                     │
│    ┌─────────────────────────────────────┐         │
│    │                                     │         │
│    │      [Character Preview]            │         │
│    │         (Big, Center)               │         │
│    │                                     │         │
│    └─────────────────────────────────────┘         │
│                                                     │
│    Body:     ◀  [Blob Shape] ▶                     │
│                                                     │
│    Arms:     ◀  [Robot Arms] ▶                     │
│                                                     │
│    Hat:      ◀  [No Hat]     ▶                     │
│                                                     │
│                                                     │
│              [ ▶ START GAME ]                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Detailed Layout Specifications

**Screen Dimensions:**
- Full viewport (100vw × 100vh)
- Same gradient background as main game
- Vertically centered content

**Character Preview Area:**
- Size: 400px × 400px
- Position: Top center of screen
- Background: Subtle circle or platform to "place" character
- Character renders at ~250px size within preview
- **Updates in real-time** as child changes selections

**Selection Rows:**
- 3 rows (Body, Arms, Hat)
- Each row: 120px tall
- Spacing: 40px between rows
- Centered horizontally

**Arrow Buttons:**
- Size: 80px × 80px (large touch targets)
- Style: Simple triangle arrows in white
- Background: Semi-transparent circle (`rgba(255,255,255,0.2)`)
- Hover/Active: Brighter (`rgba(255,255,255,0.4)`)
- Spacing: 40px from option display

**Option Display (Center of Each Row):**
- Width: 300px
- Height: 100px
- Shows ICON/VISUAL of current selection
- No text labels (as specified)
- Visual should be clear and recognizable

**Start Button:**
- Size: 300px × 80px
- Position: Bottom center, 80px from bottom
- Style: Bright, inviting color (maybe `#4CAF50` green or `#FFD700` gold)
- Text: "▶ START GAME" (or just play arrow icon)
- Subtle pulse/glow animation to draw attention

---

## Interaction Design (Text-Free)

### Navigation Pattern

**Left Arrow (◀):**
- Cycles to previous option in category
- Loops: If at first option, clicking ◀ goes to last option
- Example: Blob → Star → Triangle → Square → Blob

**Right Arrow (▶):**
- Cycles to next option in category  
- Loops: If at last option, clicking ▶ goes to first option
- Example: Blob → Square → Triangle → Star → Blob

**Visual Feedback:**
- Arrow brightens/scales slightly on hover
- Click gives immediate response
- Character preview updates instantly (no delay)
- Optional: Gentle "swoosh" or "pop" sound on change

### Category-Specific Visuals

**Body Row:**
```
◀  [Large silhouette/icon of current body shape]  ▶
```
- Show simplified version of body shape
- Color: Matches what it will look like in game
- Size: ~80px

**Arms Row:**
```
◀  [Icon showing arm type]  ▶
```
- Show the arms in isolation or small example
- For "No Arms": Show empty circle or dash
- Size: ~60px

**Hat Row:**
```
◀  [Icon showing hat type]  ▶
```
- Show the hat in isolation
- For "No Hat": Show empty circle or dash
- Size: ~60px

**Alternative Visualization (Even Simpler):**
Just show small thumbnail previews of each option in the center, no need for isolated icons:
```
◀  [Mini character preview with this option]  ▶
```

---

## Technical Implementation

### Data Structure

```javascript
const characterOptions = {
    bodies: [
        { id: 'boot', name: 'Boot', color: '#FFA500' },      // Orange
        { id: 'bone', name: 'Bone', color: '#F5E6D3' },      // Cream/bone color
        { id: 'bell', name: 'Bell', color: '#FFD700' },      // Golden
        { id: 'ball', name: 'Ball', color: '#FF6B9D' }       // Pink
    ],
    arms: [
        { id: 'octopus', name: 'Octopus Tentacles', color: '#9B59B6' },  // Purple
        { id: 'short-robot', name: 'Short Robot Arms', color: '#95A5A6' }, // Gray
        { id: 'wiggly-robot', name: 'Wiggly Long Robot Arms', color: '#7F8C8D' }, // Dark gray
        { id: 'trex', name: 'T-Rex Arms', color: '#27AE60' }  // Green (dinosaur color)
    ],
    hats: [
        { id: 'daisy', name: 'Daisy', colors: { petals: '#FFFFFF', center: '#FFD700', stem: '#4CAF50' } },
        { id: 'bike-helmet', name: 'Bike Helmet', color: '#FF5252' },  // Red
        { id: 'mohawk', name: 'Mohawk', color: '#FF1493' },  // Hot pink
        { id: 'tophat', name: 'Top Hat', color: '#1A1A1A' }  // Black
    ]
};

// Current selections (defaults to Ball body, Short Robot arms, Daisy hat)
let selectedBody = 3;  // Ball (index in bodies array)
let selectedArms = 1;  // Short Robot Arms (index in arms array)  
let selectedHat = 0;   // Daisy (index in hats array)
```

### Core Functions

```javascript
// Navigate options
function changeBody(direction) {
    selectedBody = (selectedBody + direction + characterOptions.bodies.length) 
                   % characterOptions.bodies.length;
    updatePreview();
}

function changeArms(direction) {
    selectedArms = (selectedArms + direction + characterOptions.arms.length) 
                   % characterOptions.arms.length;
    updatePreview();
}

function changeHat(direction) {
    selectedHat = (selectedHat + direction + characterOptions.hats.length) 
                  % characterOptions.hats.length;
    updatePreview();
}

// Update character preview
function updatePreview() {
    const body = characterOptions.bodies[selectedBody];
    const arms = characterOptions.arms[selectedArms];
    const hat = characterOptions.hats[selectedHat];
    
    // Render character with selected options
    drawCharacter(body, arms, hat);
}

// Start game with selected character
function startGame() {
    const character = {
        body: characterOptions.bodies[selectedBody],
        arms: characterOptions.arms[selectedArms],
        hat: characterOptions.hats[selectedHat]
    };
    
    // Store character config
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
    
    // Navigate to game
    window.location.href = 'game.html';
    // OR show game screen if single-page app
}
```

### Arrow Button HTML Structure

```html
<!-- Body Selection -->
<div class="selection-row">
    <button class="arrow-button" onclick="changeBody(-1)">
        <span class="arrow">◀</span>
    </button>
    
    <div class="option-display">
        <div id="body-preview">
            <!-- Visual representation of current body -->
        </div>
    </div>
    
    <button class="arrow-button" onclick="changeBody(1)">
        <span class="arrow">▶</span>
    </button>
</div>

<!-- Similar structure for Arms and Hat rows -->
```

### Character Preview Rendering

**Option A: CSS-Based (Simpler, Recommended for MVP)**
```javascript
function drawCharacter(body, arms, hat) {
    const preview = document.getElementById('character-preview');
    
    // Clear previous
    preview.innerHTML = '';
    
    // Create body element
    const bodyEl = document.createElement('div');
    bodyEl.className = `body-${body.id}`;
    bodyEl.style.backgroundColor = body.color;
    
    // Create arms element (if not "none")
    if (arms.id !== 'none') {
        const armsEl = document.createElement('div');
        armsEl.className = `arms-${arms.id}`;
        bodyEl.appendChild(armsEl);
    }
    
    // Create hat element (if not "none")
    if (hat.id !== 'none') {
        const hatEl = document.createElement('div');
        hatEl.className = `hat-${hat.id}`;
        hatEl.style.backgroundColor = hat.color;
        bodyEl.appendChild(hatEl);
    }
    
    preview.appendChild(bodyEl);
}
```

**Option B: Canvas-Based (More Flexible)**
```javascript
function drawCharacter(body, arms, hat) {
    const canvas = document.getElementById('character-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw body shape
    drawBody(ctx, body);
    
    // Draw arms (if selected)
    if (arms.id !== 'none') {
        drawArms(ctx, arms);
    }
    
    // Draw hat (if selected)
    if (hat.id !== 'none') {
        drawHat(ctx, hat);
    }
    
    // Draw face
    drawFace(ctx);
}
```

---

## CSS Styling for Character Parts

### Example: Body Shapes (Nugget Styles)

```css
/* Boot Body - Tall with wider top, narrower bottom */
.body-boot {
    width: 180px;
    height: 220px;
    background: linear-gradient(to bottom, 
        currentColor 0%, 
        currentColor 60%, 
        currentColor 100%);
    border-radius: 40% 40% 30% 30% / 30% 30% 40% 40%;
    clip-path: polygon(
        20% 0%, 80% 0%,
        90% 20%, 90% 100%,
        10% 100%, 10% 20%
    );
    position: relative;
    animation: gentle-bounce 2s ease-in-out infinite;
}

/* Bone Body - Dog bone shape with rounded ends */
.body-bone {
    width: 220px;
    height: 140px;
    position: relative;
    animation: gentle-bounce 2s ease-in-out infinite;
}

.body-bone::before,
.body-bone::after {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: currentColor;
    top: 30px;
}

.body-bone::before {
    left: 0;
}

.body-bone::after {
    right: 0;
}

.body-bone .middle {
    position: absolute;
    width: 100px;
    height: 50px;
    background: currentColor;
    top: 45px;
    left: 60px;
    border-radius: 25px;
}

/* Bell Body - Bell-shaped, wider at bottom */
.body-bell {
    width: 180px;
    height: 200px;
    background: currentColor;
    border-radius: 50% 50% 5% 5% / 20% 20% 50% 50%;
    position: relative;
    clip-path: polygon(
        30% 0%, 70% 0%,
        90% 100%, 10% 100%
    );
    animation: gentle-bounce 2s ease-in-out infinite;
}

/* Ball Body - Classic round nugget (current character) */
.body-ball {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    animation: gentle-bounce 2s ease-in-out infinite;
    /* Slightly irregular circle for organic nugget feel */
    border-radius: 48% 52% 51% 49% / 52% 48% 52% 48%;
}

/* Gentle idle animation */
@keyframes gentle-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
```

### Example: Arms

```css
/* Octopus Tentacles - Curvy organic tentacles */
.arms-octopus {
    position: absolute;
    width: 100%;
    height: 100%;
}

.arms-octopus::before,
.arms-octopus::after {
    content: '';
    width: 15px;
    height: 80px;
    background: linear-gradient(to bottom, #9B59B6, #8E44AD);
    border-radius: 50% 50% 30% 70%;
    position: absolute;
    top: 50%;
}

.arms-octopus::before {
    left: -20px;
    transform: rotate(-15deg);
    /* Add wavy shape with border-radius variations */
}

.arms-octopus::after {
    right: -20px;
    transform: rotate(15deg);
    /* Mirror the wavy shape */
}

/* Could add additional tentacles with pseudo-elements on nested divs */

/* Short Robot Arms - Compact mechanical arms */
.arms-short-robot {
    position: absolute;
}

.arms-short-robot::before,
.arms-short-robot::after {
    content: '';
    width: 30px;
    height: 40px;
    background: linear-gradient(to right, #A0A0A0, #D3D3D3);
    border-radius: 6px;
    border: 2px solid #7F8C8D;
    position: absolute;
    top: 50%;
}

.arms-short-robot::before {
    left: -40px;
    /* Add small hand circle at end */
}

.arms-short-robot::after {
    right: -40px;
}

/* Wiggly Long Robot Arms - Extended segmented arms */
.arms-wiggly-robot {
    position: absolute;
}

.arms-wiggly-robot::before,
.arms-wiggly-robot::after {
    content: '';
    width: 20px;
    height: 100px;
    background: 
        linear-gradient(to bottom,
            #7F8C8D 0%, #7F8C8D 30%,
            #95A5A6 30%, #95A5A6 35%,
            #7F8C8D 35%, #7F8C8D 65%,
            #95A5A6 65%, #95A5A6 70%,
            #7F8C8D 70%, #7F8C8D 100%
        );
    border-radius: 10px;
    position: absolute;
    top: 40%;
}

.arms-wiggly-robot::before {
    left: -30px;
    transform: rotate(-10deg);
}

.arms-wiggly-robot::after {
    right: -30px;
    transform: rotate(10deg);
}

/* T-Rex Arms - Comically tiny arms */
.arms-trex {
    position: absolute;
}

.arms-trex::before,
.arms-trex::after {
    content: '';
    width: 15px;
    height: 25px;
    background: #27AE60;
    border-radius: 4px;
    position: absolute;
    top: 35%;
    /* Very small, high up on body */
}

.arms-trex::before {
    left: -12px;
}

.arms-trex::after {
    right: -12px;
}

/* Add small claws with additional styling */
.arms-trex::before::after,
.arms-trex::after::after {
    content: '';
    width: 8px;
    height: 3px;
    background: #1E8449;
    position: absolute;
    bottom: 0;
}
```

### Example: Hats

```css
/* Daisy Hat - Flower with petals and center */
.hat-daisy {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
}

.hat-daisy .center {
    width: 30px;
    height: 30px;
    background: #FFD700;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.hat-daisy .petal {
    width: 25px;
    height: 35px;
    background: #FFFFFF;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
}

/* Position 6-8 petals around center using transform rotate */
.hat-daisy .petal:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg) translateY(-25px); }
.hat-daisy .petal:nth-child(2) { transform: translate(-50%, -50%) rotate(60deg) translateY(-25px); }
.hat-daisy .petal:nth-child(3) { transform: translate(-50%, -50%) rotate(120deg) translateY(-25px); }
.hat-daisy .petal:nth-child(4) { transform: translate(-50%, -50%) rotate(180deg) translateY(-25px); }
.hat-daisy .petal:nth-child(5) { transform: translate(-50%, -50%) rotate(240deg) translateY(-25px); }
.hat-daisy .petal:nth-child(6) { transform: translate(-50%, -50%) rotate(300deg) translateY(-25px); }

/* Bike Helmet - Rounded protective helmet */
.hat-bike-helmet {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 60px;
    background: #FF5252;
    border-radius: 50% 50% 0 0;
    border: 3px solid #D32F2F;
}

/* Add vents */
.hat-bike-helmet::before,
.hat-bike-helmet::after {
    content: '';
    width: 15px;
    height: 30px;
    background: #1A1A1A;
    border-radius: 3px;
    position: absolute;
    top: 15px;
}

.hat-bike-helmet::before {
    left: 25px;
}

.hat-bike-helmet::after {
    right: 25px;
}

/* Mohawk - Spiky punk hair */
.hat-mohawk {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 70px;
}

/* Create spikes */
.hat-mohawk .spike {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 25px solid #FF1493;
    position: absolute;
    bottom: 0;
}

.hat-mohawk .spike:nth-child(1) { left: 0; height: 60px; }
.hat-mohawk .spike:nth-child(2) { left: 12px; height: 70px; }
.hat-mohawk .spike:nth-child(3) { left: 24px; height: 65px; }

/* Top Hat - Classic tall hat */
.hat-tophat {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
}

.hat-tophat .brim {
    width: 100px;
    height: 15px;
    background: #1A1A1A;
    border-radius: 50%;
    position: relative;
}

.hat-tophat .crown {
    width: 70px;
    height: 60px;
    background: #1A1A1A;
    border-radius: 5px 5px 0 0;
    position: absolute;
    top: -60px;
    left: 15px;
}

/* Optional: Add subtle band */
.hat-tophat .crown::after {
    content: '';
    width: 100%;
    height: 8px;
    background: #424242;
    position: absolute;
    bottom: 10px;
}
```

---

## Animation & Feedback

### Character Preview Animations

**On Selection Change:**
```css
.character-preview {
    transition: transform 0.2s ease-out;
}

.character-preview.changed {
    animation: pop 0.3s ease-out;
}

@keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
```

**Arrow Button Feedback:**
```css
.arrow-button {
    transition: all 0.15s ease;
}

.arrow-button:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
}

.arrow-button:active {
    transform: scale(0.95);
}
```

**Start Button Pulse:**
```css
.start-button {
    animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
    0%, 100% { 
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
        transform: scale(1.05);
    }
}
```

---

## Accessibility & Usability

### Touch Targets
- All buttons minimum 80px × 80px (even larger than game requirements)
- Generous spacing between interactive elements (40px minimum)
- Clear visual affordance (buttons look clickable)

### Visual Clarity
- High contrast between arrows and background
- Large, clear icons/shapes
- Immediate visual feedback on every interaction
- Character preview is dominant focus of screen

### Error Prevention
- No way to "mess up" - all choices are valid
- Circular navigation (can't go "off the end")
- No required selections (comes with defaults)
- Can't accidentally start game (big deliberate button)

### Parent Assistance
- Intuitive enough that parent can explain once
- Visual-only means language-agnostic
- Simple enough to remember between sessions

---

## Flow Integration with Main Game

### Entry Point
User lands on character creation screen first (before game)

### Data Persistence
```javascript
// Save selection when starting game
localStorage.setItem('selectedCharacter', JSON.stringify({
    body: selectedBody,
    arms: selectedArms,
    hat: selectedHat
}));

// Load in main game
const character = JSON.parse(localStorage.getItem('selectedCharacter')) || {
    body: 0, // Default to first option
    arms: 0,
    hat: 0
};
```

### Navigation Flow
```
[Page Load] 
    ↓
[Character Creation Screen]
    ↓ (Click START GAME)
[Main Game - Letter Blaster]
    ↓ (Optional: settings/back button)
[Back to Character Creation]
```

### Optional: In-Game Character Button
Add small button in game UI to return to character creator:
- Icon: Gear or character face
- Position: Top-left corner
- Size: 50px × 50px
- Pauses game when clicked

---

## HTML Structure Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Character</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="character-creator.css">
</head>
<body>
    <div id="creator-container">
        
        <!-- Character Preview -->
        <div id="character-preview-area">
            <div id="character-preview">
                <!-- Character renders here -->
            </div>
        </div>
        
        <!-- Body Selection -->
        <div class="selection-row">
            <button class="arrow-button" onclick="changeBody(-1)" aria-label="Previous body">
                <span class="arrow">◀</span>
            </button>
            <div class="option-display" id="body-display">
                <!-- Current body icon/preview -->
            </div>
            <button class="arrow-button" onclick="changeBody(1)" aria-label="Next body">
                <span class="arrow">▶</span>
            </button>
        </div>
        
        <!-- Arms Selection -->
        <div class="selection-row">
            <button class="arrow-button" onclick="changeArms(-1)" aria-label="Previous arms">
                <span class="arrow">◀</span>
            </button>
            <div class="option-display" id="arms-display">
                <!-- Current arms icon/preview -->
            </div>
            <button class="arrow-button" onclick="changeArms(1)" aria-label="Next arms">
                <span class="arrow">▶</span>
            </button>
        </div>
        
        <!-- Hat Selection -->
        <div class="selection-row">
            <button class="arrow-button" onclick="changeHat(-1)" aria-label="Previous hat">
                <span class="arrow">◀</span>
            </button>
            <div class="option-display" id="hat-display">
                <!-- Current hat icon/preview -->
            </div>
            <button class="arrow-button" onclick="changeHat(1)" aria-label="Next hat">
                <span class="arrow">▶</span>
            </button>
        </div>
        
        <!-- Start Button -->
        <button id="start-button" onclick="startGame()">
            <span class="play-arrow">▶</span>
            START GAME
        </button>
        
    </div>
    
    <script src="character-creator.js"></script>
</body>
</html>
```

---

## Development Checklist

### Phase 1: Basic Structure
- [ ] HTML layout with three selection rows
- [ ] Arrow buttons functional (cycle through options)
- [ ] Start button navigates to game
- [ ] Same gradient background as main game

### Phase 2: Character Rendering  
- [ ] Default character displays in preview
- [ ] Preview updates when selections change
- [ ] All 4 body shapes render correctly
- [ ] All 4 arm types render correctly
- [ ] All 4 hat types render correctly

### Phase 3: Polish
- [ ] Smooth animations on selection change
- [ ] Arrow buttons have hover/active states
- [ ] Character has gentle idle animation
- [ ] Start button has pulse/glow effect
- [ ] Proper spacing and sizing

### Phase 4: Integration
- [ ] Character selection persists to main game
- [ ] Selected character appears in game correctly
- [ ] Can return to creator from game (optional)
- [ ] Works on target devices

### Phase 5: Testing
- [ ] 4-year-old can navigate without text
- [ ] All combinations of body/arms/hat work
- [ ] No visual glitches with any combination
- [ ] Parent finds it intuitive to explain
- [ ] Loads quickly

---

## Asset Creation Guidance (If Using AI/Manual)

### If Using AI Image Generation (ChatGPT/DALL-E):

**Prompt Template:**
```
Create a pixel art character sprite in 8-bit style, 200x200 pixels.

BODY OPTIONS (choose one):
- Boot: Tall nugget shape, wider at top, narrower at bottom (like a bowling pin)
- Bone: Dog bone shape with rounded ends and narrow middle
- Bell: Bell-shaped nugget, wider at bottom, narrower at top
- Ball: Classic round nugget shape

ARM OPTIONS (choose one):
- Octopus Tentacles: 2-3 curvy purple/pink tentacles per side
- Short Robot Arms: Compact gray mechanical arms with small hands
- Wiggly Long Robot Arms: Extended segmented robot arms, flexible appearance
- T-Rex Arms: Tiny, comically short green arms

HAT OPTIONS (choose one):
- Daisy: White petals with yellow center
- Bike Helmet: Rounded protective helmet (red/blue/yellow) with vents
- Mohawk: Spiky punk-style mohawk (hot pink or electric blue)
- Top Hat: Classic tall black top hat

Style: Friendly, cute, simple face with big eyes and smile
Background: Transparent PNG
Pixel art aesthetic, similar to retro video games like Kirby or Chicken Nugget shapes
Organic, rounded edges (not geometric/sharp)
```

**Example Specific Prompts:**
```
"Create pixel art character: Ball-shaped orange nugget body with octopus tentacles 
and daisy flower hat. Friendly face, big eyes, 200x200px, transparent background, 
8-bit retro game style"

"Create pixel art character: Boot-shaped golden nugget body with T-Rex tiny arms 
and mohawk. Friendly face, big eyes, 200x200px, transparent background, 
8-bit retro game style"
```

**Tips:**
- Generate each component separately (body, arms, hat) as layers
- Use consistent art style across all variations
- Request transparent backgrounds
- Specify exact pixel dimensions
- Request "sprite sheet" format if possible

### If Using Manual Pixel Art:

**Tools:**
- Piskel (free, web-based): https://www.piskelapp.com
- Aseprite (paid, $20, very powerful)
- GraphicsGale (free)

**Process:**
1. Create 200x200 canvas
2. Draw base body shape
3. Add face (consistent across all bodies)
4. Create separate layers for arms and hats
5. Export as individual PNGs or sprite sheet

---

## Integration with Main Game

### Passing Character Data

```javascript
// In character-creator.js
function startGame() {
    const characterConfig = {
        bodyType: characterOptions.bodies[selectedBody].id,
        bodyColor: characterOptions.bodies[selectedBody].color,
        armsType: characterOptions.arms[selectedArms].id,
        hatType: characterOptions.hats[selectedHat].id,
        hatColor: characterOptions.hats[selectedHat].color
    };
    
    // Store in localStorage
    localStorage.setItem('playerCharacter', JSON.stringify(characterConfig));
    
    // Navigate to game
    window.location.href = 'game.html';
}

// In game.js
function loadPlayerCharacter() {
    const saved = localStorage.getItem('playerCharacter');
    if (saved) {
        return JSON.parse(saved);
    }
    
    // Default character if none selected
    return {
        bodyType: 'blob',
        bodyColor: '#FFA500',
        armsType: 'robot',
        hatType: 'none'
    };
}

// Use this to render character in game
const playerCharacter = loadPlayerCharacter();
renderCharacter(playerCharacter);
```

---

## Final Notes

### Keep It Simple
- Start with CSS-based rendering (no need for complex sprites initially)
- 4 options per category is perfect (not too many, not too few)
- Visual-only navigation is the right call
- Arrow pattern is intuitive

### Test Early
- Show it to your son early (even half-finished)
- See which body shapes he gravitates toward
- Adjust colors if needed
- Make sure arrows are obvious enough

### Future Enhancements (Not for V1)
- Sound effects when changing options
- More body shapes, arms, hats
- Unlock system (earn new options by playing)
- Save multiple characters
- Character name input (when child can spell)
- Accessories (glasses, shoes, etc.)

---

## Success Criteria

Character creator is successful if:
1. Child can cycle through all options without help after one explanation
2. Character updates are immediate and satisfying
3. Child enjoys customizing (wants to change options multiple times)
4. Selected character appears correctly in main game
5. No bugs with any combination of body/arms/hat
6. Screen is visually appealing to both child and parent

---

This character creator should take 30-60 seconds to use and adds personality to the game. It's simple enough to build quickly but engaging enough to make the game feel more "theirs."
