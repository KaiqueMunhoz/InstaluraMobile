import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  AsyncStorage
} from 'react-native';

import Post from '../Post';
import InstaluraFetchService from '../../services/InstaluraFetchService'

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount(){

    

    InstaluraFetchService.get('/fotos')
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

    AsyncStorage.getItem('usuario')
    .then(token => JSON.parse(token))
    .then(usuario => {
      
      let novaLista = [];
      if(!foto.likeada) {
        novaLista = [
          ... foto.likers,
          {login: usuario.nome}
        ]
      } else {
        novaLista = foto.likers.filter(liker => liker.login !== usuario.nome)
      }
      return novaLista;
    })
    .then(novaLista => {
      
      const fotoAtualizada = {
        ... foto,
        likeada: !foto.likeada,
        likers: novaLista
      };
      const fotos = this.findFotos(fotoAtualizada);
      this.setState({fotos})
    });

    const uri = `http://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`;
    AsyncStorage.getItem('usuario')
    .then(token => JSON.parse(token))
    .then(usuario => {
      return {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json',
          'X-AUTH-TOKEN': usuario.token
        })
      }
    })
    .then(requestInfo => {
      return fetch(uri, requestInfo)
    })
  }

  adicionaComentario = (idFoto, valorComentario) => {
    if(valorComentario === ''){
      return;
    }

    const foto = this.findFoto(idFoto);
    const uri = `http://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`;

    AsyncStorage.getItem('usuario')
    .then(token => JSON.parse(token))
    .then(usuario => {
      return {
        method: 'POST',
        body: JSON.stringify({
          texto: valorComentario
        }),
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
    .then(resposta => resposta.json())
    .then(comentario => [... foto.comentarios, comentario])
    .then(novaLista => {
      const fotoAtualizada = {
        ...foto,
        comentarios: novaLista
      }

      const fotos = this.findFotos(fotoAtualizada);
      this.setState({fotos, valorComentario: ''});
    });
  }

  render() {

    return (
      <FlatList data={this.state.fotos} keyExtractor={ item => item.id } renderItem={ ({item}) => 
        <Post likeCallback={this.like} foto={item} comentarioCallback={this.adicionaComentario}/>
      }/>
    );
  }
}