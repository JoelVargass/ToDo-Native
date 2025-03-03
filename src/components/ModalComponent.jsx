import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  
  const ModalComponent = ({
    modalVisible,
    setModalVisible,
    task,
    setTask,
    handleAddTask,
  }) => {
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Tarea</Text>
  
            <TextInput
              style={styles.input}
              placeholder="Escribe tu tarea..."
              value={task}
              onChangeText={setTask}
            />
  
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleAddTask}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  // Estilos del modal
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    modalContent: {
      backgroundColor: "#FFF",
      width: "100%",
      maxWidth: 400,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#333",
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 5,
      marginBottom: 20,
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 5,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    addButton: {
      backgroundColor: "#FFCC00",
      marginLeft: 10,
      borderWidth: 3,
      borderColor: "#000",
    },
    cancelButton: {
      backgroundColor: "transparent",
      marginRight: 10,
      borderWidth: 3,
      borderColor: "#000",
    },
    buttonText: {
      color: "#333",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
  
  export default ModalComponent;