import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList
} from 'react-native';

import Post from './components/Post'

class InstaluraMobile extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount(){
    fetch('http://instalura-api.herokuapp.com/api/public/fotos/rafael')
    .then(response => response.json())
    .then(json => this.setState({fotos: json}))
  }

  like = (idFoto) => {

    const foto = this.state.fotos.find(foto => foto.id === idFoto);

    let novaLista = [];
    if(!foto.likeada) {
      novaLista = [
        ... foto.likers,
        {login: 'meuUsuario'}
      ]
    } else {
      novaLista = foto.likers.filter(liker => liker.login !== 'meuUsuario')
    }

    const fotoAtualizada = {
      ... foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    const fotos = this.state.fotos.map(foto => fotoAtualizada.id === foto.id ? fotoAtualizada : foto)

    this.setState({fotos})
  }

  adicionaComentario = (idFoto, valorComentario) => {
    if(valorComentario === ''){
      return;
    }

    const foto = this.state.fotos.find(foto => foto.id === idFoto);

    const novaLista = [
      ... foto.comentarios, {
        id: Math.random(),
        login: 'meuUsuario',
        texto: valorComentario
      }
    ]

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    };

    const fotos = this.state.fotos.map(foto => fotoAtualizada.id === foto.id ? fotoAtualizada : foto)

    this.setState({fotos, valorComentario: ''});
    
  }

  render() {

    return (
      <FlatList data={this.state.fotos} keyExtractor={ item => item.id } renderItem={ ({item}) => 
        <Post likeCallback={this.like} foto={item} comentarioCallback={this.adicionaComentario}/>
      }/>
    );
  }
}
export default () => {
  AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
}
