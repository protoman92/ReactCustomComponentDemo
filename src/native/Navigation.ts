import * as Properties from './Properties';
import * as Style from './Style';

export namespace Props {
  /**
   * Represents the navigation props that we need to pass to a navigator. These
   * props will be delivered to the incoming component.
   */
  export interface Type {
    propertiesProvider: Properties.Type;
    styleProvider: Style.Type;
  }
}