/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';

import InputComentario from '../InputComentario';
import Likes from '../Likes';

const screen = Dimensions.get('screen');

export default class Post extends Component {

    exibeLegenda(foto) {
      if(foto.comentario === ''){
        return;
      }
      return ( 
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
      );
    }

    render() {

      const { likeCallback, foto, comentarioCallback } = this.props;

      return (
          <View>

              <View style={styles.header}>
                <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil}/>
                <Text>{foto.loginUsuario}</Text>
              </View>
              
              <Image source={{uri: foto.urlFoto}} style={styles.foto}/>

              <View style={styles.rodape}>
                <Likes foto={foto} likeCallback={likeCallback}/>


                {this.exibeLegenda(foto)}

                {
                  foto.comentarios.map(comentario => {
                    return (
                      <View style={styles.comentario} key={comentario.id}>
                        <Text style={styles.tituloComentario}>{comentario.login}</Text>
                        <Text>{comentario.texto}</Text>
                      </View>
                    );
                  })
                }
                <InputComentario idFoto={foto.id} comentarioCallback={comentarioCallback}/>
                

              </View>
          </View>
      )
    }  
}


const styles = StyleSheet.create({

  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10,
    width: 40,
    height:40,
    borderRadius: 50
  },
  foto: {
    width: screen.width,
    height:screen.width
  },
  rodape: {
    margin: 10
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },

});

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
