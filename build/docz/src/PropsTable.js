import PropTypes from 'prop-types';
import React from 'react';
import { PropsTable as Table } from 'docz';
import { reduceProps } from '@andrew-codes/verdigris-style-container';
import { some } from 'lodash';

const PropsTable = ({ of: { __docgenInfo }, ignoreProps }) => (
  <Table
    of={{
      __docgenInfo: {
        ...__docgenInfo,
        props: {
          ...reduceProps(__docgenInfo.props, (acc, key, value) => {
            if (key === 'createAnalyticsEvent' || some(ignoreProps, key)) {
              return acc;
            }
            acc[key] = value;
            return acc;
          }),
          ...__docgenInfo.contextTypes,
        },
      },
    }}
  />
);
PropsTable.propTypes = {
  ...Table.propTypes,
  of: PropTypes.func,
  ignoreProps: PropTypes.arrayOf(PropTypes.string),
};
PropsTable.defaultProps = {
  of: {
    __docgenInfo: {
      props: {},
      contextTypes: {},
    },
  },
  ignoreProps: [],
};
export default PropsTable;
