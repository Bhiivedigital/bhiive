// Local development — Strapi running via `npm run develop` / `npm run start`.
// cmsUrl is empty so CMS calls stay same-origin ('/api/...', '/uploads/...') and
// are forwarded to localhost:1337 by proxy.conf.json. Keeps ngrok / LAN mobile
// testing working: no mixed-content block and no CORS preflight.
export const environment = {
  production: false,
  cmsUrl: '',
};
