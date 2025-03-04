import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Checkbox from 'expo-checkbox';
const { initDB, fetchAllTasks, addTask, deleteTask, updateTask, updateTaskStatus } = require('../db/db');
import { Plus, Trash } from "lucide-react-native";
import Toast from "react-native-toast-message";
import ModalComponent from "../components/ModalComponent";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");

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

  const handleEditTask = async (id, newName) => {
    await updateTask(id, newName);
    const updatedTasks = await fetchAllTasks();
    setTasks(updatedTasks);
    setEditModalVisible(false);
    Toast.show({
      type: "success",
      text1: "✏️ Tarea editada",
      text2: "La tarea ha sido actualizada correctamente",
    });
  };

  const handleToggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pendiente" ? "completada" : "pendiente";
    await updateTaskStatus(id, newStatus);
    const updatedTasks = await fetchAllTasks();
    setTasks(updatedTasks);
    Toast.show({
      type: "success",
      text1: newStatus === "completada" ? "✅ Tarea completada" : "🔄 Tarea pendiente",
      text2: `La tarea ha sido marcada como ${newStatus}`,
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedTab === "all") return true;
    if (selectedTab === "pending") return task.status === "pendiente";
    if (selectedTab === "completed") return task.status === "completada";
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TuTarea</Text>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "all" && styles.selectedTab]}
          onPress={() => setSelectedTab("all")}
        >
          <Text style={styles.tabText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "pending" && styles.selectedTab]}
          onPress={() => setSelectedTab("pending")}
        >
          <Text style={styles.tabText}>Pendientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "completed" && styles.selectedTab]}
          onPress={() => setSelectedTab("completed")}
        >
          <Text style={styles.tabText}>Completadas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
                      <Checkbox
              value={item.status === "completada"}
              onValueChange={() => handleToggleTaskStatus(item.id, item.status)}
              color={item.status === "completada" ? '#4CAF50' : '#FFCC00'}
          />
            <TouchableOpacity
              onPress={() => { setEditingTask(item); setEditModalVisible(true); }}
              style={styles.taskTextContainer}
            >
              <Text style={[styles.taskText, item.status === "completada" && styles.completedTaskText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
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

      {editingTask && (
        <ModalComponent
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          task={editingTask.name}
          setTask={(text) => setEditingTask({ ...editingTask, name: text })}
          handleAddTask={() => handleEditTask(editingTask.id, editingTask.name)}
        />
      )}

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
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#FFF",
  },
  selectedTab: {
    backgroundColor: "#FFCC00",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
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
  taskTextContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "#888",
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