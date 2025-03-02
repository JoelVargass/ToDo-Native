import { View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    navigation.replace('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Bienvenido a ToDo</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
