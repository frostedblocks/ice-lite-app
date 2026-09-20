# ICE Lite phone app

Expo WebView wrapper for https://lite.frostedblocks.com

Same login, feed, Circles, and messages as the site. No wallet on this app.

## Run on your phone

1. Install Node 20.
2. Install Expo Go on your phone.
3. Clone and start:

```bash
git clone https://github.com/frostedblocks/ice-lite-app.git
cd ice-lite-app
npm install
npx expo start
```

4. Scan the QR with Expo Go (Android) or Camera (iPhone).

## Installable build (later)

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
eas build --platform ios --profile preview
```
