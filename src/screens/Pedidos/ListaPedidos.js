import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Listapedido({route}) {
  const navigation = useNavigation();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const pedidosSalvos = await AsyncStorage.getItem('pedidos');
        if (pedidosSalvos) {
          setPedidos(JSON.parse(pedidosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar Pedido:', error);
      }
    }

    carregarPedidos();
  }, []);

  async function adicionarPedido(pedidoNovo) {
    const novaListaPedidos = [...pedidos, pedidoNovo];

    await AsyncStorage.setItem('pedidos', JSON.stringify(novaListaPedidos));
    setPedidos(novaListaPedidos);
    Toast.show({
      type: 'success',
      text1: 'pedido adicionado com sucesso!',
    });
  }

  async function excluirPedidos(pedido) {
    const novaListaPedidos = pedidos.filter((pedidoItem) => pedidoItem !== pedido);

    await AsyncStorage.setItem('pedidos', JSON.stringify(novaListaPedidos));
    setPedidos(novaListaPedidos);
    Toast.show({
      type: 'success',
      text1: 'Pedido excluído com sucesso!',
    });
  }

  async function editarPedidos(pedidoAntigo, pedidoNovo) {
    const novaListaPedidos = pedidos.map((pedido) =>
      pedido === pedidoAntigo ? { ...pedido, ...pedidoNovo } : pedido
    );

    await AsyncStorage.setItem('pedidos', JSON.stringify(novaListaPedidos));
    setPedidos(novaListaPedidos);
    Toast.show({
      type: 'success',
      text1: 'Pedido editado com sucesso!',
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de pedidos
      </Text>
      <FlatList
        style={styles.list}
        data={pedidos}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome: {item?.nome}</Text>
                <Text variant="bodyLarge">Serviços a se fazer: {item?.servico}</Text>
       
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormPedidos', {
                    acao: (pedidoAntigo, pedidoNovo) => editarPedidos(item, pedidoAntigo, pedidoNovo),
                  })
                }>
                Editar
              </Button>
              <Button onPress={() => excluirPedidos(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormPedidos', { acao: adicionarPedido})}
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
