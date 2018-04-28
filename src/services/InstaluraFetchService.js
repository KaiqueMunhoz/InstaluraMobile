import {AsyncStorage} from 'react-native';


export default class InstaluraFetchService {
    
    
    static get(recurso) {

        const uri = 'http://instalura-api.herokuapp.com/api' + recurso;

        return AsyncStorage.getItem('usuario')
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
            .then(response => response.json());
    }
}