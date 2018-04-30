import UIAnalyticsEvent from '../UIAnalyticsEvent';

let handler1;
let handler2;
let eventArg;
beforeEach(() => {
  handler1 = jest.fn();
  handler2 = jest.fn();
  eventArg = {
    payload: { action: 'some action' },
    context: [{ product: 'a product' }, { location: 'some location' }],
    handlers: [handler1, handler2],
  };
});

test('is constructed with both action and payload args', () => {
  const analyticsEvent = new UIAnalyticsEvent({
    payload: { action: 'some action' },
  });
  expect(analyticsEvent).toEqual(expect.any(UIAnalyticsEvent));
  expect(analyticsEvent.payload).toEqual({ action: 'some action' });
  expect(analyticsEvent.context).toEqual([]);
  expect(analyticsEvent.handlers).toEqual([]);
});

test('can be constructed with optional arguments', () => {
  const analyticsEvent = new UIAnalyticsEvent(eventArg);
  expect(analyticsEvent).toEqual(expect.any(UIAnalyticsEvent));
  expect(analyticsEvent.payload).toEqual({ action: 'some action' });
  expect(analyticsEvent.context).toEqual(eventArg.context);
  expect(analyticsEvent.handlers).toEqual(eventArg.handlers);
});

test('executes all handlers when fired without a channel', () => {
  const analyticsEvent = new UIAnalyticsEvent(eventArg);

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  analyticsEvent.fire();
  expect(handler1).toHaveBeenCalledWith(analyticsEvent, undefined);
  expect(handler2).toHaveBeenCalledWith(analyticsEvent, undefined);
});

test('executes all handlers when fired with a specific channel', () => {
  const analyticsEvent = new UIAnalyticsEvent(eventArg);
  const channel = 'some channel';

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  analyticsEvent.fire(channel);
  expect(handler1).toHaveBeenCalledWith(analyticsEvent, channel);
  expect(handler2).toHaveBeenCalledWith(analyticsEvent, channel);
});

test('cannot be fired more than once', () => {
  const analyticsEvent = new UIAnalyticsEvent(eventArg);
  const channel = 'some channel';

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  analyticsEvent.fire(channel);
  analyticsEvent.fire(channel);
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
});
