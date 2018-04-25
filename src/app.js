import {AppRegistry} from 'react-native';
import Feed from './components/Feed';
// import Feed from './screens/Login';

export default () => {
  AppRegistry.registerComponent('InstaluraMobile', () => Feed);
}