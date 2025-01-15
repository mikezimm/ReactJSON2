
import * as React from 'react';
import ReactJsonView from '@microlink/react-json-view'

import { IReactJSONSettingsV2, ThemeKeys } from './IReactJSONSettingsV2';

export const FPSReactJSON2Hook: React.FC<IReactJSONSettingsV2> = (props) => {
  const jsonObject = props.jsonObject || null;
  const collapsed = props.collapsed || false;

  // Fixed this during PivotTiles testing because the old if-logic would set false inputs to true
  const displayDataTypes = props.displayDataTypes !== false;
  const displayObjectSize = props.displayObjectSize !== false;
  const enableClipboard = props.enableClipboard !== false;

  const style = props.style || { padding: '20px 0px' };
  const themeJSON: ThemeKeys = props.theme || 'rjv-default';
  const indentWidth = props.indentWidth || 2;

  return (
    <ReactJsonView
      src={jsonObject}
      name={props.name}
      collapsed={collapsed}
      displayDataTypes={displayDataTypes}
      displayObjectSize={displayObjectSize}
      enableClipboard={enableClipboard}
      style={style}
      theme={themeJSON}
      indentWidth={indentWidth}
      collapseStringsAfterLength={props.maxStrLength}
      groupArraysAfterLength={props.arrayGroupSize}
      quotesOnKeys={props.quotesOnKeys}
    />
  );
};

export default FPSReactJSON2Hook;
