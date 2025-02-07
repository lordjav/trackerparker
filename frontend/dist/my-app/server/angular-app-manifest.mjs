
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
['index.csr.html', {size: 27974, hash: '15bfea53a981f65792ed14f1c13468779f2ce9b16b71aeb681a944ab0d956cea', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 17260, hash: '0649909e5609313ac305a277201d784cc9439c1e3516eaba7ae91c1acc94effd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['styles-VPSC7UWD.css', {size: 238590, hash: '2uHIcGWPgT0', text: () => import('./assets-chunks/styles-VPSC7UWD_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
