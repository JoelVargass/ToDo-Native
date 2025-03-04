import React, { useState } from 'react';
import { 
  Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, KeyboardAvoidingView, 
  ScrollView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === 'usuario@ejemplo.com' && password === 'password123') {
      await SecureStore.setItemAsync('userToken', 'loggedIn');
      Alert.alert('Éxito', 'Inicio de sesión correcto');
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <Text style={styles.title}>Bienvenido a TuTarea!</Text>
            
          <TextInput 
            style={styles.input} 
            placeholder="Correo electrónico" 
            placeholderTextColor="#333"
            value={email} 
            onChangeText={setEmail} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña"
            placeholderTextColor="#333"
            secureTextEntry 
            value={password} 
            onChangeText={setPassword} 
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0077FF',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  img: {
    width: 220,
    height: 220,
    marginBottom: 20,
    resizeMode: 'contain', 
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginBottom: 38,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#000',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFCC00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Login;
