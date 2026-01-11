# PWA Setup Guide

## Icons Required

To complete the PWA setup, you need to create the following icon files in the `public` folder:

1. **pwa-192x192.png** - 192x192 pixels (for Android)
2. **pwa-512x512.png** - 512x512 pixels (for Android and splash screen)
3. **apple-touch-icon.png** - 180x180 pixels (for iOS)

## Creating Icons

You can use online tools like:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)

Or create them manually using design tools.

## Features Enabled

✅ **Service Worker** - Automatic updates
✅ **Offline Support** - Cached assets work offline
✅ **Install Prompt** - Users can install as app
✅ **Mobile Optimized** - Responsive layout with mobile breakpoints
✅ **iOS Support** - Apple touch icons and meta tags
✅ **Android Support** - Manifest and theme colors

## Testing PWA

1. Build the app: `yarn build`
2. Preview: `yarn preview`
3. Open Chrome DevTools → Application → Service Workers
4. Check "Offline" to test offline functionality
5. Use "Add to Home Screen" to test installation

## Mobile Testing

- **iOS**: Open in Safari, tap Share → Add to Home Screen
- **Android**: Chrome will show install banner automatically

## Customization

Edit `vite.config.ts` to customize:
- App name and description
- Theme colors
- Icons
- Cache strategies

