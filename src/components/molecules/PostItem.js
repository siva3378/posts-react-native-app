import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { PostItemText, PostItemActions } from '../atoms';

export const PostItem = ({ item, onEdit, onDelete }) => {
  return (
  <TouchableHighlight onPress={() => alert(item.content)}>
    <View style={styles.postItem}>
      <PostItemText content={item.content} />
      <PostItemActions item={item} onEdit={onEdit} onDelete={onDelete}/>
    </View>
  </TouchableHighlight>
)};

const styles = {
  postItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 1,
  }
}