import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { CloseIcon } from '@verdigris/icons';
import { defaultTheme } from '@verdigris/theme';
import { noop } from 'lodash';
import { ThemeProvider, withTheme } from 'emotion-theming';
import { withAnalytics } from '@verdigris/analytics';

const avatarBorderSize = 2;
const localTheme = ({ Avatar, Content, Delete }) => ({ clickable, fullWidth, hasAvatar, theme }) => css`
  align-items: center;
  background-color: ${theme.palette.lightGray};
  border-radius: ${theme.typography.baseSize}px;
  color: ${theme.palette.black};
  cursor: ${clickable ? 'pointer' : 'default'};
  display: ${fullWidth ? 'flex' : 'inline-flex'};
  margin: ${hasAvatar ? `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px` : `${theme.spacing.unit}px`};
  min-height: ${(theme.typography.baseSize * theme.typography.lineHeight) + theme.spacing.unit * 2}px;
  position: relative;
  white-space: nowrap;

  a:link,
  a:visited,
  a:active {
    color: ${theme.palette.black};
  }

  ${Content} {
    display: inline-block;
    font-size: ${theme.typography.baseSize}px;
    line-height: ${theme.typography.lineHeight};
    padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
    margin-left: ${hasAvatar ? `${calculateAvatarSize({ theme }) - theme.spacing.unit}px` : 0};
    min-width:  ${theme.spacing.unit * 2}px;
  }

  ${Avatar} {
    align-items: center;
    background: ${theme.palette.lightGray};
    border: ${avatarBorderSize}px solid #fff;
    border-radius: 50%;
    display: flex;
    height: ${calculateAvatarSize({ theme })}px;
    justify-content: center;
    left: -${theme.spacing.unit}px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: ${calculateAvatarSize({ theme })}px;
  }

  ${Delete} {
    align-items: center;
    align-self: center;
    background: ${theme.palette.gray};
    border-radius: 50%;
    color: ${theme.palette.paper};
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    margin-right: ${theme.spacing.unit}px;
    padding: ${theme.spacing.unit * 2}px
  }
`;

const ChipRoot = styled('div')`
  ${p => localTheme({ Avatar, Content, Delete })(p)}
  ${p => p.theme.Chip({ Avatar, Content, Delete })(p)}
`;
const Content = styled('span')``;
const Avatar = styled('span')``;
const Delete = styled('span')``;
const DeleteIcon = withTheme(({ theme, }) => {
  const size = theme.typography.baseSize * theme.typography.lineHeight - theme.spacing.unit * 4;
  return <CloseIcon size={size} />
});

function Chip({ avatar, className, clickable, component, createAnalyticsEvent, fullWidth, id, label, onClick, onDelete, ...rest }) {
  const ComponentRoot = styled(component)`
    display: flex;
  `;

  return (
    <ThemeProvider theme={defaultTheme}>
      <ChipRoot
        className={className}
        clickable={clickable}
        fullWidth={fullWidth}
        id={id}
        hasAvatar={avatar}
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
            <Delete onClick={evt => {
              evt.stopPropagation();
              onDelete(evt, createAnalyticsEvent({ action: 'chip deleted' }));
            }}>
              <DeleteIcon />
            </Delete>
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
   * CSS class applied to root element.
   */
  className: PropTypes.string,
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
   * When true, Chip will expand to fill full width of parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * Unique HTML ID applied to root element.
   */
  id: PropTypes.string,
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
  className: '',
  clickable: false,
  component: 'div',
  label: '',
  onClick: noop,
}

export default withAnalytics()(Chip);

function calculateAvatarSize({ theme }) {
  return (theme.typography.baseSize * theme.typography.lineHeight) + (theme.spacing.unit * 3) + avatarBorderSize;
}
