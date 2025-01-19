/**
 * CodeAnalizerComment: Updated 1 imports on 2024-09-22 17:16:57
 * Update:: import { IThisFPSWebPartClass } to '@mikezimm/fps-core-v7/lib/banner/FPSWebPartClass/IThisFPSWebPartClass1152;'
 */

import {
  IPropertyPaneGroup,
  IPropertyPaneField,
} from '@microsoft/sp-property-pane';

import { IThisFPSWebPartClass } from '@mikezimm/fps-core-v7/lib/banner/FPSWebPartClass/IThisFPSWebPartClass1152';
// import { ISpApiTesterWebPartProps } from '../ISpApiTesterWebPartProps';
// import { PropertyPaneFpsPeoplePicker } from '../components/PeoplePicker/fps-PropPanePeoplePicker';
import { ISiteUserInfo } from '@mikezimm/fps-core-v7/lib/types/@pnp/@2.14.0/sp/site-users';
import { PropertyPaneFpsPeoplePicker } from '../PeoplePicker2/fps-PropPanePeoplePicker';
import { IReactJsonV2WebPartProps } from '../../IReactJsonV2WebPartProps';

export function buildEasyModeGroup( thisWPClass: IThisFPSWebPartClass, wpProps: IReactJsonV2WebPartProps ): IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneFpsPeoplePicker({
      targetProperty: 'supportContacts',
      key: 'supportContacts',
      preFilter: 'All',
      fpsSpService: thisWPClass._fpsSpService,
      label: 'Support Contacts',
      initialData: wpProps.supportContacts as unknown as ISiteUserInfo[],
      onPropertyChange: (newUsers) => {
        wpProps.supportContacts = newUsers as any[];
        thisWPClass.context.propertyPane.refresh();
      },
      multiSelect: true,
      typeToShow: true,
      size: 'M',
    }),
  )

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Test People Picker`,
    isCollapsed: false,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
