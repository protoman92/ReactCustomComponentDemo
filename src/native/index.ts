import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as App from './App';
import * as Input from './Input';
import * as PhoneInput from './PhoneInput';
import * as Screen from './Screen';

let app = StackNavigator({
  [Screen.HOME.id]: { screen: App.Component.Self },
  [Screen.INPUT.id]: { screen: Input.Component.Self },
  [Screen.PHONE.id]: { screen: PhoneInput.Component.Self },
});

AppRegistry.registerComponent('ReactCustomComponentDemo', () => app);
