// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
// Para ícones, precisaríamos instalar @expo/vector-icons. Vamos deixar para um próximo passo se você quiser.
// import { Ionicons } from '@expo/vector-icons'; 

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.headerContainer}>
          {/* Você poderia adicionar um logo aqui se tivesse um */}
          {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
          <Text style={styles.mainTitle}>Bem-vindo(a) à</Text>
          <Text style={styles.appName}>Rede de Sensores Inteligentes</Text>
          <Text style={styles.subtitle}>Monitoramento e Alerta de Deslizamentos</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DataInput')}
          >
            {/* <Ionicons name="analytics-outline" size={24} color="white" style={styles.buttonIcon} /> */}
            <Text style={styles.buttonText}>Inserir Novos Dados</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('RiskView')}
          >
            {/* <Ionicons name="shield-checkmark-outline" size={24} color="white" style={styles.buttonIcon} /> */}
            <Text style={styles.buttonText}>Ver Risco Atual</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('History')}
          >
            {/* <Ionicons name="time-outline" size={24} color="white" style={styles.buttonIcon} /> */}
            <Text style={styles.buttonText}>Histórico de Monitoramento</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Mitigation')}
          >
            {/* <Ionicons name="construct-outline" size={24} color="white" style={styles.buttonIcon} /> */}
            <Text style={styles.buttonText}>Ações de Mitigação</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Sua segurança em primeiro lugar.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Um verde bem clarinho de fundo
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between', // Distribui espaço entre header, botões e footer
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30, // Espaço antes dos botões
  },
  // logo: {
  //   width: 100,
  //   height: 100,
  //   marginBottom: 20,
  // },
  mainTitle: {
    fontSize: 22,
    color: '#2E7D32', // Verde mais escuro
    textAlign: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde bem escuro, quase um tom principal
    textAlign: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#388E3C', // Verde médio
    marginTop: 10,
    paddingHorizontal: 10, // Para não ficar muito largo em telas grandes
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 400, // Largura máxima para os botões em telas maiores
  },
  button: {
    flexDirection: 'row', // Para alinhar ícone e texto (se adicionar ícones)
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o texto (e ícone)
    backgroundColor: '#00796b', // Verde azulado que usamos no header do app
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordas bem arredondadas
    marginBottom: 15,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // buttonIcon: {
  //   marginRight: 10,
  // },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20, // Espaço acima do rodapé
  },
  footerText: {
    fontSize: 14,
    color: '#616161', // Cinza escuro para o texto do rodapé
    textAlign: 'center',
  }
});