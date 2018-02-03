import { Try } from 'javascriptutilities';
import { Data } from 'react-base-utilities-js';
import { TouchableButton } from 'react-native-basic-components';
import { InputCell, InputForm, InputList } from 'react-basic-input-components';
import { PhoneInput } from 'react-phone-input-components';
import * as Screen from './Screen';

export interface Type extends
  InputForm.Native.Style.ProviderType,
  PhoneInput.Native.Style.ProviderType {}

export class Self implements Type {
  public readonly inputCell: InputCell.Native.Style.SelectorType;
  public readonly inputList: InputList.Native.Style.SelectorType;
  public readonly inputForm: InputForm.Native.Style.SelectorType;
  public readonly phoneInput: PhoneInput.Native.Style.SelectorType;
  public readonly touchableButton: TouchableButton.Style.SelectorType;

  public constructor() {
    this.inputCell = {
      style: (_input: Data.Input.Type) => {
        return Try.success<InputCell.Native.Style.Type>({
          backgroundColor: 'lightgray',
          color: 'black',
          height: height.mid,
          marginBottom: spacing.smaller,
          marginTop: spacing.smaller,
          paddingLeft: spacing.small,
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
          marginLeft: spacing.mid,
          marginRight: spacing.mid,
          position: 'absolute',
          right: 0,
        });
      },
    };

    this.phoneInput = {
      mainContainer: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.ContainerType>({
          backgroundColor: 'lightgray',
          borderRadius: spacing.smaller,
          height: '75%',
          marginLeft: spacing.small,
          marginRight: spacing.small,
          flexDirection: 'column',
        });
      },

      inputContainer: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.InputContainerType>({
          height: height.mid,
          marginLeft: spacing.small,
          marginTop: spacing.small,
          marginRight: spacing.small,
        });
      },

      extensionInputField: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.ExtensionInputType>({
          backgroundColor: 'white',
          borderRadius: spacing.smaller,
          paddingLeft: spacing.small,
          paddingRight: spacing.small,
        });
      },

      phoneInputField: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.PhoneInputType>({
          backgroundColor: 'white',
          borderRadius: spacing.smaller,
          marginLeft: spacing.small,
          paddingLeft: spacing.small,
          paddingRight: spacing.small,
        });
      },

      extensionSearchContainer: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.ExtensionSearchContainerType>({
          marginBottom: spacing.small,
          marginLeft: spacing.small,
          marginRight: spacing.small,
          marginTop: spacing.small,
        });
      },

      extensionQueryField: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.ExtensionQueryType>({
          backgroundColor: 'white',
          borderRadius: spacing.smaller,
          height: height.mid,
          paddingLeft: spacing.small,
          paddingRight: spacing.small,
        });
      },

      selectableCountryCodeList: (_id: string) => {
        return Try.success<PhoneInput.Native.Style.SelectableCountryCodeListType>({
          backgroundColor: 'lightgray',
          borderRadius: spacing.smaller,
          marginTop: spacing.small,
        });
      },
    };

    this.touchableButton = {
      buttonContainer: (id: string) => {
        switch (id) {
          case Screen.PHONE.id:
            return Try.success<TouchableButton.Style.ButtonContainerType>({
              backgroundColor: 'white',
              height: height.small,
            });

          default:
            return Try.success<TouchableButton.Style.ButtonContainerType>({
              backgroundColor: 'gray',
              height: height.mid,
              marginTop: spacing.large,
            });
        }
      },

      buttonText: (id: string) => {
        switch (id) {
          case Screen.PHONE.id:
            return Try.success<TouchableButton.Style.ButtonTextType>({
              paddingLeft: spacing.small,
              textAlign: 'left',
            });

          default:
            return Try.success<TouchableButton.Style.ButtonTextType>({
              color: 'white',
            });
        }
      },
    };
  }
}

let height = {
  small: 30,
  mid: 40,
};

let spacing = {
  smaller: 3,
  small: 6,
  mid: 10,
  large: 15,
};