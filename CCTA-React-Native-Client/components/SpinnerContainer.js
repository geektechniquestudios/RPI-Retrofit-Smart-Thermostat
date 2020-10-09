import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

const SpinnerContainer = () => {
  return (
    <Progress.Bar
      borderWidth={0}
      height={20}
      color={'white'}
      indeterminate={true}
      indeterminateAnimationDuration={3000}
      width={200}
    />
  );
};

export default SpinnerContainer;
