import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Button,
    Dimensions,
    AsyncStorage
} from 'react-native';


export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            usuario: '',
            senha: ''
        }
    }

    efetuaLogin = () => {
        const {usuario, senha} = this.state;

        const uri = 'http://instalura-api.herokuapp.com/api/login';
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: usuario,
                senha: senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch(uri, requestInfo)
        .then(response => {
            // if(!response.ok){
            //     throw new Error('Mensagenzinha bonitinha')
            // }
            return response.text();
        })
        .then(token => {
            console.warn(token)
            // const usuario = {
            //     nome: this.state.usuario,
            //     token
            // }
            // AsyncStorage.setItem('usuario', JSON.stringify(usuario));
        })
        .catch(error => {
            // console.warn(error)
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Instalura
                </Text>

                <View style={styles.form}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Usuario...'
                        autoCapitalize='none'
                        underlineColorAndroid="transparent"
                        onChangeText={texto => this.setState({usuario: texto})}/>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Senha...'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        onChangeText={texto => this.setState({usuario: texto})}/>
                </View>

                <Button title='Login' onPress={this.efetuaLogin} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: 26
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: Dimensions.get('screen').width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10
    }
})