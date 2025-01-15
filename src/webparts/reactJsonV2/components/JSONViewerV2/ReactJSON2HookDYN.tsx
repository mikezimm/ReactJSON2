

import * as React from 'react';
import { useState, useEffect } from 'react';

import { IReactJSONSettingsV2 } from './IReactJSONSettingsV2'; // Assuming you have the interface defined

/**
 * Builds ReactJson object with FPS Defaults
 * @param props
 * @returns
 */
const FPSReactJSON2Hook: React.FC<IReactJSONSettingsV2> = (props) => {
  const [ReactJson, setReactJsonView] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@microlink/react-json-view@1.24.0/dist/main.min.js'; // SPFx 1.17.3+ version Adjust version if needed
    // script.src = 'https://cdn.jsdelivr.net/npm/@microlink/react-json-view@1.24.0/dist/main.min.js'; // SPFx 1.17.3+ version Adjust version if needed
    // script.src = 'https://cdn.jsdelivr.net/npm/@microlink/react-json-view@1.24.1/dist/main.min.js'; // SPFx 1.5.1 version Adjust version if needed
    script.async = true;

    script.onload = () => {
      console.log('React JSON Viewer dynamically loaded');
      setReactJsonView((window as any).ReactJson ); // Access the global ReactJsonView
    };

    script.onerror = (err) => {
      console.error('Failed to load React JSON Viewer:', err);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!ReactJson) {
    return <div>Loading JSON Viewer...</div>;
  }

  let jsonObject = typeof props.jsonObject === 'object' ? props.jsonObject : { empty: 'jsonObject is empty or does not exist :)'};

  const collapsed = props.collapsed || false;
  const displayDataTypes = props.displayDataTypes !== false; // Default to true
  const displayObjectSize = props.displayObjectSize !== false; // Default to true
  const enableClipboard = props.enableClipboard !== false; // Default to true
  const style = props.style || { padding: '20px 0px' };
  const themeJSON = props.theme || 'rjv-default';
  const indentWidth = props.indentWidth || 2;

  return (
    <ReactJson
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
      onAdd={ props.onAdd }
      onDelete={ props.onDelete }
      onEdit={ props.onEdit }
    />
  );
};

export default FPSReactJSON2Hook;
