import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { PostFeedback } from '../atoms';
import { PostFeeds, PostForm } from '../organisms';
/**
 * Smart component
 */
export default inject(['store'])(observer(
  class Posts extends Component {
    componentDidMount() {
      this.props.store.PostStore.loadData();
    }

    render() {
      const { PostStore } = this.props.store;
      const { posts, totalPosts } = PostStore;

      return (
        <View style={style}>
          <PostForm
            {...PostStore.newPostData}
            editId={PostStore.editId}
            onContentChange={PostStore.onContentChange}
            onSaveContent={PostStore.addOrUpdate}
          />
          <PostFeeds
            list={posts}
            loadMore={PostStore.loadData}
            onEdit={PostStore.editPost}
            onDelete={PostStore.deletePost}
          />
          <PostFeedback
            loadedCount={posts.length}
            totalCount={totalPosts}
            isLoading={PostStore.callInProgress}
          />
        </View>
      );
    }
  }
));

const style = {
  width: '100%',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
}