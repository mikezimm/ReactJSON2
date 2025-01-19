
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import FpsPeoplePicker, { IFpsPeoplePickerProps, } from './fps-PeoplePicker'; // Assuming this is the location of your custom People Picker
import { ISiteUserInfo } from '@mikezimm/fps-core-v7/lib/types/@pnp/@2.14.0/sp/site-users';

// Properties interface for the custom property pane control
export interface IPropertyPaneFpsPeoplePickerProps extends IFpsPeoplePickerProps {
  targetProperty: string,
  label: string;
  onPropertyChange: (propertyValue: ISiteUserInfo[]) => void;
}

// Function-based implementation for the custom Property Pane field
export function PropertyPaneFpsPeoplePicker(
  props: IPropertyPaneFpsPeoplePickerProps
): IPropertyPaneField<IPropertyPaneCustomFieldProps> {

  const { fpsSpService, targetProperty, label, description, initialData, onPropertyChange, multiSelect, disabled, preFilter, size, typeToShow } = props;

  return {
    // Define the field as a custom property pane field
    type: 1, // Custom field type
    targetProperty: targetProperty,
    properties: {
      // Provide a unique key for the custom field to track its identity
      key: `${targetProperty}`,

      // Define the render function to create the React component
      onRender: (elem: HTMLElement) => {
        // Use ReactDOM.render to render the FpsPeoplePicker component into the given DOM element
        ReactDOM.render(
          <FpsPeoplePicker
            key={ targetProperty }
            label={ label }
            description={ description }
            fpsSpService={fpsSpService} // Triggered when users are selected
            siteUrl={ '' }
            sendSelectedUsers={onPropertyChange} // Triggered when users are selected
            initialData={initialData} // Default selected users
            multiSelect={multiSelect} // Multi-select mode
            disabled={disabled} // Whether the control is disabled
            preFilter={preFilter} // Pre-filter logic for fetching users
            size={size} // Size of the picker (S, M, or L)
            typeToShow={ typeToShow }

            // styles={ null }
            // className={ '' }
            // labelStyles={ null }
            // onUsersFetched={ null }
          />,
          elem // Render into this DOM element
        );
      },

      // Define the cleanup function to remove the React component when the field is disposed
      onDispose: (elem: HTMLElement) => {
        ReactDOM.unmountComponentAtNode(elem);
      },
    },
  };
}
