import { Try } from 'javascriptutilities';
import { DispatchReducer, ReduxStore as Store } from 'reactive-rx-redux-js';
import { Data } from 'react-base-utilities-js';
import { InputCell, InputForm, InputList } from './../../../ReactInputComponents/src';
import * as Model from './Model';

export namespace Style {
  export interface Type extends InputForm.Native.Style.ProviderType {}

  export class Self implements Type {
    public readonly inputCell: InputCell.Native.Style.SelectorType;
    public readonly inputList: InputList.Native.Style.SelectorType;
    public readonly inputForm: InputForm.Native.Style.SelectorType;

    public constructor() {
      this.inputCell = {
        style: (_input: Data.Input.Type): Try<InputCell.Native.Style.Type> => {
          return Try.success<InputCell.Native.Style.Type>({
            backgroundColor: 'lightgray',
            color: 'black',
            height: 45,
            marginBottom: 2.5,
            marginTop: 2.5,
            paddingLeft: 5,
            width: '100%',
          });
        },
      };

      this.inputList = {
        style: (_inputs: Data.Input.Type[]): Try<InputList.Native.Style.Type> => {
          return Try.success<InputList.Native.Style.Type>({
            alignSelf: 'stretch',
          });
        },
      };

      this.inputForm = {
        containerStyle: (_header: Data.Input.Header): Try<InputForm.Native.Style.ContainerType> => {
          return Try.success<InputForm.Native.Style.ContainerType>({
            left: 0,
            marginLeft: 5,
            marginRight: 5,
            position: 'absolute',
            right: 0,
          });
        },

        buttonStyle: (_header: Data.Input.Header): Try<InputForm.Native.Style.ButtonType> => {
          return Try.success<InputForm.Native.Style.ButtonType>({
            backgroundColor: 'gray',
            height: 45,
            justifyContent: 'center',
            marginTop: 15,
            width: '100%',
          });
        },

        buttonTextStyle: (_header: Data.Input.Header): Try<InputForm.Native.Style.ButtonTextType> => {
          return Try.success<InputForm.Native.Style.ButtonTextType>({
            color: 'white',
            textAlign: 'center',
            textAlignVertical: 'center',
            width: '100%',
          });
        }
      };
    }
  }
}

export namespace Properties {
  export interface Type extends InputForm.Native.Properties.ProviderType {}

  export class Self implements Type {
    public readonly inputCell: InputCell.Native.Properties.SelectorType;
    public readonly inputList: InputList.Native.Properties.SelectorType;
    public readonly inputForm: InputForm.Native.Properties.SelectorType;

    public constructor() {
      this.inputCell = {
        properties: (input: Data.Input.Type): Try<InputCell.Native.Properties.Type> => {
          return Try.success<InputCell.Native.Properties.Type>({
            defaultValue: `This is a default value for ${input.id}`,
            keyboardType: Data.InputType.NativeCommon.Case.NUMERIC,
            placeholder: `Placeholder for ${input.id}`,
            placeholderTextColor: 'red',

            /// If implemented correctly, this style should be overridden.
            style: {height: 1000},
          });
        },
      };

      this.inputList = {
        properties: (_inputs: Data.Input.Type[]): Try<InputList.Native.Properties.Type> => {
          return Try.success<InputList.Native.Properties.Type>({});
        },
      };

      this.inputForm = {
        containerProperties: (_header: Data.Input.Header): Try<InputForm.Native.Properties.ContainerType> => {
          return Try.success<InputForm.Native.Properties.ContainerType>({});
        },

        buttonProperties: (_header: Data.Input.Header): Try<InputForm.Native.Properties.ButtonType> => {
          return Try.success<InputForm.Native.Properties.ButtonType>({});
        },

        buttonTextProperties: (_header: Data.Input.Header): Try<InputForm.Native.Properties.ButtonTextType> => {
          return Try.success<InputForm.Native.Properties.ButtonTextType>({});
        },
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