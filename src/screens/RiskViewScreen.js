// src/screens/RiskViewScreen.js
import React, { useState }
from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons'; // Para ícones, se desejar

const STORAGE_KEY = '@sensor_data_history';

// Função para calcular o risco (simplificada) - Mantida igual
const calculateRisk = (soilMoisture, slope) => {
  if (isNaN(soilMoisture) || isNaN(slope) || soilMoisture === null || slope === null) {
    return { 
        level: 'INCOMPLETO', 
        color: '#9E9E9E', // Cinza para dados incompletos/inválidos
        bgColor: '#F5F5F5', 
        description: 'Os dados da última medição estão incompletos ou são inválidos.' 
    };
  }
  if (soilMoisture > 70 && slope > 30) {
    return { 
        level: 'ALTO RISCO', 
        color: '#FFFFFF', 
        bgColor: '#D32F2F', // Vermelho forte
        description: 'Condições CRÍTICAS! Risco elevado de deslizamento devido à alta umidade do solo e inclinação acentuada.' 
    };
  } else if (soilMoisture > 50 && slope > 15) {
    return { 
        level: 'RISCO MÉDIO', 
        color: '#212121', // Texto escuro para contraste com amarelo
        bgColor: '#FFC107', // Amarelo/Laranja para médio
        description: 'Atenção! Risco moderado detectado. Monitore as condições e prepare-se para possíveis alertas.' 
    };
  }
  return { 
    level: 'RISCO BAIXO', 
    color: '#FFFFFF', 
    bgColor: '#388E3C', // Verde para baixo risco
    description: 'Condições favoráveis. Risco de deslizamento considerado baixo no momento.' 
  };
};

export default function RiskViewScreen({ navigation }) {
  const [latestData, setLatestData] = useState(null);
  const [riskInfo, setRiskInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadLatestDataAndCalculateRisk = async () => {
    setIsLoading(true);
    try {
      const dataString = await AsyncStorage.getItem(STORAGE_KEY);
      if (dataString) {
        const dataArray = JSON.parse(dataString);
        if (dataArray.length > 0) {
          const lastRecord = dataArray[dataArray.length - 1];
          setLatestData(lastRecord);
          setRiskInfo(calculateRisk(lastRecord.soilMoisture, lastRecord.slope));
        } else {
          setLatestData(null);
          setRiskInfo({ 
            level: 'SEM DADOS', 
            color: '#424242', 
            bgColor: '#E0E0E0', 
            description: 'Nenhum dado de monitoramento encontrado. Insira novos dados para avaliação.' 
          });
        }
      } else {
        setLatestData(null);
        setRiskInfo({ 
            level: 'SEM DADOS', 
            color: '#424242', 
            bgColor: '#E0E0E0', 
            description: 'Nenhum dado de monitoramento encontrado. Insira novos dados para avaliação.' 
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados para risco:", error);
      setRiskInfo({ 
        level: 'ERRO', 
        color: '#FFFFFF', 
        bgColor: '#616161', 
        description: 'Não foi possível carregar os dados para avaliação. Verifique sua conexão ou tente mais tarde.' 
    });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadLatestDataAndCalculateRisk();
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator size="large" color="#00796b" />
        <Text style={styles.loadingText}>Analisando Riscos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.pageTitle}>Visualização de Riscos</Text>

        {riskInfo && (
          <View style={[styles.riskCard, { backgroundColor: riskInfo.bgColor }]}>
            {/* <Ionicons 
              name={
                riskInfo.level === 'ALTO RISCO' ? "alert-circle" :
                riskInfo.level === 'RISCO MÉDIO' ? "warning" :
                riskInfo.level === 'RISCO BAIXO' ? "shield-checkmark" :
                "help-circle-outline" // Ícone padrão
              } 
              size={30} 
              color={riskInfo.color} 
              style={styles.riskIcon} 
            /> */}
            <Text style={[styles.riskLevel, { color: riskInfo.color }]}>{riskInfo.level}</Text>
            <Text style={[styles.riskDescription, { color: riskInfo.color === '#FFFFFF' ? '#f5f5f5' : '#424242' }]}>
              {riskInfo.description}
            </Text>
          </View>
        )}

        {latestData && (
          <View style={styles.dataCard}>
            <Text style={styles.dataCardTitle}>Dados da Última Medição:</Text>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Data/Hora:</Text>
              <Text style={styles.dataValue}>{new Date(latestData.timestamp).toLocaleString('pt-BR')}</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Umidade do Solo:</Text>
              <Text style={styles.dataValue}>{latestData.soilMoisture}%</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Inclinação:</Text>
              <Text style={styles.dataValue}>{latestData.slope}°</Text>
            </View>
          </View>
        )}

        {!latestData && !isLoading && riskInfo && riskInfo.level === 'SEM DADOS' && (
             <View style={styles.noDataContainer}>
                {/* <Ionicons name="document-text-outline" size={50} color="#BDBDBD" /> */}
                <Text style={styles.noDataText}>Nenhum registro encontrado.</Text>
                <Text style={styles.noDataSubtitle}>Insira dados para iniciar a avaliação de riscos.</Text>
             </View>
        )}
        
        <TouchableOpacity style={styles.button} onPress={loadLatestDataAndCalculateRisk}>
          {/* <Ionicons name="refresh-circle-outline" size={22} color="white" style={styles.buttonIcon} /> */}
          <Text style={styles.buttonText}>Atualizar Análise de Risco</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00796b',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 25,
  },
  riskCard: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: 'center', // Centraliza o texto e ícone
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  riskIcon: {
    marginBottom: 10,
  },
  riskLevel: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  riskDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 23,
  },
  dataCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  dataCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004D40',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  dataLabel: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 25,
  },
  noDataText: {
    fontSize: 17,
    color: '#555',
    fontWeight: '500',
    textAlign: 'center',
    // marginTop: 10,
  },
  noDataSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00796b',
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 10,
  },
  buttonIcon: { // Se for adicionar ícones ao botão
     marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});