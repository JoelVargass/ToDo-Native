import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { fetchAllTasks, addTask, deleteTask, initDB } from "../db/db";
import { Plus, Trash } from "lucide-react-native";
import Toast from "react-native-toast-message";
import ModalComponent from "../components/ModalComponent";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
      setModalVisible(false);
      const updatedTasks = await fetchAllTasks();
      setTasks(updatedTasks);
      Toast.show({
        type: "success",
        text1: "✅ Tarea añadida",
        text2: "Se ha agregado una nueva tarea",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "⚠️ Error",
        text2: "Escribe una tarea válida",
      });
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    const updatedTasks = await fetchAllTasks();
    setTasks(updatedTasks);
    Toast.show({
      type: "info",
      text1: "❌ Tarea eliminada",
      text2: "La tarea ha sido eliminada correctamente",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TuTarea</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <Trash size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Plus size={28} color="#FFF" />
      </TouchableOpacity>

      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
      />

      <Toast />
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
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 3,
    borderColor: "#000",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    flexShrink: 1,
    marginRight: 10,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#FFCC00",
    borderRadius: 50,
    padding: 15,
    borderWidth: 3,
    borderColor: "#000",
    elevation: 5,
  },
});

export default Home;