# Icon and splash specs

Master color: cream `#F5F0E8`, green `#2F7D4A`, ink `#2A2622`.
Mark: green circle, cream serif **C**. No photo. No plate clip-art. No transparency on the App Store master.

## Files Apple wants

| Use | Size | Notes |
|---|---|---|
| App Store / AppIcon | 1024 × 1024 PNG | No alpha, no rounded corners (iOS rounds them) |
| iPhone notification | 20pt @3x = 60 px | Xcode catalog |
| Settings | 29pt @3x = 87 px | |
| Spotlight | 40pt @3x = 120 px | |
| iPhone app | 60pt @3x = 180 px | |
| iPad app | 76pt @2x = 152 px | if you ship iPad |
| Apple-touch (web) | 180 × 180 PNG | Home Screen from Safari |
| PWA | 192 and 512 PNG | Android / install prompts |

Do not put the word Cadence on the 1024 icon. The name already sits under the icon.

## Splash / launch screen

Full-bleed cream `#F5F0E8`. Centered green C (about 1/3 of the short side). Optional wordmark under it in ink, Fraunces / Georgia.

Common frames to export:
- iPhone 15/16 Pro: 1179 × 2556
- iPhone 15/16 Pro Max: 1290 × 2796
- iPhone SE: 750 × 1334

In Capacitor / Xcode, one storyboard splash that stretches is enough if it is only cream + C.

## Safe zone

Keep the C inside the center 70%. iOS masks icons to a rounded square. Do not put important marks in the corners.
