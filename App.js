import React, { useState, useEffect } from 'react';
import { StyleSheet, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants'

export default function App() {
  const [cangoback, setCangoback] = useState(false);
  const [webview, setWebview] = useState(null);

  useEffect(() => {
    // adding event listner on back button press
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const backAction = () => {
    // checking if app can navigate to a previous screen
    if(cangoback) {
      // navigating to a previous screen
      webview.goBack();
    } else {
      // showing alert app cannot navigate to previous screen, to exit app
      Alert.alert("Exit", "Are you sure you want to exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        // exiting app on yes
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
    }
    return true;
  };

  return (
    <WebView
      ref={ref => setWebview(ref)}
      style={styles.container}
      source={{ uri: 'https://propertyclick.pk/' }}
      onNavigationStateChange={(navState) => {
        // Keep track of going back navigation for back button press
        setCangoback(navState.canGoBack);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
});
