export default class UIAnalyticsEvent {
  constructor(props) {
    this.payload = props.payload;
    this.context = props.context || [];
    this.handlers = props.handlers || [];
    this.hasFired = false;
  }
}
