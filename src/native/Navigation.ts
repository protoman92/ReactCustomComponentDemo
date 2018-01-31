import { Properties, Style } from './Dependency';

export namespace Props {
  /**
   * Represents the navigation props that we need to pass to a navigator. These
   * props will be delivered to the incoming component.
   */
  export interface Type {
    properties: Properties.Type;
    style: Style.Type;
  }
}