import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const LITE_URL = "https://lite.frostedblocks.com";

export default function App() {
  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar style="light" />
      <WebView
        source={{ uri: LITE_URL }}
        style={styles.web}
        originWhitelist={["https://*"]}
        allowsBackForwardNavigationGestures
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        setSupportMultipleWindows={false}
        onShouldStartLoadWithRequest={(req) => {
          const url = req.url || "";
          return (
            url.startsWith("https://lite.frostedblocks.com") ||
            url.startsWith("https://www.frostedblocks.com") ||
            url.startsWith("https://frostedblocks.com") ||
            url.startsWith("https://accounts.google.com")
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#070b14" },
  web: { flex: 1, backgroundColor: "#070b14" },
});
