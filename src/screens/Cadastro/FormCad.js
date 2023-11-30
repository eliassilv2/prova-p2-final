import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { mask } from 'react-native-mask-text';

const FormCad = ({ route }) => {
    const navigation = useNavigation();
    const { acao, cadastro: cadastroAntigo } = route.params;

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cadastro, setCadastro] = useState('');


    const [showMensagemErro, setShowMensagemErro] = useState(false);

    useEffect(() => {
        const code = mask(telefone, "(99) 99999-9999")
        setTelefone(code)
    }, [telefone])

    useEffect(() => {
        const code = mask(cpf, "999.999.999-99")
        setCpf(code)
    }, [cpf])

    useEffect(() => {
        const code = mask(cadastro, "99.999")
        setCadastro(code)
    }, [cadastro])

    useEffect(() => {
        if (cadastroAntigo) {
            setNome(cadastroAntigo.nome);
            setTelefone(cadastroAntigo.telefone);
            setCpf(cadastroAntigo.cpf);
            setCadastro(cadastroAntigo.cadastro);
        }
    }, [cadastroAntigo]);



    function salvar() {
        if (nome === '' || telefone === '' || cpf === ''|| cadastro ==='') {
            setShowMensagemErro(true);
        } else {
            setShowMensagemErro(false);

            const cadastroNovo = {
                nome: nome,
                telefone: telefone,
                cpf: cpf,
                cadastro: cadastro,
            };

            if (cadastroAntigo) {
                acao(cadastroAntigo, cadastroNovo);
            } else {
                acao(cadastroNovo);
            }

            Toast.show({
                type: 'success',
                text1: 'Cadastro salvo com sucesso!',
            });

            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                {cadastroAntigo ? 'Editar Cadastro' : 'Adicionar Cadastro'}
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'Nome Vendedor'}
                    mode="outlined"
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                <TextInput
                    style={styles.input}
                    label={'Telefone'}
                    mode="outlined"
                    keyboardType="numeric"
                    value={telefone}
                    onChangeText={(text) => setTelefone(text)}
                />
                
                <TextInput
                    style={styles.input}
                    label={'CPF'}
                    mode="outlined"
                    keyboardType='numeric'
                    value={cpf}
                    onChangeText={(text) => setCpf(text)}
                />
                
                <TextInput
                    style={styles.input}
                    label={'N° de Cadastro'}
                    mode="outlined"
                    keyboardType='numeric'
                    value={cadastro}
                    onChangeText={(text) => setCadastro(text)}
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

export default FormCad

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
