
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 1,
    "route": "/register"
  },
  {
    "renderMode": 1,
    "route": "/parking-lot"
  },
  {
    "renderMode": 1,
    "route": "/parking-lot/*"
  },
  {
    "renderMode": 1,
    "route": "/membership"
  },
  {
    "renderMode": 1,
    "route": "/membership/*"
  },
  {
    "renderMode": 1,
    "route": "/history"
  },
  {
    "renderMode": 1,
    "route": "/settings"
  },
  {
    "renderMode": 1,
    "route": "/login"
  },
  {
    "renderMode": 1,
    "redirectTo": "/register",
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/**"
  }
],
  assets: new Map([
['index.csr.html', {size: 23710, hash: '7f696ce1c90d7928d34c8bfc1fae859f2883a1997142af486442857805239488', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 17208, hash: 'a0d32dead057ae03909e2afad96ee7db64931a37f395fe5e7c85b0d42767009f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['styles-OILV2R5R.css', {size: 7084, hash: 'fcX55X825z4', text: () => import('./assets-chunks/styles-OILV2R5R_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
