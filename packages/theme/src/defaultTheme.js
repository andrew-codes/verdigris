import { css } from 'emotion';
import extendThemeWith from './extendThemeWith';

const avatarBorderSize = 2;
const palette = {
  cerulean: '#00a9e0',
  lightGray: 'lightgray',
  gray: 'gray',
  paper: '#fff',
  black: '#000',
};

const theme = {
  spacing: {
    unit: 4,
  },
  typography: {
    baseSize: 16,
    lineHeight: 1.5,
  },
  Icon: () => () => css`
    align-content: center;
    display: inline-flex;
    fill: ${palette.black};
    justify-content: center;
  `,
  Card: () => ({ hasShadow, hasBorder }) => css`
    background: ${palette.paper};
    display: flex;
    flex-direction: column;
    box-shadow: ${hasShadow ? "0 2px 4px rgba(0, 0, 0, 0.1);" : "none"};
    border: ${hasBorder ? "1px solid #d7dee4;" : "none"};
  `,
  CardBody: () => () => css`
  `,
  CardFooter: () => () => css`
  `,
  CardHeader: () => () => css`
  `,
  Chip: ({ Avatar, Content, Delete }) => ({ clickable, fullWidth, hasAvatar, theme }) => css`
    align-items: center;
    background-color: ${palette.lightGray};
    border-radius: ${theme.typography.baseSize}px;
    color: ${palette.black};
    cursor: ${clickable ? 'pointer' : 'default'};
    display: ${fullWidth ? 'flex' : 'inline-flex'};
    margin: ${hasAvatar ? `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px` : `${theme.spacing.unit}px`};
    min-height: ${(theme.typography.baseSize * theme.typography.lineHeight) + theme.spacing.unit * 2}px;
    position: relative;
    white-space: nowrap;

    a:link,
    a:visited,
    a:active {
      color: ${palette.black};
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
      background: ${palette.lightGray};
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
      background: ${palette.gray};
      border-radius: 50%;
      color: ${palette.paper};
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      margin-right: ${theme.spacing.unit}px;
      padding: ${theme.spacing.unit * 2}px
    }
  `,
  Switch: ({ Bar, Handle, Label }) => ({ isChecked, isDisabled, theme }) => css`
    align-items: center;
    display: inline-flex;
    margin: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;

    ${Bar} {
      background-color: ${palette.gray};
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      height: 12px;
      margin-right: 4px;
      min-width: 48px;
      position: relative;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      width: 48px;
    }
    ${Handle} {
      background: ${isDisabled ? palette.lightGray : isChecked ? palette.cerulean : 'white'};
      border-radius: 50%;
      border: 1px solid ${isDisabled ? palette.lightGray : isChecked ? palette.cerulean : palette.gray};
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
      height: ${theme.typography.baseSize * theme.typography.lineHeight}px;
      left: -1px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%) ${isChecked ? `translateX(${48 + 4 - (theme.typography.baseSize * theme.typography.lineHeight)}px)` : ''};
      transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      width: ${theme.typography.baseSize * theme.typography.lineHeight}px;
    }
    ${Label} {
      color: ${isDisabled ? palette.lightGray : palette.black};
      font-size: ${theme.typography.baseSize}px;
      line-height: ${theme.typography.lineHeight};
      margin-left: ${theme.spacing.unit * 2}px;
    }
  `,
};

export default function defaultTheme(parentTheme = {}) {
  return extendThemeWith(parentTheme)(theme);
}

function calculateAvatarSize({ theme }) {
  return (theme.typography.baseSize * theme.typography.lineHeight) + (theme.spacing.unit * 3) + avatarBorderSize;
}
