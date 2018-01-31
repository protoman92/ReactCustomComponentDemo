import * as React from 'react';
import { Component as BaseComponent } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { StateType } from 'type-safe-state-js';
import { Provider } from './../Dependency';
import * as Properties from './Properties';
import * as Style from './Style';
import * as Home from './Home';
import * as Navigator from './Navigator';

export namespace Component {
  export namespace Props {
    export interface Type {
      navigation: NavigationScreenProp<StateType<any>, any>;
    }
  }

  export class Self extends BaseComponent<Props.Type, {}> {
    private readonly navigator: Navigator.Type;
    private readonly properties: Properties.Type;
    private readonly provider: Provider.Type;
    private readonly style: Style.Type;

    public constructor(props: Props.Type) {
      super(props);

      /// No DI here because of RN's AppRegistry, and the fact that this is a
      /// wrapper component anyway.
      this.navigator = new Navigator.Self(props.navigation);
      this.properties = new Properties.Self();
      this.provider = new Provider.Self();
      this.style = new Style.Self();
    }

    public render(): JSX.Element {
      let vm = new Home.ViewModel.Self(this.provider, this.navigator);

      let homeProps: Home.Component.Props.Type = {
        viewModel: vm,
        style: this.style,
        properties: this.properties,
      };

      return <Home.Component.Self {...homeProps}/>;
    }
  }
}