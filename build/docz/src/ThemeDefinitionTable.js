import PropTypes from 'prop-types';
import React from 'react';
import { PropsTable as Table } from 'docz';

const PropsTable = ({ of: { props } }) => (
  <Table
    of={{
      __docgenInfo: {
        props,
      },
    }}
  />
);
PropsTable.propTypes = {
  of: PropTypes.object,
};
PropsTable.defaultProps = {
  of: {
    props: {},
  },
};
export default PropsTable;
