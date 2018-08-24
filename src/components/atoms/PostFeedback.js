import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const Loading = ({isLoading}) => {
  return isLoading
  ? <Text style={infoStyle}> Loading...</Text>
  : null
}

export const PostFeedback = ({ loadedCount, totalCount, isLoading }) => {
  return (
    <View style={styles}>
      <Text style={infoStyle}>
        Showing {loadedCount} out of {totalCount}
      </Text>
      <Loading isLoading={isLoading} />
    </View>
  );
}

const styles = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: '#f7f7f7',
  maxHeight: 50,
}

const infoStyle = {
  fontSize: 14,
  color: '#a29a9a'
}