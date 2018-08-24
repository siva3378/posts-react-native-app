import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const Error = ({ isTouched, isValid }) => {
  return (isTouched && !isValid)
    ? (<Text style={{ color: 'red' }}>You cannot publish an empty post.</Text>)
    : null;
}

export const PostForm = (props) => {
  const isUpdate = props.editId === props.id;
  const label = isUpdate ? 'Update' : 'Publish';
  
  return (
    <View style={styles.formStyles}>
      <TextInput
        multiline = {true}
        numberOfLines = {6}
        clearButtonMode="always"
        style={styles.textInput}
        placeholder="What's on your mind? ahh"
        value={props.content}
        onChangeText={(text) => props.onContentChange(text)}
      />
      <Error {...props} />
      <View style={styles.button}>
        <Button
          onPress={() => props.onSaveContent(props.id, props.content)}
          title={label}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  formStyles: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxHeight: 170,
  },
  textInput: {
    // height: 90,
    width: '100%',
  },
  button: {
    alignSelf: 'flex-end',
    width: 120,
  },
});