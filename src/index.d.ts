declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
  duoshuoQuery:any
  webkitScrollbar:any
}

interface ShouldAssertion {
    Promise(): ShouldAssertion;
    fulfilled(): ShouldAssertion;
    rejected(): ShouldAssertion;
    rejectedWith(message: (string | Function | RegExp), properties?: Object): ShouldAssertion;
    rejectedWith(message: Object): ShouldAssertion;
    finally: ShouldAssertion;
    eventually: ShouldAssertion;
}