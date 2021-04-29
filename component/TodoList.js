import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ProgressViewIOSComponent } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TodoModal from './TodoModal';
export default function TodoList(props) {
    const [showListVisible, setShowListVisible] = useState(false);
    const toggleListModal = () => {
        setShowListVisible(!showListVisible);
    }
    const list = props.list
    const completed = list.todos.filter(todo => todo.completed == true).length;
    const remaining = list.todos.length - completed;
    const updateList = (list) =>{
        props.onUpdateList(list)
    }
    return (
        <View>
            <Modal animationType="slide" visible={showListVisible} onRequestClose={() => toggleListModal()}>
                <TodoModal list={list} closeModal={() => toggleListModal()} onUpdateList = {(list) =>updateList(list)}></TodoModal>
            </Modal>
            <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onPress={() => toggleListModal()}>
                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{completed}</Text>
                        <Text style={styles.subTitle}>Remaining</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{remaining}</Text>
                        <Text style={styles.subTitle}>Remaining</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 24,

        color: '#fff',
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: '#fff'
    },
    subTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: '#fff'
    }
})