import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { mask } from 'react-native-mask-text';

const FormCurso = ({ route }) => {
    const navigation = useNavigation();
    const { acao, cadastro: cadastroAntigo } = route.params;

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [inicio, setInicio] = useState('');
    const [sigla, setSigla] = useState('');


    const [showMensagemErro, setShowMensagemErro] = useState(false);

    useEffect(() => {
        const code = mask(inicio, "99/99/9999")
        setInicio(code)
    }, [inicio])



    useEffect(() => {
        if (cadastroAntigo) {
            setNome(cadastroAntigo.nome);
            setDescricao(cadastroAntigo.descricao);
            setInicio(cadastroAntigo.inicio);
            setSigla(cadastroAntigo.sigla);
        }
    }, [cadastroAntigo]);



    function salvar() {
        if (nome === '' || descricao === '' || inicio === ''|| sigla ==='') {
            setShowMensagemErro(true);
        } else {
            setShowMensagemErro(false);

            const cadastroNovo = {
                nome: nome,
                descricao: descricao,
                inicio: inicio,
                sigla: sigla,
            };

            if (cadastroAntigo) {
                acao(cadastroAntigo, cadastroNovo);
            } else {
                acao(cadastroNovo);
            }

            Toast.show({
                type: 'success',
                text1: 'Curso salvo com sucesso!',
            });

            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                {cadastroAntigo ? 'Editar Curso' : 'Adicionar Curso'}
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'Nome'}
                    mode="outlined"
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                    required
                />
                <TextInput
                    style={styles.input}
                    label={'Descrição'}
                    mode="outlined"
                    value={descricao}
                    onChangeText={(text) => setDescricao(text)}
                    required
                />
                
                <TextInput
                    style={styles.input}
                    label={'Dt Inicio'}
                    mode="outlined"
                    keyboardType='numeric'
                    value={inicio}
                    onChangeText={(text) => setInicio(text)}
                />
                
                <TextInput
                    style={styles.input}
                    label={'Sigla'}
                    mode="outlined"
                    value={sigla}
                    onChangeText={(text) => setSigla(text)}
                />

                {showMensagemErro && (
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                )}
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} mode="contained-tonal" onPress={() => navigation.goBack()}>
                        Voltar
                    </Button>
                    <Button style={styles.button} mode="contained" onPress={salvar}>
                        Salvar
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default FormCurso

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
