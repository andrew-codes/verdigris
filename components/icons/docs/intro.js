import React from 'react';
import styled from 'react-emotion';
import { code, md } from '@verdigris/docs';
import * as Icons from '../src/index';

const icons = Object.keys(Icons).map((key) => ({
  name: key,
  Icon: Icons[key],
}));

const IconList = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const IconListItem = styled('li')`
  align-items: center;
  border: 1px solid black;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
  min-height: 150px;
  min-width: 150px;
  padding: 8px;
`;
const IconName = styled('h4')`
  border-bottom: 1px dashed black;
  display: block;
  justify-self: flex-start;
  margin: 0;
  width: 100%;
`;
const IconWrapper = styled('span')`
  align-items: center;
  display: flex;
  flex: 1;
  justify-self: center;
`;

function RenderIcons({ icons }) {
  return (
    <IconList>
      {icons.map(({ name, Icon }, iconIndex) => (
        <IconListItem key={iconIndex}>
          <IconName>{name}<br />(size: 32)</IconName>
          <IconWrapper>
            <Icon size={32} />
          </IconWrapper>
        </IconListItem>
      ))}
    </IconList>
  );
}
RenderIcons.defaultProps = {
  icons: [],
};

export default () => md`
# Icons

${<RenderIcons icons={icons} />}
`;
