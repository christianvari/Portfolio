/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "1bfc9850-56e4f3f0631d5800382d.js"
  },
  {
    "url": "1bfc9850-56e4f3f0631d5800382d.js.map",
    "revision": "48835e7a508e96ee9d3645fb4f2c4ef7"
  },
  {
    "url": "252f366e-2feb8c50a69d66a75e8f.js"
  },
  {
    "url": "252f366e-2feb8c50a69d66a75e8f.js.map",
    "revision": "9f39167466662eaa4b821e8bd75fb503"
  },
  {
    "url": "404.html",
    "revision": "a1674427c714a1902131f5df2d1b7dca"
  },
  {
    "url": "404/index.html",
    "revision": "5b8a5c781c35a641774952d12331fdf4"
  },
  {
    "url": "95b64a6e-bb41279d15d402a5f8f8.js"
  },
  {
    "url": "95b64a6e-bb41279d15d402a5f8f8.js.map",
    "revision": "b2825fdc59b199e2f04a9d5f79a889c5"
  },
  {
    "url": "app-8e050270b400f15960d3.js"
  },
  {
    "url": "app-8e050270b400f15960d3.js.map",
    "revision": "fc4556636d36196e97d3d1c38b62fd0a"
  },
  {
    "url": "chunk-map.json",
    "revision": "9aa173b2af7df76295df1b8a3dc18086"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-5a1ee105f05b3144b807.js"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-5a1ee105f05b3144b807.js.map",
    "revision": "33c532a785c69768b20d5d80ea6bec8b"
  },
  {
    "url": "component---src-pages-404-js-ecb8928078486b8a7e43.js"
  },
  {
    "url": "component---src-pages-404-js-ecb8928078486b8a7e43.js.map",
    "revision": "a10f407e7e8af8106b31ae70044f7bae"
  },
  {
    "url": "component---src-pages-index-js-77ba52a07a2df7889ff5.js"
  },
  {
    "url": "component---src-pages-index-js-77ba52a07a2df7889ff5.js.map",
    "revision": "bd13c0f373029fa4240d7ae174f540e1"
  },
  {
    "url": "d7eeaac4-28e42cdd6f8dea74afe1.js"
  },
  {
    "url": "d7eeaac4-28e42cdd6f8dea74afe1.js.map",
    "revision": "3867fd3e7dcd1397c57235aed18265bd"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "680a3c1a3f435c21ee37479f0a13d6f3"
  },
  {
    "url": "framework-a7bb16c5c6afeed647b2.js"
  },
  {
    "url": "framework-a7bb16c5c6afeed647b2.js.map",
    "revision": "cedebc8e93c59efaa2af4d4c61652d0b"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "cf748794338b8e26b9756b71f7226e14"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "059f534e5d28981eb0c6d25371d472b7"
  },
  {
    "url": "icons/icon-256x256.png",
    "revision": "7ee636beb76f544a7c636e82ef7283c7"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "793155d5576c76033802ac881268bfc7"
  },
  {
    "url": "icons/icon-48x48.png",
    "revision": "e5dfbf6cb2422249041629818bc0f1de"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "bc758048fb6d90be40c2e05d880a4590"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "5f42deea82f717e9094bbb10887affba"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "52f2c375eacfae924d4a7b7f0e80063c"
  },
  {
    "url": "idb-keyval-3.2.0-iife.min.js"
  },
  {
    "url": "index.html",
    "revision": "ea75b935f1e98e433cf933cb7f4a3704"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "bfb5b7f24efdf8dabc158c2903591187"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "418aa97a1dc2adb75c4ddbe606fbcdd1"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "73b53c376c0c6df9ec96677d201cf94b"
  },
  {
    "url": "page-data/404/page-data.json",
    "revision": "517e1f8ce5610edb94d7dea4bede4428"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "8f0d25708d3a1c003d2bfb25b77020ad"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "7cba71afbfd84f34522872cb414eb0e8"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "f6081b83111aea4128c98944b7fafccc"
  },
  {
    "url": "polyfill-1623e8dfae5ff58e9a52.js"
  },
  {
    "url": "polyfill-1623e8dfae5ff58e9a52.js.map",
    "revision": "44f667e0a396ea338d0d1735b21ca31a"
  },
  {
    "url": "robots.txt",
    "revision": "f13848bae6c28da25a021221d2cea21b"
  },
  {
    "url": "sitemap.xml",
    "revision": "c0487cb9fd8c083a89a9d9bf486572da"
  },
  {
    "url": "static/059a1540e854d80138cfb38bea62c04c/559c9/hcl.png"
  },
  {
    "url": "static/059a1540e854d80138cfb38bea62c04c/767bb/hcl.png"
  },
  {
    "url": "static/059a1540e854d80138cfb38bea62c04c/804d1/hcl.webp"
  },
  {
    "url": "static/059a1540e854d80138cfb38bea62c04c/8a409/hcl.png"
  },
  {
    "url": "static/059a1540e854d80138cfb38bea62c04c/e8cf1/hcl.webp"
  },
  {
    "url": "static/059a1540e854d80138cfb38bea62c04c/fa51b/hcl.webp"
  },
  {
    "url": "static/3500eb903f7a9c057b45b789cfc5da63/0aa94/web.webp"
  },
  {
    "url": "static/3500eb903f7a9c057b45b789cfc5da63/4c427/web.png"
  },
  {
    "url": "static/3500eb903f7a9c057b45b789cfc5da63/91664/web.png"
  },
  {
    "url": "static/3500eb903f7a9c057b45b789cfc5da63/c05ea/web.webp"
  },
  {
    "url": "static/3500eb903f7a9c057b45b789cfc5da63/e711a/web.webp"
  },
  {
    "url": "static/3500eb903f7a9c057b45b789cfc5da63/ff4be/web.png"
  },
  {
    "url": "static/394d4a6d64b33c86aa71e6ec7896c283/0aa94/nodejs.webp"
  },
  {
    "url": "static/394d4a6d64b33c86aa71e6ec7896c283/4c427/nodejs.png"
  },
  {
    "url": "static/394d4a6d64b33c86aa71e6ec7896c283/91664/nodejs.png"
  },
  {
    "url": "static/394d4a6d64b33c86aa71e6ec7896c283/c05ea/nodejs.webp"
  },
  {
    "url": "static/394d4a6d64b33c86aa71e6ec7896c283/e711a/nodejs.webp"
  },
  {
    "url": "static/394d4a6d64b33c86aa71e6ec7896c283/ff4be/nodejs.png"
  },
  {
    "url": "static/3afb5a499062c7582791a16f967c51cc/0aa94/python.webp"
  },
  {
    "url": "static/3afb5a499062c7582791a16f967c51cc/4c427/python.png"
  },
  {
    "url": "static/3afb5a499062c7582791a16f967c51cc/91664/python.png"
  },
  {
    "url": "static/3afb5a499062c7582791a16f967c51cc/c05ea/python.webp"
  },
  {
    "url": "static/3afb5a499062c7582791a16f967c51cc/e711a/python.webp"
  },
  {
    "url": "static/3afb5a499062c7582791a16f967c51cc/ff4be/python.png"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/0756a/selfie-boy.png"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/2cd0c/selfie-boy.png"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/34b62/selfie-boy.webp"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/61fd6/selfie-boy.png"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/62915/selfie-boy.png"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/7f8e9/selfie-boy.webp"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/a3e81/selfie-boy.webp"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/bc59e/selfie-boy.png"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/cbc07/selfie-boy.webp"
  },
  {
    "url": "static/557611a13ab6dfc07b7c78e198db3f42/cde37/selfie-boy.webp"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/1f5c5/reactive-resume.webp"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/2a4de/reactive-resume.png"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/497c6/reactive-resume.png"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/58556/reactive-resume.webp"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/61e93/reactive-resume.webp"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/65e33/reactive-resume.png"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/69585/reactive-resume.png"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/9cf1d/reactive-resume.png"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/ad85c/reactive-resume.webp"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/d1f52/reactive-resume.webp"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/d8298/reactive-resume.webp"
  },
  {
    "url": "static/6930451eeae675efb0d796b40cf6e708/ee604/reactive-resume.png"
  },
  {
    "url": "static/7268e8ad3f7ebbc25b2736ba14e2a666/0aa94/database.webp"
  },
  {
    "url": "static/7268e8ad3f7ebbc25b2736ba14e2a666/4c427/database.png"
  },
  {
    "url": "static/7268e8ad3f7ebbc25b2736ba14e2a666/91664/database.png"
  },
  {
    "url": "static/7268e8ad3f7ebbc25b2736ba14e2a666/c05ea/database.webp"
  },
  {
    "url": "static/7268e8ad3f7ebbc25b2736ba14e2a666/e711a/database.webp"
  },
  {
    "url": "static/7268e8ad3f7ebbc25b2736ba14e2a666/ff4be/database.png"
  },
  {
    "url": "static/78ef24a24e913217c75179cd02260e5e/0aa94/ether.webp"
  },
  {
    "url": "static/78ef24a24e913217c75179cd02260e5e/4c427/ether.png"
  },
  {
    "url": "static/78ef24a24e913217c75179cd02260e5e/91664/ether.png"
  },
  {
    "url": "static/78ef24a24e913217c75179cd02260e5e/c05ea/ether.webp"
  },
  {
    "url": "static/78ef24a24e913217c75179cd02260e5e/e711a/ether.webp"
  },
  {
    "url": "static/78ef24a24e913217c75179cd02260e5e/ff4be/ether.png"
  },
  {
    "url": "static/8e0b048da80c2cdab277bc72f5448b46/0aa94/android.webp"
  },
  {
    "url": "static/8e0b048da80c2cdab277bc72f5448b46/4c427/android.png"
  },
  {
    "url": "static/8e0b048da80c2cdab277bc72f5448b46/91664/android.png"
  },
  {
    "url": "static/8e0b048da80c2cdab277bc72f5448b46/c05ea/android.webp"
  },
  {
    "url": "static/8e0b048da80c2cdab277bc72f5448b46/e711a/android.webp"
  },
  {
    "url": "static/8e0b048da80c2cdab277bc72f5448b46/ff4be/android.png"
  },
  {
    "url": "static/99c2d9bc924675040006d9d550599046/aff39/cannizzaro.png"
  },
  {
    "url": "static/99c2d9bc924675040006d9d550599046/c1598/cannizzaro.png"
  },
  {
    "url": "static/99c2d9bc924675040006d9d550599046/ea22a/cannizzaro.png"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/0756a/photo.png"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/34b62/photo.webp"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/61fd6/photo.png"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/62915/photo.png"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/65a43/photo.webp"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/6dbd7/photo.png"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/7f8e9/photo.webp"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/a3e81/photo.webp"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/a8378/photo.png"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/bc59e/photo.png"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/cc834/photo.webp"
  },
  {
    "url": "static/c1c0498ad09b2d1f958ce54fccd0c4ca/cde37/photo.webp"
  },
  {
    "url": "static/cab1cc5f5a5b808ac10b3a6d4c5a78aa/aff39/tor_vergata.png"
  },
  {
    "url": "static/cab1cc5f5a5b808ac10b3a6d4c5a78aa/c1598/tor_vergata.png"
  },
  {
    "url": "static/cab1cc5f5a5b808ac10b3a6d4c5a78aa/ea22a/tor_vergata.png"
  },
  {
    "url": "static/cda5dfb7b0b46b996ee7ac7894c1380b/0b7e8/logo.webp"
  },
  {
    "url": "static/cda5dfb7b0b46b996ee7ac7894c1380b/62cc5/logo.webp"
  },
  {
    "url": "static/cda5dfb7b0b46b996ee7ac7894c1380b/adbdf/logo.webp"
  },
  {
    "url": "static/cda5dfb7b0b46b996ee7ac7894c1380b/cf62c/logo.jpg"
  },
  {
    "url": "static/cda5dfb7b0b46b996ee7ac7894c1380b/daaa8/logo.jpg"
  },
  {
    "url": "static/cda5dfb7b0b46b996ee7ac7894c1380b/ffcc9/logo.jpg"
  },
  {
    "url": "static/d/1003640200.json"
  },
  {
    "url": "static/d/1092668639.json"
  },
  {
    "url": "static/d/1200720306.json"
  },
  {
    "url": "static/d/1966494172.json"
  },
  {
    "url": "static/d/2396307195.json"
  },
  {
    "url": "static/d/3313315525.json"
  },
  {
    "url": "static/d/3410293265.json"
  },
  {
    "url": "static/d/3413491366.json"
  },
  {
    "url": "static/d/3506755355.json"
  },
  {
    "url": "static/d/3961674297.json"
  },
  {
    "url": "static/d/4056429656.json"
  },
  {
    "url": "static/d/695964893.json"
  },
  {
    "url": "static/d/883961150.json"
  },
  {
    "url": "static/d2b59af39d0f3564d8325e0524f2387d/aff39/sapienza.png"
  },
  {
    "url": "static/d2b59af39d0f3564d8325e0524f2387d/c1598/sapienza.png"
  },
  {
    "url": "static/d2b59af39d0f3564d8325e0524f2387d/ea22a/sapienza.png"
  },
  {
    "url": "static/f0ce5624fc7e8b472e4d87faf002c0b1/0aa94/avr.webp"
  },
  {
    "url": "static/f0ce5624fc7e8b472e4d87faf002c0b1/4c427/avr.png"
  },
  {
    "url": "static/f0ce5624fc7e8b472e4d87faf002c0b1/91664/avr.png"
  },
  {
    "url": "static/f0ce5624fc7e8b472e4d87faf002c0b1/c05ea/avr.webp"
  },
  {
    "url": "static/f0ce5624fc7e8b472e4d87faf002c0b1/e711a/avr.webp"
  },
  {
    "url": "static/f0ce5624fc7e8b472e4d87faf002c0b1/ff4be/avr.png"
  },
  {
    "url": "styles-89fd2ae28bdf06750a71.js"
  },
  {
    "url": "styles-89fd2ae28bdf06750a71.js.map",
    "revision": "50a943b8a40210b91a33534f76345165"
  },
  {
    "url": "styles.13f4cf9128db59d55e6b.css"
  },
  {
    "url": "webpack-runtime-590ca9bff708d4f5dc14.js"
  },
  {
    "url": "webpack-runtime-590ca9bff708d4f5dc14.js.map",
    "revision": "bc8c6ab40b2cf6599ec71bcb40bdc3da"
  },
  {
    "url": "webpack.stats.json",
    "revision": "eb37c791edc868854ae8b54fd912bf91"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/app-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^/Portfolio`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/Portfolio/app-8e050270b400f15960d3.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/Portfolio/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
