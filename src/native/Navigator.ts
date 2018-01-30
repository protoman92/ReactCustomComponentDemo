import { NavigationScreenProp } from 'react-navigation';
import { MVVM } from 'react-base-utilities-js';
import * as Input from './Input';
import * as Screen from './Screen';

export interface Type extends MVVM.Navigator.Type {}

export class Self implements Type {
  private readonly navigation: NavigationScreenProp<any, any>;

  public constructor(navigation: NavigationScreenProp<any, any>) {
    this.navigation = navigation;
  }

  public navigate(vm: MVVM.ViewModel.Type, info: MVVM.Navigation.Info.Type): void {
    let navigation = this.navigation;

    switch (true) {
      case vm instanceof Input.ViewModel.Self:
        navigation.navigate(Screen.INPUT.id);
        break;

      default:
        throw new Error(`Unhandled navigation ${info}`);
    }
  }

  public back(info: MVVM.Navigation.Info.Type): void {
    console.log(info);
  }
}