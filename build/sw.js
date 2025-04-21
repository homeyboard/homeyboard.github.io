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
    "url": "_app/immutable/assets/_layout.4d9ee6d7.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/0.f2a1642e.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/StoreDialog.6c80fa96.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/alerting.6c127aa6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/AthomCloudAPI.75f5d69d.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/DashboardListHero.7cece5e0.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/editing.0bdfa4bc.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/favorite.3a5032e5.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/HomeyAPIV3Local.b77a0e5a.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.20c35f04.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/localstorage.379dfb0c.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/navigation.93be9e73.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.60b963d6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/scheduler.a7fc7cea.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.e168a4d6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/StoreDialog.6cc8aef8.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/stores.fdf73280.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/utils.3c8237ea.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/v4.eedf8624.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/virtual_pwa-register.7728e411.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.8a799e1d.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.759a947f.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.79fcee0c.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.147c7014.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.4c2077fa.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.e5a445e2.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.2045a5b4.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/4.be540185.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/5.19fb5072.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/6.106c1359.js",
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
    "revision": "27ca6ff33142150b55449a6a4522d35f"
  }, {
    "url": "favorite",
    "revision": "27ca6ff33142150b55449a6a4522d35f"
  }, {
    "url": "/",
    "revision": "677cbc163eca76e66c66227d08c5c7ae"
  }, {
    "url": "oauth2/callback",
    "revision": "398d837ebdcad2aea9c97bbf26d25ba1"
  }, {
    "url": "template",
    "revision": "27ca6ff33142150b55449a6a4522d35f"
  }, {
    "url": "manifest.webmanifest",
    "revision": "55ca7a1572dc825286f4dcd2ba68196c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/")));

}));
