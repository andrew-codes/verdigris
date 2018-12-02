import { keys as breakpointKeys } from './breakpoints';

export const isBreakpointUp = (
  targetBreakpoint,
  breakpoint,
  inclusive = true,
) => {
  const target = breakpointKeys.indexOf(targetBreakpoint);
  const src = breakpointKeys.indexOf(breakpoint);
  if (inclusive) {
    return target <= src;
  }
  return target < src;
};

export const isBreakpointDown = (
  targetBreakpoint,
  breakpoint,
  inclusive = true,
) => {
  const target = breakpointKeys.indexOf(targetBreakpoint);
  const src = breakpointKeys.indexOf(breakpoint);
  if (inclusive) {
    return src <= target;
  }
  return src < target;
};
