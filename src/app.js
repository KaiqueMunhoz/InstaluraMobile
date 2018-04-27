import {AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Feed from './components/Feed';
import Login from './screens/Login';

export default () => {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);


  AsyncStorage.getItem('usuario')
  .then(token => {

    if(token) {
      return {
        screen: 'Feed',
        title: 'Instalura'
      };
    }
    return {
      screen: 'Login',
      title: 'Login'
    }
  })
  .then(screen => {
    console.warn(AsyncStorage.getItem('token'))
    Navigation.startSingleScreenApp({screen})
  })

}