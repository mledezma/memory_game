importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "css/styles.css",
    "revision": "dd9ab9427ae670d53ce110a363b92ac6"
  },
  {
    "url": "img/btn-reset.svg",
    "revision": "e3dcc699427e2e860bb9de7752e4cd0e"
  },
  {
    "url": "img/card-sample.jpg",
    "revision": "e1dbcf008ae6df2302b3e169bc562465"
  },
  {
    "url": "img/card-upside-down.svg",
    "revision": "759f0dacaae755b398c860514ce12e13"
  },
  {
    "url": "img/cards/1.jpg",
    "revision": "4e1be6bac1d4f727909d775bf7428361"
  },
  {
    "url": "img/cards/10.jpg",
    "revision": "a9e27a9482f97f69d0d098f23f4ae0f0"
  },
  {
    "url": "img/cards/2.jpg",
    "revision": "ee380ca343554b5f6c67d1180259bac2"
  },
  {
    "url": "img/cards/3.jpg",
    "revision": "e1dbcf008ae6df2302b3e169bc562465"
  },
  {
    "url": "img/cards/4.jpg",
    "revision": "2a794f377612e221462b9c23d7f52e34"
  },
  {
    "url": "img/cards/5.jpg",
    "revision": "a1c6ddefa957b1aae1ab55205b01825d"
  },
  {
    "url": "img/cards/6.jpg",
    "revision": "232a5ae19f2c7e1a5e637180c6bc5f80"
  },
  {
    "url": "img/cards/7.jpg",
    "revision": "a24524b0445bf42b85ad7fc0d7bf1eda"
  },
  {
    "url": "img/cards/8.jpg",
    "revision": "50266f1b2d4af8e9378acdc1883207dc"
  },
  {
    "url": "img/cards/9.jpg",
    "revision": "de2043faef68b169f139d705c423fce5"
  },
  {
    "url": "img/cards/card-sample.jpg",
    "revision": "e1dbcf008ae6df2302b3e169bc562465"
  },
  {
    "url": "img/icon-1x.jpg",
    "revision": "520f6ea7ab669ef99b4326d8edee82d0"
  },
  {
    "url": "img/icon-2x.jpg",
    "revision": "2c65fa55faf1faf9de631ebc9d8f4cf1"
  },
  {
    "url": "img/icon-4x.jpg",
    "revision": "336d83159acf2a5c09d0c9575ebc1e26"
  },
  {
    "url": "img/logo.svg",
    "revision": "537339d1200c76cfeeb3123ff93bccf8"
  },
  {
    "url": "index.html",
    "revision": "8018a1f1d5ec8bdae7fe70fcb65a6755"
  },
  {
    "url": "js/main.js",
    "revision": "b066d136efc46cbbc21b06a4c95ab867"
  },
  {
    "url": "manifest.json",
    "revision": "9362ea55e05aa16b2ca325248a67ac77"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
