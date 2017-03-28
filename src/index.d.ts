
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
  webkitScrollbar:any
  decodeURIComponent:any
  mdIt:any
  rootUrl:string
  jQuery:any
  $:any
  one:{
    site:any
    theme:any
  }
}

declare function unescape(a:string):string

interface ShouldAssertion {
    Promise(): ShouldAssertion;
    fulfilled(): ShouldAssertion;
    rejected(): ShouldAssertion;
    rejectedWith(message: (string | Function | RegExp), properties?: Object): ShouldAssertion;
    rejectedWith(message: Object): ShouldAssertion;
    finally: ShouldAssertion;
    eventually: ShouldAssertion;
}