import { Data } from 'react-base-utilities-js';

export namespace Input {
  export let title = 'Input';
  export let confirmTitle = 'Confirm all inputs';

  export function allInputs(): Data.Input.Type[] {
    return [email, password];
  }

  export let email: Data.Input.Type = {
    id: 'email',
    placeholder: 'Your email please',
  };

  export let password: Data.Input.Type = {
    id: 'password',
    placeholder: 'Your password please',
  };
}