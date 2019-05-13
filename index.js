import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import connectApi from './src/api/connectApi';

connectApi.init(()=>{
    AppRegistry.registerComponent(appName, () => App);
})

