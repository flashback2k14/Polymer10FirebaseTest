/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  var info_toast = null;
  var user_Id = undefined;
  var userName = undefined;

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');

    info_toast = document.querySelector('#toast-info');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // Ensure the drawer is hidden on desktop/tablet
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    drawerPanel.forceNarrow = true;
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.showLogoutMessage = function() {
    info_toast.text = "Logging out...";
    info_toast.toggle();

    var rootRef = new Firebase("https://glaring-heat-4928.firebaseio.com/");
    rootRef.unauth();
    user_Id = undefined;
    userName = undefined;
  };

  app.setUserId = function(value) {
    if (user_Id !== value) user_Id = value;
  };

  app.getUserId = function() {
    return user_Id;
  };

  app.setUsername = function(value) {
    if (userName !== value) userName = value;
  }

  app.getUsername = function () {
    return userName;
  }

})(document);
