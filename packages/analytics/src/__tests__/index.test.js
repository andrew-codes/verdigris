import { AnalyticsListener, withAnalytics } from '../';
import SrcAnalyticsListener from '../AnalyticsListener';
import SrcwithAnalytics from '../withAnalytics';

test('an AnalyticsListener is exported', () => {
  expect(AnalyticsListener).toEqual(SrcAnalyticsListener);
});
test('withAnalyticsListener is exported', () => {
  expect(withAnalytics).toEqual(SrcwithAnalytics);
});
