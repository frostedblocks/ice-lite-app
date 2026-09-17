# ICE Lite phone app

Expo WebView app pointed at https://lite.frostedblocks.com

Same login, feed, Circles, and messages as the site.

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

4. Scan the QR code with Expo Go (Android) or the Camera app (iPhone).

## Build a real installable app later

```bash
npm install -g eas-cli
eas login
eas build --platform android
eas build --platform ios
```
