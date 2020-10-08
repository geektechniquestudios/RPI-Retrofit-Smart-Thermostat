import React, {useEffect, useState} from 'react';
import {RNFluidicSlider} from 'react-native-fluidic-slider';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
// import {scaleLinear} from 'd3-scale';

// const tipColor = scaleLinear()
//   .domain([-11, -2, 0, 11])
//   .range(['#03fcf4', '#ccfaff', '#f4fa9d', '#de3e26']);

const App: () => React$Node = () => {
  const [temperature, setTemperature] = useState(70); //
  const [bubbleColor, setBubbleColor] = useState('red'); //tipColor(temperature - 71));

  // const [barColor, setBarColor] = useState(tipColor(temperature - 69));
  // useEffect(() => fetchTemp());

  function fetchTemp() {
    fetch('10.0.0.6:8080/get_temperature') //get temp from spring boot server
      .then((res) => res.json())
      .then((data) => {
        setTemperature(data.temperature);
      })
      .catch((e) => fetchTemp());
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

  // function componentToHex(c) {
  //   var hex = c.toString(16);
  //   return hex.length == 1 ? '0' + hex : hex;
  // }

  // // function rgbToHex(r, g, b) {
  // //   return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  // // }

  // function rgbToHex(a) {
  //   a = a.split('(')[1].split(')')[0];
  //   a = a.split(',');
  //   var b = a.map(function (x) {
  //     //For each array element
  //     x = parseInt(x).toString(16); //Convert to a base16 string
  //     return x.length == 1 ? '0' + x : x; //Add zero if we get only one character
  //   });
  //   b = b.join('');
  //   return b;
  // }

  return (
    <>
      <View style={styles.main}>
        {/* <Text>{tipColor(-4)}</Text> */}
        <RNFluidicSlider
          min={60}
          max={80}
          initialPosition={(temperature - 60) / 20}
          bubbleColor={bubbleColor}
          //bubbleColor={rgbToHex(tipColor(-4))} //make same as bg
          // barColor={this.barColor} //add temp color func
          bubbleTextColor="white"
          endTracking={(position) => handleNewTemp(position)}
        />
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
});

export default App;
