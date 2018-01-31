import { Try } from 'javascriptutilities';
import { Data } from 'react-base-utilities-js';

import {
  InputCell,
  InputForm,
  InputList,
} from 'react-basic-input-components';

import { PhoneInput } from './../../../ReactPhoneInputComponents/src';

export interface Type extends
  InputForm.Native.Style.ProviderType,
  PhoneInput.Native.Style.ProviderType {}

export class Self implements Type {
  public readonly inputCell: InputCell.Native.Style.SelectorType;
  public readonly inputList: InputList.Native.Style.SelectorType;
  public readonly inputForm: InputForm.Native.Style.SelectorType;
  public readonly phoneInput: PhoneInput.Native.Style.SelectorType;

  public constructor() {
    this.inputCell = {
      style: (_input: Data.Input.Type) => {
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
      style: (_inputs: Data.Input.Type[]) => {
        return Try.success<InputList.Native.Style.Type>({
          alignSelf: 'stretch',
        });
      },
    };

    this.inputForm = {
      containerStyle: (_header: Data.Input.Header) => {
        return Try.success<InputForm.Native.Style.ContainerType>({
          left: 0,
          marginLeft: 10,
          marginRight: 10,
          position: 'absolute',
          right: 0,
        });
      },

      buttonStyle: (_header: Data.Input.Header) => {
        return Try.success<InputForm.Native.Style.ButtonType>({
          backgroundColor: 'gray',
          height: 45,
          justifyContent: 'center',
          marginTop: 15,
          width: '100%',
        });
      },

      buttonTextStyle: (_header: Data.Input.Header) => {
        return Try.success<InputForm.Native.Style.ButtonTextType>({
          color: 'white',
          textAlign: 'center',
          textAlignVertical: 'center',
          width: '100%',
        });
      }
    };

    this.phoneInput = {
      containerStyle: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.ContainerType>({
          backgroundColor: 'black',
          height: '50%',
          left: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          position: 'absolute',
          right: 10,
        });
      },

      inputContainerStyle: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.InputContainerType>({
          flexDirection: 'row',
          height: 45,
          left: 5,
          position: 'absolute',
          right: 5,
          top: 5,
        });
      },

      extensionInputStyle: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.ExtensionInputType>({
          backgroundColor: 'lightgray',
          flexGrow: 1,
          paddingLeft: 5,
          paddingRight: 5,
          textAlign: 'center',
        });
      },

      phoneInputStyle: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.PhoneInputType>({
          backgroundColor: 'lightgray',
          flexGrow: 4,
          marginLeft: 5,
          paddingLeft: 5,
          paddingRight: 5,
          textAlign: 'center',
        });
      },

      extensionQueryStyle: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.ExtensionQueryType>({});
      },
    };
  }
}