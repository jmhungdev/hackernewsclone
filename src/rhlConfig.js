import { setConfig } from 'react-hot-loader';


setConfig({
  logLevel: 'error', // ['debug', 'log', 'warn', 'error']
  pureSFC: false,
  ignoreSFC: true, // RHL will be __completely__ disabled for SFC (this will fix hook)
  pureRender: true // RHL will not change render method (this will remove side effect from Classes)
  // reloadHooks: false // enables or disables hooks reloading
});


/**
 * https://github.com/gaearon/react-hot-loader#setconfigconfig
 * https://github.com/gaearon/react-hot-loader/blob/master/index.d.ts#L62-L133
 */
