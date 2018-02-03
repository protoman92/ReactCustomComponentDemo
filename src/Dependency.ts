import { Observable } from 'rxjs';
import { Try } from 'javascriptutilities';
import { DispatchReducer, ReduxStore as Store } from 'reactive-rx-redux-js';
import { Data } from 'react-base-utilities-js';
import { InputCell, InputForm } from 'react-basic-input-components';
import { ErrorDisplay } from 'react-error-display-components';
import { PhoneInput } from 'react-phone-input-components';
import Codes from './countryCodes';

import * as Model from './Model';

export namespace Action {
  export interface Type extends
    ErrorDisplay.Dispatch.Action.ProviderType,
    InputCell.Dispatch.Action.ProviderType,
    PhoneInput.Dispatch.Action.ProviderType {}
}

export namespace CountryCode {
  export class Self implements PhoneInput.Base.Provider.CountryCodeType {
    public fetchCodes<Prev>(prev: Try<Prev>): Observable<Try<Data.CountryCode.Type[]>> {
      try {
        prev.getOrThrow();
        return Observable.of(Try.success(Codes));
      } catch (e) {
        return Observable.of(Try.failure(e));
      }
    }
  }
}

export namespace Provider {
  export interface Type extends
    InputForm.Dispatch.Provider.Type,
    PhoneInput.Dispatch.Provider.Type {
    action: Action.Type;
  }

  export class Self implements Type {
    public readonly action: Action.Type;
    public readonly constants: ErrorDisplay.Base.Constants.ProviderType;
    public readonly countryCodes: PhoneInput.Base.Provider.CountryCodeType;
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

        error: ErrorDisplay.Dispatch.Action.createDefault(),
        phoneInput: PhoneInput.Dispatch.Action.createDefault(''),
      };

      let reducerError = ErrorDisplay.Dispatch.Reducer.createDefault();
      let reduceInputCell = InputCell.Dispatch.Reducer.createDefault();
      let reducePhoneInput = PhoneInput.Dispatch.Reducer.createDefault();

      let reducer: DispatchReducer<any> = (state, action) => {
        switch (true) {
          case ErrorDisplay.Dispatch.Action.isInstance(action):
            return reducerError(state, action);

          case InputCell.Dispatch.Action.isInstance(action):
            return reduceInputCell(state, action);

          case PhoneInput.Dispatch.Action.isInstance(action):
            return reducePhoneInput(state, action);

          default:
            throw new Error(`Unrecognized action ${action}`);
        }
      };

      this.store = Store.Dispatch.createDefault(reducer);
      this.substateSeparator = '.';
      this.constants = { error: { displayDuration: 3 }};
      this.countryCodes = new CountryCode.Self();
    }
  }
}