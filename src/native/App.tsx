import { Subscription } from 'rxjs';
import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Try } from 'javascriptutilities';
import { InputCell, InputList } from './../../../ReactInputComponents/src';
import { Provider, Style } from './Dependency';
import * as Model from './Model';

export class App extends Component<any> {
  private readonly provider: Provider.Type;
  private readonly style: Style.Type;
  private readonly subscription: Subscription;

  public constructor(props: any) {
    super(props);
    this.provider = new Provider.Self();
    this.style = new Style.Self();
    this.subscription = new Subscription();
  }

  public componentWillMount(): void {
    this.provider.store.stateStream()
      .distinctUntilChanged()
      .logNext()
      .subscribe()
      .toBeDisposedBy(this.subscription);
  }

  public createInputComponents = (): JSX.Element[] => {
    let provider = this.provider;
    let style = this.style;
    let inputs = Model.Input.allValues();

    return Try.success(inputs)
      .map(v => v.map(v1 => {
        let model = new InputCell.Dispatch.Model.Self(provider, v1);
        return new InputCell.Base.ViewModel.Self(provider, model);
      }))
      .map(v => v.map(v1 => ({ key: v1.inputItem.id, viewModel: v1, style })))
      .map(v => v.map(v1 => <InputCell.Native.Component.Self {...v1}/>))
      .getOrElse([]);
  }

  public createInputList = (): JSX.Element => {
    let provider = this.provider;
    let style = this.style;
    let inputs = Model.Input.allValues();
    let model = new InputList.Dispatch.Model.Self(provider, inputs);
    let vm = new InputList.Base.ViewModel.Self(provider, model);
    let props = { viewModel: vm, style };
    return <InputList.Native.Component.Self {...props}/>;
  }

  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        {this.createInputList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    textAlign: 'center',
    height: 45,
  },
});