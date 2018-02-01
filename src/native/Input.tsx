import * as React from 'react';
import { Component as BaseComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp as SCProp } from 'react-navigation';
import { StateType } from 'type-safe-state-js';
import { Data, MVVM } from 'react-base-utilities-js';
import { InputForm } from 'react-basic-input-components';
import { Provider as BaseProvider } from './../Dependency';
import * as AppData from './../Model';
import * as Navigator from './Navigator';
import * as Screen from './Screen';

export namespace Provider {
  export interface Type extends BaseProvider.Type {}
}

export namespace Model {
  export interface ProviderType {
    inputScreen_model(): Type;
  }

  export interface Type extends InputForm.Base.Model.ProviderType {}

  export class Self implements Type {
    private readonly provider: Provider.Type;

    public constructor(provider: Provider.Type) {
      this.provider = provider;
    }

    public inputForm_model(header: Data.Input.Header): InputForm.Base.Model.Type {
      return new InputForm.Dispatch.Model.Self(this.provider, header);
    }
  }
}

export namespace ViewModel {
  export interface ProviderType {
    inputScreen_viewModel(): Type;
  }

  export interface Type extends
    MVVM.ViewModel.Type,
    InputForm.Base.ViewModel.ProviderType {}

  export class Self implements Type {
    private readonly provider: Provider.Type;
    private readonly model: Model.Type;

    public get screen(): MVVM.Navigation.Screen.BaseType {
      return Screen.INPUT;
    }

    public constructor(provider: Provider.Type, model: Model.Type) {
      this.provider = provider;
      this.model = model;
    }

    public initialize = (): void => {};
    public deinitialize = (): void => {};

    public inputForm_viewModel(header: Data.Input.Header): InputForm.Base.ViewModel.Type {
      let model = this.model.inputForm_model(header);
      return new InputForm.Base.ViewModel.Self(this.provider, model);
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
      let navState = props.navigation.state;
      this.viewModel = navState.params.viewModel;
    }

    public createInputForm = (): JSX.Element => {
      let props = this.props;
      let params = props.navigation.state.params;
      let vm = this.viewModel.inputForm_viewModel(AppData.Input);

      let formProps: InputForm.Native.Component.Props.Type = {
        viewModel: vm,
        propertiesProvider: params.propertiesProvider,
        styleProvider: params.styleProvider,
      };

      return <InputForm.Native.Component.Self {...formProps}/>;
    }

    public render(): JSX.Element {
      return (<View style={styles.container}>{this.createInputForm()}</View>);
    }
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});