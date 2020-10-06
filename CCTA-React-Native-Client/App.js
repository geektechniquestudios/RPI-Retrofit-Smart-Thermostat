import React, {useEffect, useState} from 'react';
import {RNFluidicSlider} from 'react-native-fluidic-slider';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  const [temperature, setTemperature] = useState(70); //
  // useEffect(() => {
  //   fetch("10.0.0.20") //get temp from spring boot server
  // })

  function handleNewTemp(position) {
    setTemperature(Math.trunc(position * 20 + 60));
    //send request to spring boot server
  }

  return (
    <>
      <View style={styles.slider}>
        <RNFluidicSlider
          min={60}
          max={80}
          initialPosition={(temperature - 60) / 20}
          bubbleColor="blue" //make same as bg
          barColor="black" //add temp color func
          bubbleTextColor="white"
          endTracking={(position) => handleNewTemp(position)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.gray,
  },
  slider: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
