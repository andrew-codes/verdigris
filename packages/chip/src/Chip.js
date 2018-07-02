import { noop } from 'lodash';
import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';
import { getThemeFromProps } from '@verdigris/theme';
import { withAnalytics } from '@verdigris/analytics';

const avatarSize = 36;
const avatarBorderSize = 2;

const ChipRoot = styled('div')`
    align-items: center;
    background-color: ${p => p.color ? p.color : getThemeFromProps(p).colors.backgroundPrimary};
    border-radius: 16px;
    color: ${p => {
    const theme = getThemeFromProps(p);
    return p.inverted ? theme.colors.invertedText : theme.colors.text;
  }};
    cursor: ${p => p.clickable ? 'pointer' : 'default'};
    display: inline-flex;
    margin: ${p => getThemeFromProps(p).spacing.unit}px;
    min-height: 32px;
    position: relative;
  `;
const Content = styled('span')`
  display: inline-block;
  padding: ${p => {
    const theme = getThemeFromProps(p);
    return `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`;
  }};
  margin-left: ${p => p.hasAvatar ? `${avatarSize + avatarBorderSize}px` : 0};
  min-width:  ${p => getThemeFromProps(p).spacing.unit * 2}px;
`;
const Avatar = styled('span')`
  align-items: center;
  background: ${ p => p.color ? p.color : getThemeFromProps(p).colors.backgroundPrimary};
  border: ${avatarBorderSize}px solid #fff;
  border-radius: 50%;
  display: flex;
  height: ${avatarSize}px;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${avatarSize}px;
`;
const DeleteRoot = styled('span')`
  align-items: center;
  background: gray;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  height: 24px;
  justify-content: center;
  margin-right: ${p => getThemeFromProps(p).spacing.unit}px;
  width: 24px;
`;

function Chip({ avatar, clickable, color, component, createAnalyticsEvent, inverted, label, onClick, onDelete, ...rest }) {
  const ComponentRoot = styled(component)``;

  return (
    <ChipRoot
      clickable={clickable}
      color={color}
      inverted={inverted}
    >
      <ComponentRoot {...rest} onClick={evt => {
        if (!clickable) return;
        onClick(evt, createAnalyticsEvent({ action: 'chip clicked' }));
      }}>
        {avatar && (
          <Avatar
            color={color}
          >
            {avatar}
          </Avatar>
        )}
        <Content hasAvatar={avatar}>
          {label}
        </Content>
        {onDelete && (
          <DeleteRoot onClick={evt => {
            evt.stopPropagation();
            onDelete(evt, createAnalyticsEvent({ action: 'chip deleted' }));
          }}>
            x
        </DeleteRoot>
        )}
      </ComponentRoot>
    </ChipRoot>
  );
}

Chip.propTypes = {
  /**
   * Avatar element
   */
  avatar: PropTypes.element,
  /**
   * When true, the chip will display as clickable. Click events will raise on component prop as well.
   */
  clickable: PropTypes.bool,
  /**
   * Color of chip.
   */
  color: PropTypes.string,
  /**
   * Component to be used as the inner root node. Can be a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  /**
   * Content of the chip.
   */
  label: PropTypes.node,
  /**
   * Callback invoked when chip is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Callback invoked when chip delete icon is clicked. Providing this will cause the delete icon to show.
   */
  onDelete: PropTypes.func,
};
Chip.defaultProps = {
  clickable: false,
  component: 'div',
  onClick: noop,
}

export default withAnalytics()(Chip);
