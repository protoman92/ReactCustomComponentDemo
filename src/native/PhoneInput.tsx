import * as React from 'react';
import { Component as BaseComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp as SCProp } from 'react-navigation';
import { StateType } from 'type-safe-state-js';
import { MVVM } from 'react-base-utilities-js';
import { PhoneInput } from 'react-phone-input-components';
import { Provider } from './../Dependency';
import * as Navigator from './Navigator';
import * as Screen from './Screen';

export namespace Model {
  export interface Type extends PhoneInput.Base.Model.ProviderType {}

  export class Self implements Type {
    private readonly provider: Provider.Type;

    public constructor(provider: Provider.Type) {
      this.provider = provider;
    }

    public phoneInput_model(id: string): PhoneInput.Base.Model.Type {
      return new PhoneInput.Dispatch.Model.Self(this.provider, id);
    }
  }
}

export namespace ViewModel {
  export interface Type extends
    MVVM.ViewModel.Type,
    PhoneInput.Base.ViewModel.ProviderType {}

  export interface ProviderType {
    phoneInputScreen_viewModel(): Type;
  }

  export class Self implements Type {
    private readonly provider: Provider.Type;
    private readonly model: Model.Type;

    public get screen(): Readonly<MVVM.Navigation.Screen.BaseType> {
      return Screen.PHONE;
    }

    public constructor(provider: Provider.Type, model: Model.Type) {
      this.provider = provider;
      this.model = model;
    }

    public initialize = (): void => {};
    public deinitialize = (): void => {};

    public phoneInput_viewModel(id: string): PhoneInput.Base.ViewModel.Type {
      let model = this.model.phoneInput_model(id);
      return new PhoneInput.Base.ViewModel.Self(this.provider, model);
    }
  }
}

export namespace Component {
  export namespace Props {
    export type NavStateParams = Navigator.ParamsType<ViewModel.Type>;

    /**
     * This props type has to conform to react-navigation's requirements.
     */
    export interface Type {
      navigation: SCProp<Navigator.StateType<NavStateParams>, any>;
    }
  }

  export class Self extends BaseComponent<Props.Type, StateType<any>> {
    private readonly viewModel: ViewModel.Type;

    public constructor(props: Props.Type) {
      super(props);
      this.viewModel = props.navigation.state.params.viewModel;
    }

    public render(): JSX.Element {
      let params = this.props.navigation.state.params;
      let vm = this.viewModel.phoneInput_viewModel(Screen.PHONE.id);

      let phoneProps: PhoneInput.Native.Component.Props.Type = {
        viewModel: vm,
        propertiesProvider: params.propertiesProvider,
        styleProvider: params.styleProvider,
      };

      return <View style={styles.container}>
        <PhoneInput.Native.Component.Self {...phoneProps}/>
      </View>;
    }
  }
}

let styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
});