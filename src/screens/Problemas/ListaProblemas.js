import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaProblemas() {
  const navigation = useNavigation();
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    async function carregarProblemas() {
      try {
        const problemasSalvos = await AsyncStorage.getItem('problemas');
        if (problemasSalvos) {
          setProblemas(JSON.parse(problemasSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar problemas:', error);
      }
    }

    carregarProblemas();
  }, []);

  async function adicionarProblema(problemaNovo) {
    const novaListaProblemas = [...problemas, problemaNovo];

    await AsyncStorage.setItem('problemas', JSON.stringify(novaListaProblemas));
    setProblemas(novaListaProblemas);
    Toast.show({
      type: 'success',
      text1: 'Problema adicionado com sucesso!',
    });
  }

  async function excluirProblema(problema) {
    const novaListaProblemas = problemas.filter((problemaItem) => problemaItem !== problema);

    await AsyncStorage.setItem('problemas', JSON.stringify(novaListaProblemas));
    setProblemas(novaListaProblemas);
    Toast.show({
      type: 'success',
      text1: 'Problema excluído com sucesso!',
    });
  }

  async function editarProblema(problemaAntigo, problemaNovo) {
    const novaListaProblemas = problemas.map((problema) =>
      problema === problemaAntigo ? { ...problema, ...problemaNovo } : problema
    );

    await AsyncStorage.setItem('problemas', JSON.stringify(novaListaProblemas));
    setProblemas(novaListaProblemas);
    Toast.show({
      type: 'success',
      text1: 'Problema editado com sucesso!',
    });
    navigation.goBack();
  }

  return (


  
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Problemas
        </Text>
        <FlatList
          style={styles.list}
          data={problemas}
          renderItem={({ item }) => (
            <Card mode="outlined" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleMedium} variant="titleMedium">Seu nome: {item?.nome}</Text>
                  <Text variant="bodyLarge">Intensidade do Problema: {item?.intensidade}</Text>
                  <Text variant="bodyLarge">Peça com Defeito: {item?.defeito}</Text>
                  <Text variant="bodyLarge">Marca carro: {item?.marca}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() =>
                    navigation.push('FormProblemas', {
                      acao: (problemaAntigo, problemaNovo) => editarProblema(item, problemaAntigo, problemaNovo),
                    })
                  }>
                  Editar
                </Button>
                <Button onPress={() => excluirProblema
              (item)}>Excluir</Button>
              </Card.Actions>
            </Card>
          )}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.push('FormProblemas', { acao: adicionarProblema })}
        />
      </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  title: {
    color:'black',
    fontWeight: 'bold',
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    backgroundColor: 'black',
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },


  card: {
    marginTop: 15,
    backgroundColor: 'white', // Cor de fundo do cartão
    borderColor: 'black', // Cor da borda do cartão
    borderWidth: 1,
    borderRadius: 8, // Borda arredondada
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
    padding: 15,
  },
  // Estilos do texto dentro do cartão
  bodyLarge: {
    fontSize: 16,
    marginBottom: 3,
    color: '#555', // Cor do texto
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3742fa', // Cor para título do problema
  },
  bodyLarge: {
    fontSize: 16,
    marginBottom: 3,
    color: '#333', // Cor para outros detalhes
    fontWeight: 'bold', // Tornando outros detalhes em negrito
  },
  // Dentro do seu StyleSheet.create, ajuste os estilos do ImageBackground
  background: {
    flex: 1,
    width: '100%', // Ocupa toda a largura disponível
    height: '100%', // Ocupa toda a altura disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },

});



