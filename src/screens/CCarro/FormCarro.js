import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function FormCarro({ route }) {
  const navigation = useNavigation();
  const { acao, carro: carroAntigo } = route.params;

  const [modelo, setModelo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [placa, setPlaca] = useState('');
  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    if (carroAntigo) {
      setModelo(carroAntigo.modelo);
      setCategoria(carroAntigo.categoria);
      setMarca(carroAntigo.marca);
      setPlaca(carroAntigo.placa);
    }
  }, [carroAntigo]);

  function salvar() {
    if (modelo === '' || categoria === '' || marca === '' || placa === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const carroNovo = {
        modelo:modelo,
        categoria: categoria,
        marca: marca,
        placa: placa,
      };

      if (carroAntigo) {
        acao(carroAntigo, carroNovo);
      } else {
        acao(carroNovo);
      }

      Toast.show({
        type: 'success',
        text1: 'carro salvo com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {carroAntigo ? 'Editar carro' : 'Adicionar carro'}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label={'Modelo do carro'}
          mode="outlined"
          value={modelo}
          onChangeText={(text) => setModelo
            (text)}
        />
        <TextInput
          style={styles.input}
          label={'categoria'}
          mode="outlined"
          keyboardType="text"
          value={categoria}
          onChangeText={(text) => setCategoria(text)}
        />
        <TextInput
          style={styles.input}
          label={'Marca do carro'}
          mode="outlined"
          value={marca}
          onChangeText={(text) => setMarca(text)}
        />
        <TextInput
          style={styles.input}
          label={'Insira a placa'}
          mode="outlined"
          value={placa}
          onChangeText={(text) => setPlaca(text)}
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
