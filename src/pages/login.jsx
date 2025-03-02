import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (email === 'usuario@ejemplo.com' && password === 'password123') {
      await SecureStore.setItemAsync('userToken', 'loggedIn');
      Alert.alert('Éxito', 'Inicio de sesión correcto');
      navigation.navigate('Home');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

export default Login;
