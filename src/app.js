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

  render() {

    const fotos = [
      {id: 1, usuario: 'Munhoz'},
      {id: 2, usuario: 'Kaique'},
      {id: 3, usuario: 'OutroNome'}
    ]

    return (
      <FlatList data={this.state.fotos} keyExtractor={ item => item.id } renderItem={ ({item}) => 
        <Post foto={item} />
      }/>
    );
  }
}
export default () => {
  AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
}
