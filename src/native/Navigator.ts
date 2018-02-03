import { NavigationScreenProp } from 'react-navigation';
import { Try } from 'javascriptutilities';
import { MVVM } from 'react-base-utilities-js';
import * as Input from './Input';
import * as PhoneInput from './PhoneInput';
import * as Navigation from './Navigation';

/**
 * Params for navigator. We add an additional property (viewModel) so that we
 * can pass it, along with other dependencies, to the incoming component.
 * @extends {Navigation.Props.Type} Navigation props extension.
 * @template VM View model type.
 */
export interface ParamsType<VM> extends Navigation.Props.Type {
  readonly viewModel: VM;
}

/**
 * When a state is passed to an incoming component by the navigator, we cannot
 * access it directly. It is instead nested in an object with a params key.
 * @template P State generics.
 */
export interface StateType<P> {
  readonly params: P;
}

export type Params = ParamsType<MVVM.ViewModel.Type>;

export interface Type extends MVVM.Navigator.Type<Params> {}

export class Self implements Type {
  private readonly navigation: NavigationScreenProp<any, any>;

  public constructor(navigation: NavigationScreenProp<any, any>) {
    this.navigation = navigation;
  }

  public navigate(props: Params, info: MVVM.Navigation.Info.Type): void {
    let navigation = this.navigation;
    let viewModel = props.viewModel;
    let path = Try.unwrap(viewModel.screen).map(v => v.id).getOrElse('');

    if (viewModel instanceof Input.ViewModel.Self) {
      let navProps: ParamsType<Input.ViewModel.Type> = {
        viewModel,
        propertiesProvider: props.propertiesProvider,
        styleProvider: props.styleProvider,
      };

      navigation.navigate(path, navProps);
    } else if (viewModel instanceof PhoneInput.ViewModel.Self) {
      let navProps: ParamsType<PhoneInput.ViewModel.Type> = {
        viewModel,
        propertiesProvider: props.propertiesProvider,
        styleProvider: props.styleProvider,
      };

      navigation.navigate(path, navProps);
    } else {
      throw new Error(`Unhandled navigation ${info}`);
    }
  }

  public back(info: MVVM.Navigation.Info.Type): void {
    console.log(info);
  }
}