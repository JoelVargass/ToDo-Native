import { useEffect } from 'react';
import { initDB } from './db/db';
import AppNavigator from './navigation/AppNavigator';

export default function App() {

  // inicializar la base de datos
  useEffect(() => {
    initDB();
  }, []);

  return <AppNavigator />;
}
