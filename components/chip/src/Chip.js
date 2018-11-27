import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import {
  createComponent,
  styleUtils,
  WithTheme,
} from '@andrew-codes/verdigris-style-container';
// import { CloseIcon } from '@andrew-codes/verdigris-icons';
import { noop } from 'lodash';
import { WithAnalytics } from '@andrew-codes/verdigris-analytics';

const ChipRoot = createComponent(
  ({ clickable, fullWidth, theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.Chip.backgroundColor,
    borderRadius: `${theme.Chip.fontSize}px`,
    color: `${theme.Chip.textColor}`,
    cursor: clickable ? 'pointer' : 'default',
    display: fullWidth ? 'flex' : 'inline-flex',
    minHeight: `${theme.Chip.fontSize * theme.Chip.lineHeight +
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
    fontSize: `${theme.Chip.fontSize}px`,
    lineHeight: theme.Chip.lineHeight,
    minWidth: `${theme.Chip.spacing * 2}px`,
    ...styleUtils.conditionalStyles(
      hasAvatar,
      styleUtils.padding(
        `${theme.Chip.spacing}px`,
        `${theme.Chip.spacing * 2}px`,
        `${theme.Chip.spacing}px`,
        `${theme.Chip.spacing}px`,
      ),
      styleUtils.padding(
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
  clickable,
  component,
  fullWidth,
  label,
  onClick,
  onDelete,
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

  return (
    <StyleProvider theme={{ Chip: Chip.defaultThemeValues }}>
      <WithAnalytics>
        {createAnalyticsEvent => (
          <WithTheme>
            {theme => {
              const avatarSize = theme.Chip.fontSize * theme.Chip.lineHeight;

              return (
                <ChipRoot
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
                        createAnalyticsEvent({
                          component: 'Chip',
                          event: 'click',
                        }),
                      );
                    }}
                  >
                    {avatar && <Avatar size={avatarSize}>{avatar}</Avatar>}
                    <Content hasAvatar={!!avatar}>{label}</Content>
                    {onDelete && (
                      <Delete
                        onClick={evt => {
                          evt.stopPropagation();
                          onDelete(
                            evt,
                            createAnalyticsEvent({
                              component: 'Chip',
                              event: 'delete',
                            }),
                          );
                        }}
                      />
                    )}
                  </ComponentRoot>
                </ChipRoot>
              );
            }}
          </WithTheme>
        )}
      </WithAnalytics>
    </StyleProvider>
  );
};
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
   * @deprecated Callback invoked when chip delete icon is clicked. Providing this will cause the delete icon to show.
   */
  onDelete: PropTypes.func,
};
Chip.defaultProps = {
  clickable: false,
  component: 'div',
  label: '',
  onClick: noop,
};
Chip.themeDefinition = {
  /**
   * Chip background color.
   */
  backgroundColor: PropTypes.string,
  /**
   * Border color around the entirety of the Chip.
   */
  borderColor: PropTypes.string,
  /**
   * Size of text; used in size calculations.
   */
  fontSize: PropTypes.number,
  /**
   * Line height of text; used in size calculations.
   */
  lineHeight: PropTypes.number,
  /**
   * Spacing unit to calculate spacing such as padding and margins.
   */
  spacing: PropTypes.number,
  /**
   * Color of the Chip's label text.
   */
  textColor: PropTypes.string,
};
Chip.defaultThemeValues = {
  backgroundColor: 'lightgray',
  borderColor: 'dimgray',
  fontSize: 16,
  lineHeight: 1.5,
  spacing: 4,
  textColor: 'rgb(0, 0, 0)',
};

export default Chip;
