## Enabling Analytics with Custom Components

Analytics events can also be configured and fired for any, non-verdigris, component. As an example, we will create a `SaveButton` component that is not using the verdigris `Button` component.

Given a custom, non-verdigris component:

```javascript
const SaveButton = ({ onClick }) => {
  const handleClick = evt => {
    onClick(evt);
  };

  return (
    <button onClick={handleClick}>Save</button>
  );
};
```

In order to enable the creation of an analytics event, we can leverage the `withAnalytics` HoC. This will inject a `createAnalyticsEvent` function as a property to our `SaveButton` component. We can use the injected prop function to create analytics events and either fire them immediately:

```javascript
import { withAnalytics } from '@verdigris/analytics';

const SaveButton = ({ createAnalyticsEvent, onClick }) => {
  const handleClick = evt => {
    const analyticsEvent = createAnalyticsEvent({ action: 'save' });
    const channel = '*';
    analyticsEvent.fire(channel);

    onClick(evt);
  };

  return (
    <button onClick={handleClick}>Save</button>
  );
};

const SaveButtonWithAnalytics = withAnalytics()(SaveButton);
```

Or pass them to an event handler callback to be fired by a parent component:

```javascript
import { withAnalytics } from '@verdigris/analytics';

const SaveButton = ({ createAnalyticsEvent, onClick }) => {
  const handleClick = evt => {
    const analyticsEvent = createAnalyticsEvent({ action: 'save' });

    onClick(evt, analyticsEvent);
  };

  return (
    <button onClick={handleClick}>Save</button>
  );
};

const SaveButtonWithAnalytics = withAnalytics()(SaveButton);
```
