import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TodoList from './component/TodoList'
import AddListModal from './component/AddListModal';
import generateString from './utils';
export default function App() {
  const data = []
  const [list, setList] = useState(data);
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const toggleAddTodoModal = () => {

    console.log(list)
  }
  const createTodo = (text, color) => {
    const todoList = {
      name: text,
      color: color,
      todos: []
    }
    list.unshift(todoList);
    setList(list);
  }
  const updateList = (change) =>{
      let index = list.findIndex(item => item.id == change.id);
      list[index] = change;
      setList(list)
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        transparent={true}
        onRequestClose={() => setAddTodoVisible(!addTodoVisible)}
      >
        <AddListModal
          closeModal={() => setAddTodoVisible(!toggleAddTodoModal)}
          createTodo={(text, color) => createTodo(text, color)}
        />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider}></View>
        <Text style={styles.title}>
          Todo <Text style={styles.list}>Lists</Text>
        </Text>
        <View style={styles.divider}></View>
      </View>
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => setAddTodoVisible(!addTodoVisible)}
        >
          <AntDesign
            name="plus"
            size={16}
            color='#24A6D9'
          ></AntDesign>
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{ height: 275, paddingLeft: 23 }}>
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TodoList list={item} onUpdateList = {(change) => updateList(change)}></TodoList>
          )}
        >
        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: '#A7CBD9',
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  list: {
    fontWeight: "300",
    color: '#A6D9'
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: '#2D3436',
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: '#A6D9',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    color: '#A6D9',
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  }
});
