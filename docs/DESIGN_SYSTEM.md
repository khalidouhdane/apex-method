# APEX METHOD — Design System (3-Tier Architecture)

This document is the master source of truth for the APEX METHOD visual language. It uses a 3-tier token system to ensure cinematic consistency and effortless theming.

## Tier 1: Primitives (Fixed)
Primitives are raw values that never change. They define our palette but carry no meaning on their own.

### Core Grays (The "Obsidian" Scale)
*   `--gray-50`: `#F8F7F7`
*   `--gray-100`: `#EEEDEC`
*   `--gray-200`: `#DED6CE`
*   `--gray-800`: `#1D1815`
*   `--gray-900`: `#1A1614`
*   `--gray-950`: `#0F0D0B`

### Core Bronzes (The "Apex" Scale)
*   `--bronze-100`: `#E6B599`
*   `--bronze-500`: `#CC8E66`
*   `--bronze-700`: `#A66840`
*   `--bronze-900`: `#70401F`

## Tier 2: Semantic System (Theme-Driven)
Semantic tokens assign meaning to primitives based on the active theme (`[data-theme]`).

| Token | Dark (Default) | Light (Lumière) |
| :--- | :--- | :--- |
| `--sys-bg` | `--gray-950` | `--gray-100` |
| `--sys-surface` | `--gray-900` | `--gray-50` |
| `--sys-text-pri` | `rgba(255, 255, 255, 0.9)` | `--gray-950` |
| `--sys-text-dim` | `--text-dim` (Current) | `--gray-800` |
| `--sys-border` | `--gray-800` | `rgba(0, 0, 0, 0.08)` |

## Tier 3: Component Tokens (Specific)
Component tokens are the final layer used in CSS classes. They reference Tier 2.

### Global Glass Dynamics
| Token | Obsidian (Vivid) | Crystal (Dark) | Lumière (Light) |
| :--- | :--- | :--- | :--- |
| `--comp-glass-bg` | `rgba(15, 13, 11, 0.85)` | `rgba(251, 247, 244, 0.05)` | `#F8F7F7` |
| `--comp-glass-border` | `rgba(255, 255, 255, 0.1)` | `rgba(251, 247, 244, 0.1)` | `rgba(255, 255, 255, 1)` |
| `--comp-glass-blur` | `16px` | `22px` | `0px` |
| `--comp-glass-saturate` | `180%` | `100%` | `100%` |
| `--comp-card-shadow` | `0 16px 40px rgba(0,0,0,0.5)` | `0 10px 40px rgba(0,0,0,0.2)` | `0 20px 50px rgba(0,0,0,0.08)` |

### Navigation
*   `--comp-nav-bg`: References `--comp-glass-bg`
*   `--comp-nav-text`: References `--sys-text-pri`

### Buttons
*   `--comp-btn-pri-bg`: `--bronze-500`
*   `--comp-btn-outline-text`: References `--sys-text-pri`

## Usage Instructions
1.  **NEVER** hardcode hex values in component CSS.
2.  **NEVER** use Primitives (Tier 1) directly in component CSS.
3.  **ALWAYS** use Component Tokens (Tier 3) or Semantic Tokens (Tier 2).
