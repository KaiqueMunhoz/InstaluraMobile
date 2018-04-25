import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Button,
    Dimensions
} from 'react-native';

export default class Login extends Component {

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
                        underlineColorAndroid="transparent"/>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Senha...'
                        underlineColorAndroid="transparent"/>
                </View>

                <Button title='Login' onPress={() => console.warn('button')} />
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