// app/_layout.tsx
import React from 'react';
// Remova a importação do NavigationContainer se não for mais usado aqui
// import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import WelcomeScreen from '../src/screens/WelcomeScreen';
import DataInputScreen from '../src/screens/DataInputScreen';
import RiskViewScreen from '../src/screens/RiskViewScreen';
import HistoryScreen from '../src/screens/HistoryScreen';
import MitigationScreen from '../src/screens/MitigationScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator(); // Mantemos este

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Fontes aqui
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  // Modificação Principal: Remova o <NavigationContainer> daqui
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00796b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: 'Bem-vindo(a)!' }}
      />
      <Stack.Screen
        name="DataInput"
        component={DataInputScreen}
        options={{ title: 'Inserir Dados Ambientais' }}
      />
      <Stack.Screen
        name="RiskView"
        component={RiskViewScreen}
        options={{ title: 'Visualização de Riscos' }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'Histórico de Monitoramento' }}
      />
      <Stack.Screen
        name="Mitigation"
        component={MitigationScreen}
        options={{ title: 'Ações de Mitigação' }}
      />
    </Stack.Navigator>
  );
}