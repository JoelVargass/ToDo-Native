import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { fetchAllTasks, addTask, deleteTask } from "../db/db";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      await initDB();
      const loadedTasks = await fetchAllTasks();
      setTasks(loadedTasks);
    };

    initialize();
  }, []);

  const handleAddTask = async () => {
    if (task.trim()) {
      await addTask(task);
      setTask("");
      const updatedTasks = await fetchAllTasks();
      setTasks(updatedTasks);
    } else {
      alert("⚠️ Escribe una tarea válida");
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    const updatedTasks = await fetchAllTasks();
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Agregar nueva tarea"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0077FF",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#000",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#FFCC00",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
    padding: 10,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#000",
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
});

export default Home;
