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

    constructor(props) {
      super(props);

      this.state = {
        foto: this.props.foto,
      }
    }


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


    like = () => {

      let novaLista = [];
      if(!this.state.foto.likeada) {
        novaLista = [
          ... this.state.foto.likers,
          {login: 'meuUsuario'}
        ]
      } else {
        novaLista = this.state.foto.likers.filter(liker => liker.login !== 'meuUsuario')
      }

      const fotoAtualizada = {
        ... this.state.foto,
        likeada: !this.state.foto.likeada,
        likers: novaLista
      }

      this.setState({foto: fotoAtualizada})
    }

    adicionaComentario = (valorComentario) => {
      if(valorComentario === '')
        return;

      const novaLista = [
        ... this.state.foto.comentarios, {
          id: Math.random(),
          login: 'meuUsuario',
          texto: valorComentario
        }
      ]

      const fotoAtualizada = {
        ...this.state.foto,
        comentarios: novaLista
      };

      this.setState({foto: fotoAtualizada, valorComentario: ''});
      
    }

    likers = () => {
      console.warn('likers');
    }

    render() {

      const { foto } = this.state;

      return (
          <View>

              <View style={styles.header}>
                <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil}/>
                <Text>{foto.loginUsuario}</Text>
              </View>
              
              <Image source={{uri: foto.urlFoto}} style={styles.foto}/>

              <View style={styles.rodape}>
                <Likes foto={foto} likeCallback={this.like}/>


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
                <InputComentario comentarioCallback={this.adicionaComentario}/>
                

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
