// src/screens/DataInputScreen.js
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Alert, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@sensor_data_history';

export default function DataInputScreen({ navigation }) {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [slope, setSlope] = useState('');

  const saveData = async () => {
    if (!soilMoisture.trim() || !slope.trim()) {
      Alert.alert('Campos Vazios', 'Por favor, preencha todos os campos para salvar.');
      return;
    }

    const moistureValue = parseFloat(soilMoisture.replace(',', '.')); // Substitui vírgula por ponto
    const slopeValue = parseFloat(slope.replace(',', '.'));       // Substitui vírgula por ponto

    if (isNaN(moistureValue) || isNaN(slopeValue)) {
        Alert.alert('Valores Inválidos', 'Por favor, insira apenas números válidos para umidade e inclinação.');
        return;
    }
    if (moistureValue < 0 || moistureValue > 100) {
        Alert.alert('Umidade Inválida', 'A umidade do solo deve ser um valor entre 0 e 100%.');
        return;
    }
    if (slopeValue < 0 || slopeValue > 90) {
        Alert.alert('Inclinação Inválida', 'A inclinação deve ser um valor entre 0 e 90 graus.');
        return;
    }

    const newRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      soilMoisture: moistureValue,
      slope: slopeValue,
    };

    try {
      const existingDataString = await AsyncStorage.getItem(STORAGE_KEY);
      const existingData = existingDataString ? JSON.parse(existingDataString) : [];
      const updatedData = [...existingData, newRecord];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      Alert.alert('Sucesso!', 'Dados ambientais salvos com sucesso.');
      setSoilMoisture('');
      setSlope('');
      // Opcional: navegar de volta ou para outra tela após salvar
      // navigation.goBack(); 
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      Alert.alert('Erro no Salvamento', 'Não foi possível salvar os dados. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.headerTitle}>Registrar Novas Medições</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Umidade do Solo (%)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ex: 60"
                placeholderTextColor="#aaa"
                value={soilMoisture}
                onChangeText={setSoilMoisture}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Inclinação do Terreno (graus)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ex: 30"
                placeholderTextColor="#aaa"
                value={slope}
                onChangeText={setSlope}
              />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={saveData}>
              <Text style={styles.buttonText}>Salvar Dados</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Mesmo fundo da WelcomeScreen para consistência
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro (do appName da WelcomeScreen)
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#388E3C', // Verde médio
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5', // Um cinza bem claro para o fundo do input
    height: 50,
    borderColor: '#BDBDBD', // Borda cinza claro
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333', // Cor do texto digitado
  },
  button: {
    backgroundColor: '#00796b', // Mesmo verde dos botões da WelcomeScreen
    paddingVertical: 15,
    borderRadius: 25, // Mesma borda arredondada
    alignItems: 'center',
    marginTop: 10, // Espaço acima do botão
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});