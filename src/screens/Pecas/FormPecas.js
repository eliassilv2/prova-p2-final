import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { mask } from 'react-native-mask-text';

export default function FormPecas({ route }) {
  const navigation = useNavigation();
  const { acao, pecas: pecaAntigo } = route.params;

  const [pecas, setPecas] = useState('');
  const [marcas, setMarcas] = useState('');
  const [serie, setSerie] = useState('');

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    const code = mask(serie, "999.999")
    setSerie(code)
}, [serie])

  useEffect(() => {
    if (pecaAntigo) {
      setPecas(pecaAntigo.peca);
      setMarcas(pecaAntigo.marcas);
      setSerie(pecaAntigo.serie);
      
    }
  }, [pecaAntigo]);

  function salvar() {
    if (pecas === '' || marcas === '' || serie === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const pecasNovo = {
        pecas: pecas,
        marcas: marcas,
        serie: serie,
       
      };

      if (pecaAntigo) {
        acao(pecaAntigo, pecasNovo);
      } else {
        acao(pecasNovo);
      }

      Toast.show({
        type: 'success',
        text1: 'Salvo com sucesso!',
      });

      navigation.goBack();
    }
  }
// peças de troca
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {pecaAntigo ? 'Editar Peças' : 'Adicionar Peças'}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label={'Peça'}
          mode="outlined"
          value={pecas}
          onChangeText={(text) => setPecas(text)}
        />
          <TextInput
            style={styles.input}
            label={'Marca '}
            mode="outlined"
            value={marcas}
            onChangeText={(text) => setMarcas(text)}
          />
        <TextInput
          style={styles.input}
          label={'Número de Série'}
          mode="outlined"
          keyboardType="numeric"
          value={serie}
          onChangeText={(text) => setSerie(text)}
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
