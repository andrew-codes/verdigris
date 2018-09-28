import React from 'react';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import * as AllIcons from '../src/index';

const icons = Object.keys(AllIcons).map(key => ({
  name: key,
  Icon: AllIcons[key],
}));

const IconList = createComponent(
  () => ({
    listStyle: 'none',
    margin: '0',
    padding: '0',
  }),
  'ul',
);
const IconListItem = createComponent(
  () => ({
    alignItems: 'center',
    display: 'inline-flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    margin: '8px',
    minHeight: '150px',
    minWidth: '150px',
    padding: '8px',
  }),
  'li',
);
const IconName = createComponent(
  () => ({
    borderBottom: '1px dashed black',
    display: 'block',
    justifySelf: 'flex-start',
    margin: '0',
  }),
  'h4',
);
const IconWrapper = createComponent(
  () => ({
    alignItems: 'center',
    display: 'flex',
    flex: '1',
    justifySelf: 'center',
  }),
  'span',
);

export default function Icons() {
  return (
    <StyleProvider>
      <IconList>
        {icons.map(({ name, Icon }) => (
          <IconListItem key={name}>
            <IconName>{name}</IconName>
            <IconWrapper>
              <Icon />
            </IconWrapper>
          </IconListItem>
        ))}
      </IconList>
    </StyleProvider>
  );
}
Icons.defaultProps = {
  icons: [],
};
