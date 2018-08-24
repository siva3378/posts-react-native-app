import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "mobx-react";
import stores from './src/stores';
import Posts from './src/components/pages/Posts';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={stores}>
        <View style={styles.container}>
          <Text style={styles.h4}>Blogging Application Test Case</Text>
          <Posts />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h4:{
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
  }
});
