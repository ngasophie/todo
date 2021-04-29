import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
export default function TodoModal(props) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const generateString = (length) => {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const [list,setList] = useState(props.list);
    const name = list.name;
    const color = list.color;
    const todos =list.todos;
    const taskCount = list.todos.length;
    const [text, setText] = useState('');
    const onAdd = () =>{
        if(text != ''){
            const id = generateString(10)
            list.todos.unshift({
                id: id,
                title: text,
                completed: false
            });
            setList({...list})
            setText('');
            props.onUpdateList(list)
        }
    }
    const onCompleted = (id) =>{
        let index = list.todos.findIndex(item =>  item.id == id );
        console.log(list.todos[index].completed)
        if(index!= -1){
            list.todos[index]['completed'] = !list.todos[index]['completed'];
            setList({...list})
            props.onUpdateList(list)

        }
    } 
    const renderTodo = (todo) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress = {()=> onCompleted(todo.id)}>
                    <Ionicons
                        name={todo.completed ? 'ios-square' : 'ios-square-outline'}
                        size={24} color={'#bbb'}
                        style={{ width: 32 }}
                    />
                </TouchableOpacity>
                <Text
                    style={[styles.todo, { color: todo.completed ? '#bbb' : '#000' },
                    { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}
                >{todo.title}</Text>
            </View>
        )
    }
    const completed = list.todos.filter(todo => todo.completed).length;
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                onPress={() => props.closeModal()}
            >
                <AntDesign
                    name="close"
                    size={24}
                    color='#000'
                ></AntDesign>
            </TouchableOpacity>
            <View style={[styles.section, styles.header, { borderBottomColor: color }]}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.taskCount}>{completed} of {taskCount} tasks</Text>
            </View>
            <View style={[styles.section, { flex: 3 }]}>
                <FlatList
                    data={list.todos}
                    renderItem={({ item }) => renderTodo(item)}
                    contentContainerStyle={false}
                    keyExtractor={item => item.id}

                />
            </View>
            <KeyboardAvoidingView
                style={[styles.section, styles.footer]}
                behavior="padding"
            >
                <TextInput style={[styles.input, { borderColor: color }]} value={text} onChangeText={(text) => setText(text)}></TextInput>
                <TouchableOpacity style={[styles.addTodo, { backgroundColor: color }]} onPress = {() => onAdd()}>
                    <AntDesign
                        name="plus"
                        size={16}
                        color={'#fff'}
                    />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        flex: 1,
        alignSelf: 'stretch'
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: '#000'
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: '#bbb',
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 80
    },
    todo: {
        color: '#000',
        fontWeight: "700",
        fontSize: 16
    }
})