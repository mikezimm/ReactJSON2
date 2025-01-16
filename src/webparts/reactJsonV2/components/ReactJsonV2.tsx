import * as React from 'react';
import styles from './ReactJsonV2.module.scss';
import { IReactJsonV2Props } from './IReactJsonV2Props';
import { escape } from '@microsoft/sp-lodash-subset';

import FPSReactJSON2Hook from './JSONViewerV2/ReactJSON2HookNPM';

export default class ReactJsonV2 extends React.Component<IReactJsonV2Props, {}> {
  public render(): React.ReactElement<IReactJsonV2Props> {
    const {
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.reactJsonV2} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
        </div>
        <div>
          <h3>You are testing the ReactJsonViewer</h3>
          <div><a href="https://github.com/microlinkhq/react-json-view/">/github.com/microlinkhq/react-json-view</a></div>
          <FPSReactJSON2Hook jsonObject={ { Test:'This is a test object for the JSON viewer'}} name={ 'Sample Name' } />
        </div>
      </section>
    );
  }
}
