# Product Images Directory

This directory contains product images for the ShotPay e-commerce platform.

## Image Files

Place your product images in this directory with the following naming convention:
- Use lowercase letters and hyphens
- Match the image path specified in `data/products.ts`

### Current Product Images:

1. `glock-19-gen5.jpg` - Glock 19 Gen 5 9mm Pistol
2. `smith-wesson-mp15.jpg` - Smith & Wesson M&P15 Sport II AR-15
3. `remington-870.jpg` - Remington 870 Express 12 Gauge Shotgun
4. `federal-9mm-fmj.jpg` - Federal Premium 9mm 115gr FMJ Ammunition
5. `winchester-223.jpg` - Winchester .223 Remington 55gr FMJ Ammunition
6. `federal-buckshot.jpg` - Federal Premium 12 Gauge 00 Buck Shot
7. `sig-p320.jpg` - Sig Sauer P320 Compact 9mm Pistol
8. `hornady-critical-defense.jpg` - Hornady Critical Defense 9mm 115gr FTX Ammunition

## Image Specifications

- **Format**: JPG or PNG
- **Recommended Size**: 800x800px minimum (square aspect ratio)
- **Max File Size**: 500KB per image
- **Color Space**: sRGB

## Adding New Images

1. Add your image file to this directory
2. Update the `image` field in `data/products.ts` to match your filename
3. The application will automatically use the image or fall back to a placeholder

## Placeholder

If an image fails to load or doesn't exist, the application will display a placeholder SVG icon.

