import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function FormProblemas({ route }) {
  const navigation = useNavigation();
  const { acao, problema: problemaAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [defeito, setDefeito] = useState('');
  const [marca, setMarca] = useState('');
  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    if (problemaAntigo) {
      setNome(problemaAntigo.nome);
      setIntensidade(problemaAntigo.intensidade);
      setDefeito(problemaAntigo.defeito);
      setMarca(problemaAntigo.marca);
    }
  }, [problemaAntigo]);

  function salvar() {
    if (nome === '' || intensidade === '' || defeito === '' || marca === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const problemaNovo = {
        nome: nome,
        intensidade: intensidade,
        defeito: defeito,
        marca: marca,
      };

      if (problemaAntigo) {
        acao(problemaAntigo, problemaNovo);
      } else {
        acao(problemaNovo);
      }

      Toast.show({
        type: 'success',
        text1: 'Salvo com sucesso!',
      });

      navigation.goBack();
    }
  }
// problemas carro 
  return (

   
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          {problemaAntigo ? 'Editar problema' : 'Adicionar problema'}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label={'Seu nome:'}
            mode="outlined"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            style={styles.input}
            label={'Intensidade do problema:'}
            mode="outlined"
            keyboardType="text"
            value={intensidade}
            onChangeText={(text) => setIntensidade(text)}
          />
          <TextInput
            style={styles.input}
            label={'Peça com Defeito: '}
            mode="outlined"
            value={defeito}
            onChangeText={(text) => setDefeito(text)}
          />
          <TextInput
            style={styles.input}
            label={'Marca Carro: '}
            mode="outlined"
            value={marca}
            onChangeText={(text) => setMarca(text)}
          />
          {showMensagemErro && (
            <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="contained-tonal" onPress={() => navigation.goBack()}>
            Voltar
          </Button>
          <Button style={styles.button} mode="contained" onPress={salvar}>
            Salvar
          </Button>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    width: '90%',
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },


});
