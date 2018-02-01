import { Try } from 'javascriptutilities';
import { Data } from 'react-base-utilities-js';
import { InputCell, InputForm, InputList } from 'react-basic-input-components';
import { PhoneInput } from 'react-phone-input-components';
import * as Model from './../Model';

export interface Type extends
  InputForm.Native.Properties.ProviderType,
  PhoneInput.Native.Properties.ProviderType {}

export class Self implements Type {
  public readonly inputCell: InputCell.Native.Properties.SelectorType;
  public readonly inputList: InputList.Native.Properties.SelectorType;
  public readonly inputForm: InputForm.Native.Properties.SelectorType;
  public readonly phoneInput: PhoneInput.Native.Properties.SelectorType;

  public constructor() {
    this.inputCell = {
      properties: (input: Data.Input.Type) => {
        let isPassword = input.id === Model.Input.password.id;
        let secure = isPassword;

        return Try.success<InputCell.Native.Properties.Type>({
          keyboardType: Data.InputType.NativeCommon.Case.DEFAULT,
          multiline: false,
          placeholder: `Placeholder for ${input.id}`,
          placeholderTextColor: 'red',
          secureTextEntry: secure,

          /// If implemented correctly, this style should be overridden.
          style: {height: 1000},
        });
      },
    };

    this.inputList = {
      properties: (_inputs: Data.Input.Type[]) => {
        return Try.success<InputList.Native.Properties.Type>({});
      },
    };

    this.inputForm = {
      containerProperties: (_header: Data.Input.Header) => {
        return Try.success<InputForm.Native.Properties.ContainerType>({});
      },
    };

    this.phoneInput = {
      mainContainer: (_id) => Try.failure(''),
      inputContainer: (_id) => Try.failure(''),
      extensionSearchContainer: (_id) => Try.failure(''),
      countryCodeItem: (_id, _cc) => Try.failure(''),
      countryCodeItemContainer: (_id, _cc) => Try.failure(''),

      extensionInputField: (_id: string) => {
        return Try.success({
          placeholder: 'Ext.',
          placeholderTextColor: 'gray',
          underlineColorAndroid: 'rgba(0,0,0,0)',
        });
      },

      extensionQueryField: (_id: string) => {
        return Try.success({
          placeholder: 'Search your country code',
          placeholderTextColor: 'gray',
          underlineColorAndroid: 'rgba(0,0,0,0)',
        });
      },

      phoneInputField: (_id: string) => {
        return Try.success({
          placeholder: 'Phone number',
          placeholderTextColor: 'gray',
          underlineColorAndroid: 'rgba(0,0,0,0)',
        });
      },

      selectableCountryCodeList: (_id: string) => Try.success({
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
      }),
    };
  }
}