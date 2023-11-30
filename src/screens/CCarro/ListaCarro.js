import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaCarro() {
  const navigation = useNavigation();
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    async function carregarCarros() {
      try {
        const carrosSalvos = await AsyncStorage.getItem('carros');
        if (carrosSalvos) {
          setCarros(JSON.parse(carrosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar carros:', error);
      }
    }

    carregarCarros();
  }, []);

  async function adicionarCarro(carroNovo) {
    const novaListaCarros = [...carros, carroNovo];

    await AsyncStorage.setItem('carros', JSON.stringify(novaListaCarros));
    setCarros(novaListaCarros);
    Toast.show({
      type: 'success',
      text1: 'Carro adicionado com sucesso!',
    });
  }

  async function excluircarro(carro) {
    const novaListaCarros = carros.filter((carroItem) => carroItem !== carro);

    await AsyncStorage.setItem('carros', JSON.stringify(novaListaCarros));
    setCarros(novaListaCarros);
    Toast.show({
      type: 'success',
      text1: 'carro excluído com sucesso!',
    });
  }

  async function editarCarro(carroAntigo, carroNovo) {
    const novaListaCarros = carros.map((carro) =>
      carro === carroAntigo ? { ...carro, ...carroNovo } : carro
    );

    await AsyncStorage.setItem('carros', JSON.stringify(novaListaCarros));
    setCarros(novaListaCarros);
    Toast.show({
      type: 'success',
      text1: 'Carro editado com sucesso!',
    });
    navigation.goBack();
  }

  return (
    
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de carros
      </Text>
      <FlatList
        style={styles.list}
        data={carros}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Modelo do carro: {item?.nome}</Text>
                <Text variant="bodyLarge">Categoria: {item?.categoria}</Text>
                <Text variant="bodyLarge">Marca: {item?.marca}</Text>
                <Text variant="bodyLarge">Placa: {item?.placa}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button 
                onPress={() =>
                  navigation.push('FormCarro', {
                    acao: (carroAntigo, carroNovo) => editarCarro(item, carroAntigo, carroNovo),
                  })
                  
                }>
                Editar
              </Button>
              <Button  onPress={() => excluircarro(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormCarro', { acao: adicionarCarro })}
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
    backgroundColor: 'orange',
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
