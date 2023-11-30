import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaPecas() {
  const navigation = useNavigation();
  const [pecas, setPecas] = useState([]);

  useEffect(() => {
    async function carregarPecas() {
      try {
        const pecasSalvos = await AsyncStorage.getItem('pecas');
        if (pecasSalvos) {
          setPecas(JSON.parse(pecasSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar pecas:', error);
      }
    }

    carregarPecas();
  }, []);

  async function adicionarPecas(pecaNovo) {
    const novaListaPecas = [...pecas, pecaNovo];

    await AsyncStorage.setItem('pecas', JSON.stringify(novaListaPecas));
    setPecas(novaListaPecas);
    Toast.show({
      type: 'success',
      text1: 'Peça adicionada com sucesso!',
    });
  }

  async function excluirPecas(peca) {
    const novaListaPecas = pecas.filter((pecaItem) => pecaItem !== peca);

    await AsyncStorage.setItem('pecas', JSON.stringify(novaListaPecas));
    setPecas(novaListaPecas);
    Toast.show({
      type: 'success',
      text1: 'Peça excluída com sucesso!',
    });
  }

  async function editarPecas(pecaAntigo, pecaNovo) {
    const novaListaPecas = pecas.map((peca) =>
      peca === pecaAntigo ? { ...peca, ...pecaNovo } : peca
    );

    await AsyncStorage.setItem('pecas', JSON.stringify(novaListaPecas));
    setPecas(novaListaPecas);
    Toast.show({
      type: 'success',
      text1: 'Peça editada!',
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Peças
      </Text>
      <FlatList
        style={styles.list}
        data={pecas}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Peça: {item?.pecas}</Text>
                <Text variant="bodyLarge">Marca: {item?.marcas}</Text>
                <Text variant="bodyLarge">N° de Série: {item?.serie}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormPecas', {
                    acao: (pecaAntigo, pecaNovo) => editarPecas(item, pecaAntigo, pecaNovo),
                  })
                }>
                Editar
              </Button>
              <Button onPress={() => excluirPecas(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormPecas', { acao: adicionarPecas})}
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
    fontWeight: 'bold',
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    backgroundColor: 'red',
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
});
