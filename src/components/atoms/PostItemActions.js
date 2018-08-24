import React from 'react';
import { View, Button } from 'react-native';

export const PostItemActions = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles}>
      <View style={buttonStyle}>
        <Button color='#ddd' onPress={() => onDelete(item)} title={'D'} />
      </View>
      <View style={buttonStyle}>
        <Button color='#ddd' onPress={() => onEdit(item)} title={'E'} />
      </View>
    </View>
  );
}

const styles = {
  flex: 1,
  flexDirection: 'row',
  width: '18%',
  alignItems: 'flex-end',
};

const buttonStyle = {
  width: 30,
  margin: 3
}