import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function FormPedidos({ navigation, route }) {

    const { acao, pedido: pedidoAntigo } = route.params

    const [nome, setNome] = useState('');
    const [servico, setServicos] = useState('');
   

    const [showMensagemErro, setShowMensagemErro] = useState(false);

    useEffect(() => {
        if (pedidoAntigo) {
            setNome(pedidoAntigo.nome)
            setServicos(pedidoAntigo.servico)
           
        }
    }, [])

    function salvar() {

        if (nome === '' || servico === '' ) {
            setShowMensagemErro(true)
        } else {
            setShowMensagemErro(false)

            const pedidoNovo = {
                nome: nome,
                servico: servico,
                
            }

            if (pedidoAntigo) {
                acao(pedidoAntigo, pedidoNovo)
            } else {
                acao(pedidoNovo)
            }

            Toast.show({
                type: 'success',
                text1: 'Pedido salvo com sucesso!'
            })

            navigation.goBack()
        }

    }
    useEffect(() => {
        if (pedidoAntigo) {
            setNome(pedidoAntigo.nome);
            setServicos(pedidoAntigo.servico);
           
        }
    }, [pedidoAntigo]);

    function salvar() {
        if (nome === '' || servico === '' ) {
            setShowMensagemErro(true);
        } else {
            setShowMensagemErro(false);

            const pedidoNovo = {
                nome: nome,
                servico: servico,
              
            };

            if (pedidoAntigo) {
                acao(pedidoAntigo, pedidoNovo);
            } else {
                acao(pedidoNovo);
            }

            Toast.show({
                type: 'success',
                text1: 'pedido salvo com sucesso!',
            });

            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <Text variant='titleLarge' style={styles.title}>
                {pedidoAntigo ? 'Editar pedido' : 'Adicionar pedido'}
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'Nome do mecanico'}
                    mode='outlined'
                    value={nome}
                    onChangeText={text => setNome(text)}
                />
                <TextInput
                    style={styles.input}
                    label={'Serviço a ser prestado'}
                    mode='outlined'

                    value={servicos}
                    onChangeText={text => setServicos(text)}
                />
              
        
                {showMensagemErro && (
                    <Text style={{ color: 'red', textAlign: 'center' }}>
                        Preencha todos os campos!
                    </Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    mode='contained-tonal'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>
                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={salvar}
                >
                    Salvar
                </Button>
            </View>
        </View>
    )
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
})