import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';
import { defaultTheme } from '@verdigris/theme';
import { noop } from 'lodash';
import { ThemeProvider } from 'emotion-theming';
import { withAnalytics } from '@verdigris/analytics';

const avatarBorderSize = 2;

const ChipRoot = styled('div')`
    align-items: center;
    background-color: ${p => p.theme.colors.background};
    border-radius: ${p => p.theme.typography.baseSize}px;
    color: ${p => p.theme.colors.text};
    cursor: ${p => p.clickable ? 'pointer' : 'default'};
    display: inline-flex;
    margin: ${p => p.theme.spacing.unit}px;
    min-height: ${p => (p.theme.typography.baseSize * p.theme.typography.lineHeight) + p.theme.spacing.unit * 2}px;
    position: relative;
    white-space: nowrap;

    a:link,
    a:visited,
    a:active {
      color: ${p => p.theme.colors.text};
    }
  `;
const Content = styled('span')`
  display: inline-block;
  padding: ${p => `${p.theme.spacing.unit}px ${p.theme.spacing.unit * 2}px`};
  margin-left: ${p => p.hasAvatar ? `${calculateAvatarSize(p)}px` : 0};
  min-width:  ${p => p.theme.spacing.unit * 2}px;
`;
const Avatar = styled('span')`
  align-items: center;
  background: ${ p => p.theme.colors.background};
  border: ${avatarBorderSize}px solid #fff;
  border-radius: 50%;
  display: flex;
  height: ${p => calculateAvatarSize(p)}px;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${p => calculateAvatarSize(p)}px;
`;
const DeleteRoot = styled('span')`
  align-items: center;
  background: ${p => p.theme.colors.backgroundDark};
  border-radius: 50%;
  color: ${p => p.theme.colors.textInvert};
  cursor: pointer;
  display: inline-flex;
  height: ${p => p.theme.typography.baseSize}px;
  justify-content: center;
  margin-right: ${p => p.theme.spacing.unit}px;
  width: ${p => p.theme.typography.baseSize}px;
`;

function Chip({ avatar, clickable, component, createAnalyticsEvent, label, onClick, onDelete, ...rest }) {
  const ComponentRoot = styled(component)``;

  return (
    <ThemeProvider theme={defaultTheme}>
      <ChipRoot
        clickable={clickable}
      >
        <ComponentRoot {...rest} onClick={evt => {
          if (!clickable) return;
          onClick(evt, createAnalyticsEvent({ action: 'chip clicked' }));
        }}>
          {avatar && (
            <Avatar>
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
    </ThemeProvider>
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
  label: '',
  onClick: noop,
}

export default withAnalytics()(Chip);

function calculateAvatarSize({ theme }) {
  return (theme.typography.baseSize * theme.typography.lineHeight) + (theme.spacing.unit * 3) + avatarBorderSize;
}
