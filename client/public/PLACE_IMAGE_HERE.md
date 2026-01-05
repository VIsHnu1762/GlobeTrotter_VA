# 🎨 Background Image Setup

## Instructions

Please save the 3D travel landmarks image as:
**`travel-landmarks-3d.png`**

Place it in this directory: `/client/public/`

The image will automatically be blended into the background of:
- Home page (Hero section)
- Dashboard page (Subtle backdrop)

## Blending Effects Applied

✅ **Home Page**:
- Opacity: 15%
- Mix-blend-mode: multiply
- Gradient overlays for smooth integration
- Fixed position background

✅ **Dashboard**:
- Opacity: 8%
- Mix-blend-mode: soft-light
- Positioned at bottom center
- More subtle for workspace feel

## Alternative

If you prefer a different image location or name, update:
- `/client/src/pages/Home.tsx` (line ~11)
- `/client/src/pages/Dashboard.tsx` (line ~27)

Change `url(/travel-landmarks-3d.png)` to your preferred path.
