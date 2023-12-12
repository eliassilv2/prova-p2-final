import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaCurso() {
  const navigation = useNavigation();
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    async function carregarCadastros() {
      try {
        const cadastrosSalvos = await AsyncStorage.getItem('cadastros');
        if (cadastrosSalvos) {
          setCadastros(JSON.parse(cadastrosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      }
    }

    carregarCadastros();
  }, []);

  async function adicionarCadastro(cadastroNovo) {
    const novaListaCadastros = [...cadastros, cadastroNovo];

    await AsyncStorage.setItem('cadastros', JSON.stringify(novaListaCadastros));
    setCadastros(novaListaCadastros);
    Toast.show({
      type: 'success',
      text1: 'Curso adicionado com sucesso!',
    });
  }

  async function excluirProblema(cadastro) {
    const novaListaCadastros = cadastros.filter((problemaItem) => problemaItem !== cadastro);

    await AsyncStorage.setItem('cadastros', JSON.stringify(novaListaCadastros));
    setCadastros(novaListaCadastros);
    Toast.show({
      type: 'success',
      text1: 'Curso excluído com sucesso!',
    });
  }

  async function editarProblema(cadastroAntigo, cadastroNovo) {
    const novaListaCadastros = cadastros.map((cadastro) =>
      cadastro === cadastroAntigo ? { ...cadastro, ...cadastroNovo } : cadastro
    );

    await AsyncStorage.setItem('cadastros', JSON.stringify(novaListaCadastros));
    setCadastros(novaListaCadastros);
    Toast.show({
      type: 'success',
      text1: 'Curso editado com sucesso!',
    });
    navigation.goBack();
  }

  return (



    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Cursos
      </Text>
      <FlatList
        style={styles.list}
        data={cadastros}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome: {item?.nome}</Text>
                <Text variant="bodyLarge">Descrição: {item?.descricao}</Text>
                <Text variant="bodyLarge">Dt Inicio: {item?.inicio}</Text>
                <Text variant="bodyLarge">Sigla: {item?.sigla}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormCurso', {
                    acao: (cadastroAntigo, cadastroNovo) => editarProblema(item, cadastroAntigo, cadastroNovo),
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
        onPress={() => navigation.push('FormCurso', { acao: adicionarCadastro })}
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
    color: 'black',
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
    color: '#3742fa', // Cor para título do cadastro
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



