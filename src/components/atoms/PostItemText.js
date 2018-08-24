import React from 'react';
import { View, Text } from 'react-native';

export const PostItemText = ({content}) => {
  return (
    <View style={styles}>
      <Text>{content}</Text>
    </View>
  );
}

const styles = {
  width: '80%'
};