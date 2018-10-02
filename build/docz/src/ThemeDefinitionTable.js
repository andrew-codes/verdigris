import PropTypes from 'prop-types';
import React from 'react';
import { PropsTable as Table } from 'docz';

const PropsTable = ({ of }) => (
  <Table
    of={{
      __docgenInfo: {
        props: Array.isArray(of) ? of[0].props : of.props,
      },
    }}
  />
);
PropsTable.propTypes = {
  of: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ),
};
PropsTable.defaultProps = {
  of: {
    props: {},
  },
};
export default PropsTable;
