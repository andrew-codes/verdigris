import baseTheme from '@andrew-codes/verdigris-base-theme';
import PropTypes from 'prop-types';
import React from 'react';
import {
  applyTheme,
  createComponent,
  withTheme,
  utils,
} from '@andrew-codes/verdigris-style-container';
import { CloseIcon } from '@andrew-codes/verdigris-icons';
import { noop } from 'lodash';
import { withAnalytics } from '@andrew-codes/verdigris-analytics';

const localTheme = () => ({
  Chip: {
    backgroundColor: 'lightgray',
    borderColor: 'dimgray',
    spacing: 4,
    textColor: 'black',
  },
});

const ChipRoot = createComponent(
  ({ clickable, fullWidth, theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.Chip.backgroundColor,
    borderRadius: `${theme.typography.baseSize}px`,
    color: `${theme.Chip.textColor}`,
    cursor: clickable ? 'pointer' : 'default',
    display: fullWidth ? 'flex' : 'inline-flex',
    minHeight: `${theme.typography.baseSize * theme.typography.lineHeight +
      theme.Chip.spacing * 2}px`,
    whiteSpace: 'nowrap',
  }),
  'div',
  ['data-component'],
);
const Avatar = createComponent(
  ({ size, theme }) => ({
    alignItems: 'center',
    background: theme.Chip.backgroundColor,
    borderColor: theme.Chip.borderColor,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '50%',
    display: 'inline-flex',
    height: `${size}px`,
    justifyContent: 'center',
    marginLeft: `${theme.Chip.spacing}px`,
    width: `${size}px`,
  }),
  'span',
);
const Content = createComponent(
  ({ hasAvatar, theme }) => ({
    display: 'inline-block',
    fontSize: `${theme.typography.baseSize}px`,
    lineHeight: theme.typography.lineHeight,
    minWidth: `${theme.Chip.spacing * 2}px`,
    ...utils.conditionalStyles(
      hasAvatar,
      utils.padding(
        `${theme.Chip.spacing}px`,
        `${theme.Chip.spacing * 2}px`,
        `${theme.Chip.spacing}px`,
        `${theme.Chip.spacing}px`,
      ),
      utils.padding(
        `${theme.Chip.spacing}px`,
        `${theme.Chip.spacing * 2}px`,
        `${theme.Chip.spacing}px`,
      ),
    ),
  }),
  'span',
);
const Delete = createComponent(
  ({ theme }) => ({
    alignItems: 'center',
    alignSelf: 'center',
    background: theme.Chip.borderColor,
    borderRadius: '50%',
    fill: theme.Chip.backgroundColor,
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    marginRight: `${theme.Chip.spacing * 2}px`,
    padding: `${theme.Chip.spacing}px`,
  }),
  'span',
  ['onClick'],
);

const Chip = ({
  avatar,
  className,
  clickable,
  component,
  createAnalyticsEvent,
  fullWidth,
  label,
  onClick,
  onDelete,
  theme,
  ...rest
}) => {
  const ComponentRoot = createComponent(
    () => {
      const anchorLinkVisitActiveStyles = {
        color: 'black',
      };
      return {
        alignItems: 'center',
        display: 'flex',
        ':link': anchorLinkVisitActiveStyles,
        ':visited': anchorLinkVisitActiveStyles,
        ':active': anchorLinkVisitActiveStyles,
      };
    },
    component,
    ['onClick', ...Object.keys(rest)],
  );
  const size =
    theme.typography.baseSize * theme.typography.lineHeight -
    theme.Chip.spacing * 4;

  return (
    <ChipRoot
      className={className}
      clickable={clickable}
      data-component="Chip"
      fullWidth={fullWidth}
    >
      <ComponentRoot
        {...rest}
        onClick={evt => {
          if (!clickable) return;
          onClick(
            evt,
            createAnalyticsEvent({ component: 'Chip', event: 'click' }),
          );
        }}
      >
        {avatar && (
          <Avatar
            size={theme.typography.baseSize * theme.typography.lineHeight}
          >
            {avatar}
          </Avatar>
        )}
        <Content hasAvatar={!!avatar}>{label}</Content>
        {onDelete && (
          <Delete
            onClick={evt => {
              evt.stopPropagation();
              onDelete(
                evt,
                createAnalyticsEvent({ component: 'Chip', event: 'delete' }),
              );
            }}
          >
            <CloseIcon color="inherit" size={size} />
          </Delete>
        )}
      </ComponentRoot>
    </ChipRoot>
  );
};
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
};

export default withAnalytics()(
  applyTheme(baseTheme, localTheme)(withTheme(Chip)),
);
export { Chip };
