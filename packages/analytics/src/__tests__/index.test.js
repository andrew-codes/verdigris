import { AnalyticsContext, AnalyticsListener, withAnalytics } from '../';
import SrcAnalyticsListener from '../AnalyticsListener';
import SrcwithAnalytics from '../withAnalytics';
import SrcAnalyticsContext from '../AnalyticsContext';

test('an AnalyticsListener component is exported', () => {
  expect(AnalyticsListener).toEqual(SrcAnalyticsListener);
});
test('withAnalyticsListener function is exported', () => {
  expect(withAnalytics).toEqual(SrcwithAnalytics);
});
test('an AnalyticsContext component is exported', () => {
  expect(AnalyticsContext).toEqual(SrcAnalyticsContext);
});
