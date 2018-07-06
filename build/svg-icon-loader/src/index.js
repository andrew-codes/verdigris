function createLoaderOutput(source) {
  return `
    import React from 'react';
    import SvgIcon from '../SvgIcon';

    export default function({ children, ...rest }) {
     return (
      <SvgIcon {...rest}>
        ${source}
      </SvgIcon>
     );
    };
  `;
}

module.exports = async function svgIconLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  return createLoaderOutput(source);
};
