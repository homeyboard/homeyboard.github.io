/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-54d0af47'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "_app/immutable/assets/_layout.671f5215.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/0.08c03cd2.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/StoreDialog.6c80fa96.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/alerting.aeabfc87.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/AthomCloudAPI.75f5d69d.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/DashboardListHero.89d47a8e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/editing.4c31298d.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/favorite.c2c4616e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/HomeyAPIV3Local.5898e255.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.b52a7f1f.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/localstorage.672ead33.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/navigation.6eae7c83.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.60b963d6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/scheduler.eb13839d.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.2584eb3f.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/StoreDialog.134a2e47.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/stores.ea1ed521.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/utils.01552eec.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/virtual_pwa-register.7728e411.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.8a799e1d.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.3c525cf8.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.b2348ea2.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.0a0852ce.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.cd73d9a0.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.ce047d18.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.0596be5b.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/4.0e841dfd.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/5.dc2323df.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/6.c1033e24.js",
    "revision": null
  }, {
    "url": "128.png",
    "revision": "9f509af107c6134dd6102b90cd3607e0"
  }, {
    "url": "256.png",
    "revision": "48c5d5acfeb4b1db243b6835e026ba8b"
  }, {
    "url": "32.png",
    "revision": "cdedcfc65ba5cec06df1f4a162530b10"
  }, {
    "url": "512.png",
    "revision": "4a41d63f4202b26b11b5c74b4f11c53a"
  }, {
    "url": "64.png",
    "revision": "0ce03b488014cd965595d37f63708d5a"
  }, {
    "url": "favicon.svg",
    "revision": "d41aaf173a02e96aadd984a64e10df3b"
  }, {
    "url": "board",
    "revision": "092287412efd888da9085aa844900663"
  }, {
    "url": "favorite",
    "revision": "092287412efd888da9085aa844900663"
  }, {
    "url": "/",
    "revision": "6c655ff492b5dee9d6bc1d632bbc3d42"
  }, {
    "url": "oauth2/callback",
    "revision": "743e3bf3d9af60599d7e8fbcd769a322"
  }, {
    "url": "template",
    "revision": "092287412efd888da9085aa844900663"
  }, {
    "url": "manifest.webmanifest",
    "revision": "55ca7a1572dc825286f4dcd2ba68196c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/")));

}));
