import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';


export default class Likes extends Component {

    carregaIcone(likeada) {
        if(likeada){
          return require('../../../resources/img/s2-checked.png')
        }
        return require('../../../resources/img/s2.png')
    }

    exibeLikes(likers) {
        if(likers.length <= 0){
          return
        }
        return <Text style={styles.curtidas}>{likers.length} curtidas</Text>
    }
  

    render() {

        const { foto , likeCallback } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={likeCallback}>
                  <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
                </TouchableOpacity>
                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    curtidas: {
        fontWeight: 'bold'
    },
    botaoDeLike: {
        height: 40,
        width: 40,
        marginRight: 10
    }
});