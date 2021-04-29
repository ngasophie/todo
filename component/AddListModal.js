import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
export default function AddListModal(props) {
  const listColors = ['green', 'blue', 'orange', 'red'];
  const [name, setName] = useState('');
  const createTodo = () => {
    if (name != '') {
      props.createTodo(name, listColors[Math.floor(Math.random() * 3)]);
      props.closeModal();
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={props.closeModal}>
        <AntDesign name='close' size={24} color='#000' />
      </TouchableOpacity>
      <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
        <Text style={styles.title}> Create TodoList</Text>
        <TextInput style={styles.input} placeholder="List todo" onChangeText={(text) => setName(text)} />
        <TouchableOpacity style={[styles.create, { backgroundColor: 'green' }]} onPress={() => createTodo()}>
          <Text style={{ color: '#fff', fontWeight: "600" }}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: '#000',
    alignSelf: 'center',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#A6D9',
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  }
})