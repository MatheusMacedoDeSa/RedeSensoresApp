// src/screens/HistoryScreen.js
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    Alert, 
    SafeAreaView, 
    ActivityIndicator,
    TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons'; // Para ícones, se desejar no futuro

const STORAGE_KEY = '@sensor_data_history';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const dataString = await AsyncStorage.getItem(STORAGE_KEY);
      if (dataString) {
        const dataArray = JSON.parse(dataString);
        setHistory(dataArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      Alert.alert('Erro de Leitura', 'Não foi possível carregar o histórico.');
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  const confirmClearHistory = () => {
    if (history.length === 0) {
        Alert.alert("Histórico Vazio", "Não há dados no histórico para limpar.");
        return;
    }
    Alert.alert(
      "Confirmar Limpeza",
      "Tem certeza que deseja apagar TODO o histórico de monitoramento? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar Tudo",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEY);
              setHistory([]);
              Alert.alert('Sucesso!', 'Histórico apagado com sucesso.');
            } catch (error) {
              console.error("Erro ao limpar o histórico:", error);
              Alert.alert('Erro ao Apagar', 'Não foi possível apagar o histórico.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        {/* <Ionicons name="calendar-outline" size={18} color="#00796b" /> */}
        <Text style={styles.itemDate}>
          {new Date(item.timestamp).toLocaleDateString('pt-BR', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </Text>
      </View>
      <View style={styles.itemRow}>
        {/* <Ionicons name="water-outline" size={18} color="#555" style={styles.itemIcon} /> */}
        <Text style={styles.itemLabel}>Umidade do Solo: </Text>
        <Text style={styles.itemValue}>{item.soilMoisture}%</Text>
      </View>
      <View style={styles.itemRow}>
        {/* <Ionicons name="analytics-outline" size={18} color="#555" style={styles.itemIcon} /> */}
        <Text style={styles.itemLabel}>Inclinação do Terreno: </Text>
        <Text style={styles.itemValue}>{item.slope}°</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator size="large" color="#00796b" />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {history.length === 0 ? (
        <View style={styles.centered}>
          {/* <Ionicons name="archive-outline" size={60} color="#BDBDBD" /> */}
          <Text style={styles.noDataText}>Nenhum dado de monitoramento registrado.</Text>
          <Text style={styles.noDataSubtitle}>Comece inserindo novos dados ambientais.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
          ListHeaderComponent={ // Adiciona um título à lista
            <Text style={styles.listHeaderTitle}>Registros Salvos</Text>
          }
          ListFooterComponent={ // Adiciona o botão no final da lista
            <TouchableOpacity style={styles.clearButton} onPress={confirmClearHistory}>
              {/* <Ionicons name="trash-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} /> */}
              <Text style={styles.clearButtonText}>Limpar Histórico</Text>
            </TouchableOpacity>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Consistência com as outras telas
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#00796b',
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  listHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#00796b',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 8,
  },
  itemDate: {
    fontSize: 14,
    color: '#004D40', // Verde escuro para a data
    fontWeight: '600',
    marginLeft: 5, // Se for usar ícone
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemIcon: {
    marginRight: 8,
  },
  itemLabel: {
    fontSize: 16,
    color: '#424242', // Cinza escuro para o label
    fontWeight: '500',
  },
  itemValue: {
    fontSize: 16,
    color: '#2E7D32', // Verde para o valor
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  },
  noDataSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d32f2f', // Um vermelho para ação destrutiva
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25, // Consistente com outros botões
    marginHorizontal: 20, // Margens laterais
    marginTop: 25,      // Espaço acima do botão
    marginBottom: 15,   // Espaço abaixo do botão
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginLeft: 8, // Se for usar ícone
  },
  // buttonIcon: { // Estilo para o ícone do botão de limpar (se adicionar)
  //   marginRight: 8,
  // }
});