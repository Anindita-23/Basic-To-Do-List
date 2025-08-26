import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐻 To-Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.removeText}>🧹</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nothing to do yet! ✨</Text>}
        style={styles.list}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4ec',
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  title: {
    fontSize: 28,
    color: '#a86fa8',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'sans-serif-medium',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    borderColor: '#f3c6e8',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
    shadowColor: '#f3c6e8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#a86fa8',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a86fa8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    shadowColor: '#f3c6e8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#a86fa8',
    fontFamily: 'sans-serif',
  },
  removeText: {
    color: '#f3c6e8',
    fontSize: 20,
    marginLeft: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#bfa8c6',
    fontSize: 16,
    marginTop: 32,
    fontFamily: 'sans-serif',
  },
});
