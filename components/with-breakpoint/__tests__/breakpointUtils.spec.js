import { isBreakpointDown, isBreakpointUp } from '../src/breakpointUtils';

describe('isBreakpointUp', () => {
  test('returns true if the breakpoint is larger or equal to the target breakpoint', () => {
    expect(isBreakpointUp('sm', 'lg')).toBeTruthy();
    expect(isBreakpointUp('sm', 'sm')).toBeTruthy();
  });
  test('returns false if the breakpoint is smaller than the target breakpoint', () => {
    expect(isBreakpointUp('lg', 'sm')).toBeFalsy();
  });
  test('specifying an inclusive value of false will return false if breakpoint is equal to the target breakpoint', () => {
    expect(isBreakpointUp('lg', 'lg', false)).toBeFalsy();
  });
});

describe('isBreakpointDown', () => {
  test('returns true if the breakpoint is smaller or equal to the target breakpoint', () => {
    expect(isBreakpointDown('lg', 'sm')).toBeTruthy();
    expect(isBreakpointDown('sm', 'sm')).toBeTruthy();
  });
  test('returns false if the breakpoint is larger than the target breakpoint', () => {
    expect(isBreakpointDown('sm', 'lg')).toBeFalsy();
  });
  test('specifying an inclusive value of false will return false if breakpoint is equal to the target breakpoint', () => {
    expect(isBreakpointDown('lg', 'lg', false)).toBeFalsy();
  });
});
