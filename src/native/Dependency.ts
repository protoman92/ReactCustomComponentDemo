import { Try } from 'javascriptutilities';
import { StyleSheet } from 'react-native';
import { DispatchReducer, ReduxStore as Store } from 'reactive-rx-redux-js';
import { Data } from 'react-base-utilities-js';
import { InputCell, InputForm, InputList } from './../../../ReactInputComponents/src';
import * as Model from './Model';

export namespace Style {
  export interface Type extends InputForm.Native.Style.ProviderType {}

  export class Self implements Type {
    public inputCell: InputCell.Native.Style.SelectorType;
    public inputList: InputList.Native.Style.SelectorType;
    public inputForm: InputForm.Native.Style.SelectorType;

    public constructor() {
      this.inputCell = {
        style: (_input: Data.Input.Type): Try<InputCell.Native.Style.Type> => {
          return Try.success(StyleSheet.flatten({
            backgroundColor: 'lightgray',
            color: 'black',
            height: 45,
            marginBottom: 2.5,
            marginTop: 2.5,
            paddingLeft: 5,
            width: '100%',
          }));
        },
      };

      this.inputList = {
        style: (_inputs: Data.Input.Type[]): Try<InputList.Native.Style.Type> => {
          return Try.success(StyleSheet.flatten({
            alignSelf: 'stretch',
          }));
        },
      };

      this.inputForm = {
        containerStyle: (_header: Data.Input.Header): Try<InputForm.Native.Style.ContainerType> => {
          return Try.success(StyleSheet.flatten({
            left: 0,
            marginLeft: 5,
            marginRight: 5,
            position: 'absolute',
            right: 0,
          }));
        },

        buttonStyle: (_header: Data.Input.Header): Try<InputForm.Native.Style.ButtonType> => {
          return Try.success(StyleSheet.flatten({
            backgroundColor: 'gray',
            height: 45,
            justifyContent: 'center',
            marginTop: 15,
            width: '100%',
          }));
        },

        buttonTextStyle: (_header: Data.Input.Header): Try<InputForm.Native.Style.ButtonTextType> => {
          return Try.success(StyleSheet.flatten({
            color: 'white',
            textAlign: 'center',
            textAlignVertical: 'center',
            width: '100%',
          }));
        }
      };
    }
  }
}

export namespace Provider {
  export interface Type extends InputForm.Dispatch.Provider.Type {}

  export class Self implements Type {
    public readonly action: InputCell.Dispatch.Action.ProviderType;
    public readonly store: Store.Dispatch.Type;
    public readonly substateSeparator: string;

    public constructor() {
      this.action = {
        inputCell: InputCell.Dispatch.Action.createDefault({
          fullValuePath: (input: Data.Input.Type): Try<string> => {
            switch (input.id) {
              case Model.Input.email.id: return Try.success('input.email');
              case Model.Input.password.id: return Try.success('input.password');
              default: return Try.failure(`Unknown input ${JSON.stringify(input)}`);
            }
          },
        }),
      };

      let reduceInputCell = InputCell.Dispatch.Reducer.createDefault();

      let reducer: DispatchReducer<any> = (state, action) => {
        switch (true) {
          case InputCell.Dispatch.Action.isInstance(action):
            return reduceInputCell(state, action);

          default:
            throw new Error(`Unrecognized action ${action}`);
        }
      };

      this.store = Store.Dispatch.createDefault(reducer);
      this.substateSeparator = '.';
    }
  }
}