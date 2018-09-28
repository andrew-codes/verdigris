import PropTypes from 'prop-types';
import React from 'react';
import { some } from 'lodash';
import { PropsTable as Table } from 'docz';
import { reduceProps } from '@andrew-codes/verdigris-style-container';

export { default as Playground } from './Playground';
export const PropsTable = ({ of: { __docgenInfo }, ignoreProps }) => (
  <Table
    of={{
      __docgenInfo: {
        ...__docgenInfo,
        props: reduceProps(__docgenInfo.props, (acc, key, value) => {
          if (key === 'createAnalyticsEvent' || some(ignoreProps, key)) {
            return acc;
          }
          acc[key] = value;
          return acc;
        }),
      },
    }}
  />
);
PropsTable.propTypes = {
  ...Table.propTypes,
  ignoreProps: PropTypes.arrayOf(PropTypes.string),
};
PropsTable.defaultProps = {
  ignoreProps: [],
};
