import React from 'react';
import { View, FlatList } from 'react-native';
import { PostItem } from '../molecules';

export const PostFeeds = (props) => {
  return (
    <View style={{flex:1 }}>
      <FlatList
        keyExtractor={(item) => `item-${item.id}`}
        onEndReached={props.loadMore}
        onEndReachedThreshold={0.4}
        data={props.list}
        renderItem={(item) => <PostItem
          {...item}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          />}
      />
    </View>
  );
}