import React, { Component } from 'react';
import Types from 'prop-types';
import { noop } from 'lodash';
import Icon from '@/components/Icon';
import Widget from '@/components/Flip';

export default class AccountsList extends Component {
  static displayName = 'AccountsList';

  static propTypes = {
    onBack: Types.func,
    onAdd: Types.func,
  }

  static defaultProps = {
    onBack: noop,
    onAdd: noop,
  }

  render() {
    const { onAdd, onBack } = this.props;

    return (
      <Widget
        className="b-accounts-list"
        label="Accounts"
        onLabelClick={onBack}
      >
        <div className="b-accounts-list__body" />

        <div className="b-accounts-list__footer">
          <button className="b-btn b-btn--block" onClick={onAdd}>
            <Icon name="ios-add-outline" /> Add account
          </button>
        </div>
      </Widget>
    );
  }
}
