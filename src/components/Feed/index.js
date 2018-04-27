import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  AsyncStorage
} from 'react-native';

import Post from '../Post';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount(){

    const uri = 'http://instalura-api.herokuapp.com/api/fotos';

    AsyncStorage.getItem('usuario')
    .then(token => JSON.parse(token))
    .then(usuario => {
      return {
        headers: new Headers({
          'Content-type': 'application/json',
          'X-AUTH-TOKEN': usuario.token
        })
      }
    })
    .then(requestInfo => {
      // console.warn(JSON.stringify(requestInfo))
      return fetch(uri, requestInfo)
    })
    .then(response => response.json())
    .then(json => this.setState({fotos: json}))
  }

  findFoto(idFoto){
    return this.state.fotos.find(foto => foto.id === idFoto);
  }

  findFotos(fotoAtualizada){
    return this.state.fotos.map(foto => fotoAtualizada.id === foto.id ? fotoAtualizada : foto)
  }

  like = (idFoto) => {

    const foto = this.findFoto(idFoto);

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

    const fotos = this.findFotos(fotoAtualizada);
    this.setState({fotos})
  }

  adicionaComentario = (idFoto, valorComentario) => {
    if(valorComentario === ''){
      return;
    }

    const foto = this.findFoto(idFoto);

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

    const fotos = this.findFotos(fotoAtualizada);
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