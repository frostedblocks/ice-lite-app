import { useRef, useState, useCallback } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useEffect } from "react";

const LITE_URL = "https://lite.frostedblocks.com";

function allowed(url) {
  try {
    const host = new URL(url).hostname;
    return (
      host === "lite.frostedblocks.com" ||
      host === "frostedblocks.com" ||
      host === "www.frostedblocks.com" ||
      host.endsWith(".frostedblocks.com") ||
      host === "accounts.google.com" ||
      host === "accounts.youtube.com" ||
      host.endsWith(".google.com") ||
      host.endsWith(".gstatic.com") ||
      host.endsWith(".googleusercontent.com")
    );
  } catch {
    return false;
  }
}

export default function App() {
  const webRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const onBack = useCallback(() => {
    if (canGoBack && webRef.current) {
      webRef.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    if (Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [onBack]);

  if (error) {
    return (
      <SafeAreaView style={styles.wrap}>
        <StatusBar style="light" />
        <View style={styles.center}>
          <Text style={styles.title}>ICE Lite</Text>
          <Text style={styles.msg}>Could not load lite.frostedblocks.com</Text>
          <Pressable
            style={styles.btn}
            onPress={() => {
              setError(null);
              setLoading(true);
            }}
          >
            <Text style={styles.btnText}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrap} edges={["top", "bottom"]}>
      <StatusBar style="light" />
      <WebView
        ref={webRef}
        source={{ uri: LITE_URL }}
        style={styles.web}
        originWhitelist={["https://*"]}
        allowsBackForwardNavigationGestures
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        pullToRefreshEnabled
        setSupportMultipleWindows={false}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
        onError={() => setError(true)}
        onHttpError={(e) => {
          if (e.nativeEvent.statusCode >= 500) setError(true);
        }}
        onShouldStartLoadWithRequest={(req) => {
          const url = req.url || "";
          if (url.startsWith("mailto:") || url.startsWith("tel:")) {
            Linking.openURL(url);
            return false;
          }
          if (!allowed(url)) {
            Linking.openURL(url);
            return false;
          }
          return true;
        }}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator color="#7dd3fc" size="large" />
          </View>
        )}
      />
      {loading ? (
        <View pointerEvents="none" style={styles.loader}>
          <ActivityIndicator color="#7dd3fc" size="large" />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#070b14" },
  web: { flex: 1, backgroundColor: "#070b14" },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#070b14",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { color: "#e2e8f0", fontSize: 22, fontWeight: "700", marginBottom: 8 },
  msg: { color: "#94a3b8", textAlign: "center", marginBottom: 20 },
  btn: {
    backgroundColor: "#38bdf8",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  btnText: { color: "#0f172a", fontWeight: "700" },
});
