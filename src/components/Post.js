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

const screen = Dimensions.get('screen');

export default class Post extends Component {

    constructor(props) {
      super(props);

      this.state = {
        foto: this.props.foto,
        valorComentario: ''
      }
    }

    carregaIcone(likeada) {
      if(likeada){
        return require('../../resources/img/s2-checked.png')
      }
      return require('../../resources/img/s2.png')
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

    exibeLikes(likers) {
      if(likers.length <= 0){
        return
      }
      return <Text style={styles.curtidas}>{likers.length} curtidas</Text>
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

    adicionaComentario = () => {
      if(this.state.valorComentario === '')
        return;

      const novaLista = [
        ... this.state.foto.comentarios, {
          id: Math.random(),
          login: 'meuUsario',
          texto: this.state.valorComentario
        }
      ]

      const fotoAtualizada = {
        ...this.state.foto,
        comentarios: novaLista
      };

      this.setState({foto: fotoAtualizada, valorComentario: ''});
      this.inputComentario.clear();
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
                <TouchableOpacity onPress={this.like}>
                  <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
                </TouchableOpacity>
                {this.exibeLikes(foto.likers)}
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
                <View style={styles.novoComentario}>
                  <TextInput
                    style={styles.input}
                    placeholder="Adicione um comentario"
                    underlineColorAndroid="transparent"
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({valorComentario: texto}) }/>

                  <TouchableOpacity onPress={this.adicionaComentario}>
                    <Image style={styles.botaoComentario} source={require('../../resources/img/send.png')} />
                  </TouchableOpacity>
                </View>
                

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
  botaoDeLike: {
    height: 40,
    width: 40,
    marginRight: 10
  },
  curtidas: {
    fontWeight: 'bold'
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  input: {
    flex: 1,
    height: 40
  },
  botaoComentario: {
    height: 30,
    width: 30
  }
});

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
