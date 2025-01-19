import { ISiteUserInfo } from '@mikezimm/fps-core-v7/lib/types/@pnp/@2.14.0/sp/site-users';

export interface IReactJsonV2Props {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: any;
  supportContacts: ISiteUserInfo[];
}
