// src/screens/MitigationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function MitigationScreen() {
  const mitigationActions = [
    {
      title: "Monitoramento Contínuo",
      points: [
        "Observe sinais de movimentação do solo: rachaduras, árvores inclinadas, postes tortos, água mais barrenta que o normal.",
        "Fique atento aos alertas da Defesa Civil e de sistemas de monitoramento.",
        "Comunique imediatamente à Defesa Civil (199) qualquer sinal de perigo."
      ]
    },
    {
      title: "Drenagem Adequada",
      points: [
        "Mantenha calhas, valetas e sistemas de drenagem limpos e desobstruídos.",
        "Evite o acúmulo de água em encostas e terrenos inclinados.",
        "Construa canaletas para direcionar a água da chuva para locais seguros e distantes das encostas."
      ]
    },
    {
      title: "Cobertura Vegetal",
      points: [
        "Plante grama e vegetação nativa em encostas para ajudar a estabilizar o solo com suas raízes.",
        "Evite desmatamento e queimadas em áreas de risco ou encostas.",
        "Não jogue lixo ou entulho em encostas, pois isso impede o crescimento da vegetação e pode obstruir a drenagem."
      ]
    },
    {
      title: "Construção Segura",
      points: [
        "Não construa em áreas de risco conhecidas ou encostas íngremes sem avaliação técnica profissional.",
        "Consulte um engenheiro para projetos de contenção de encostas, se necessário.",
        "Evite cortes e aterros que comprometam a estabilidade do terreno sem orientação técnica."
      ]
    },
    {
      title: "Em Caso de Alerta ou Risco Iminente",
      points: [
        "Evacue a área imediatamente para um local seguro e alto.",
        "Avise vizinhos e ajude pessoas com dificuldade de locomoção (idosos, crianças, pessoas com deficiência).",
        "Contate a Defesa Civil (telefone 199) e siga suas orientações.",
        "Não retorne à área de risco até que seja liberada pelas autoridades competentes."
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Ações de Mitigação de Riscos</Text>

        {mitigationActions.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{`${index + 1}. ${section.title}`}</Text>
            {section.points.map((point, pIndex) => (
              <Text key={pIndex} style={styles.sectionText}>{`\u2022 ${point}`}</Text>
            ))}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Lembre-se: a prevenção é a melhor ação.</Text>
          <Text style={styles.footerText}>Consulte sempre a Defesa Civil da sua cidade (199).</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#004d40',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#00796b'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#00796b',
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
});