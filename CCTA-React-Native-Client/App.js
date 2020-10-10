import React, {useEffect, useState} from 'react';
import {RNFluidicSlider} from 'react-native-fluidic-slider';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

const App: () => React$Node = () => {
  const [temperature, setTemperature] = useState(70); //considering use init state hook instead
  const [bubbleColor, setBubbleColor] = useState('black');
  const [isLoading, setIsLoading] = useState(true);
  const [barColor, setBarColor] = useState('white');
  useEffect(() => fetchTemp(), [isLoading]);

  function fetchTemp() {
    console.log('fetching temperature from server');
    fetch('http://10.0.0.6:8080/get_temperature') //get temp from spring boot server
      .then((res) => res.json())
      .then((data) => {
        console.log('fetching temperature');
        setTemperature(data.temperature);
        console.log(`fetched temperature ${data.temperature}`);
        setIsLoading(false);
      })
      .catch((e) => alert(e)); //(e) => fetchTemp());
  }

  function handleNewTemp(position) {
    let newTemperature = Math.trunc(position * 20 + 60);
    setTemperature(newTemperature);
    console.log(`Sending temp to thermostat: ${newTemperature}`);
    const putRequest = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({temperature: newTemperature}),
    };
    fetch('http://10.0.0.6:8080/update_temperature', putRequest).catch((e) =>
      console.log(e),
    );
  }

  return (
    <>
      <View style={styles.main}>
        {isLoading ? (
          <Progress.Bar
            borderWidth={0}
            height={20}
            color={'white'}
            indeterminate={true}
            indeterminateAnimationDuration={3000}
            width={200}
          />
        ) : (
          <RNFluidicSlider
            min={60}
            max={80}
            initialPosition={(temperature - 60) / 20}
            bubbleColor={bubbleColor}
            barColor={barColor}
            bubbleTextColor="white"
            endTracking={(position) => handleNewTemp(position)}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
});

export default App;
