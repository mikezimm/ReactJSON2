
/**
 * IReactJSONSettingsV1 was based off the original react-json-view based in this package:
 *    import ReactJson from 'react-json-view';
 *    https://github.com/mac-s-g/react-json-view
 *
 * IReactJSONSettingsV2 is based off a newer actively supported open source project that is recommended by the aformentioned owner:
 *    The new one does not need to be installed but is dynamically loaded when needed (unless you use the function variant)
 *    https://github.com/microlinkhq/react-json-view/
 *
 *    npm install @microlink/react-json-view --save
 *    import ReactJsonView from '@microlink/react-json-view'
 *
 */

export interface IReactJSONSettingsV1 {
  jsonObject?: any;
  name: string;
  collapsed?: boolean | number;  // Defaults to false
  displayDataTypes?: boolean;  // Defaults to true
  displayObjectSize?: boolean;  // Defaults to true
  enableClipboard?: boolean;  // Defaults to true
  style?: React.CSSProperties;  // Defaults to
  theme?: ThemeKeys; // Defaults to 'rjv-default'
  indentWidth?: number; // Defaults to 2
  maxStrLength?: number | false;
  arrayGroupSize?: number;
  quotesOnKeys?: boolean;
}

export interface IReactJSONSettingsV2 extends IReactJSONSettingsV1 {
  onAdd?: OnAdd;  // Callback for when a property is added
  onDelete?: OnDelete; // Callback for when a property is deleted
  onEdit?: OnEdit;  // Callback for when a property is edited
}

type OnAdd = (add: InteractionProps) => void;
type OnDelete = (del: InteractionProps) => void;
type OnEdit = (edit: InteractionProps) => void;

interface InteractionProps {
  updated_src: object; // The updated source object after the operation
  name: string;        // The name of the affected property
  namespace: (string | number)[]; // The hierarchical path to the affected property
  new_value?: any;     // The new value after the operation (present in onAdd and onEdit)
  existing_value?: any; // The value before the operation (present in onEdit and onDelete)
}

export type ThemeKeys =
  | 'apathy'
  | 'apathy:inverted'
  | 'ashes'
  | 'bespin'
  | 'brewer'
  | 'bright:inverted'
  | 'bright'
  | 'chalk'
  | 'codeschool'
  | 'colors'
  | 'eighties'
  | 'embers'
  | 'flat'
  | 'google'
  | 'grayscale'
  | 'grayscale:inverted'
  | 'greenscreen'
  | 'harmonic'
  | 'hopscotch'
  | 'isotope'
  | 'marrakesh'
  | 'mocha'
  | 'monokai'
  | 'ocean'
  | 'paraiso'
  | 'pop'
  | 'railscasts'
  | 'rjv-default'
  | 'shapeshifter'
  | 'shapeshifter:inverted'
  | 'solarized'
  | 'summerfruit'
  | 'summerfruit:inverted'
  | 'threezerotwofour'
  | 'tomorrow'
  | 'tube'
  | 'twilight';
