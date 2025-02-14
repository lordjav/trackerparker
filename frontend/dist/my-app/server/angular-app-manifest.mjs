
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
['index.csr.html', {size: 23710, hash: '8e6733af744c225f6f62cc465eddb47893cab6a91be7269473009620a134a4e3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 17208, hash: 'f6f22867faf7d0bfc5211210c50ba85d897455bc6c4a6bd9cdb7dbd0d625179b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['styles-OILV2R5R.css', {size: 7084, hash: 'fcX55X825z4', text: () => import('./assets-chunks/styles-OILV2R5R_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
