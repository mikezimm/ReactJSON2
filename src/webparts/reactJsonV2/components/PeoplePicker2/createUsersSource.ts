
import { createGroupsSource } from '@mikezimm/fps-core-v7/lib/components/molecules/source-props/createSources/Users/createGroupsSource';
import { IFpsSpHttpServiceMIN } from '@mikezimm/fps-core-v7/lib/components/molecules/SpHttp/Sp/IFpsSpHttpServiceMIN';
import { ISourceProps } from '@mikezimm/fps-core-v7/lib/components/molecules/source-props/ISourceProps';

/**
 * import { createGroupsSource } from '@mikezimm/fps-core-v7/lib/components/molecules/source-props/Users/createGroupSource';
 * @param webUrl
 * @param fpsSpService
 * @returns
 */
export function createUsersSource(webUrl: string, fpsSpService: IFpsSpHttpServiceMIN ): ISourceProps {
  // 2025-01-18:  Making this any just so I can more easily update the performanceSettings.label
  // const Source: ISourceProps = createGroupsSource( webUrl, fpsSpService );
  const Source: any = createGroupsSource( webUrl, fpsSpService );
  Source.key = 'users';
  Source.defType = 'Users';
  Source.fpsContentType = [ 'user' ];
  Source.performanceSettings.label = 'Users';
  return Source;
}