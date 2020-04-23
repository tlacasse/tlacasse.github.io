"use strict";

/**
 * document.getElementById(id)
 * @param {string} id
 */
function get(id) {
    return document.getElementById(id);
}

/**
 * Non breaking space (n times). for mithril
 * @param {number} n
 */
function nbsps(n) {
    var result = '';
    for (var i = 0; i < n; i++) {
        result += '\u00A0'
    }
    return result;
}

/**
 * Non breaking space.
 */
function nbsp() {
    return nbsps(1);
}

String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
};

var API = {};

API._get = function (url, success, block) {
    if (block) {
        App.wait();
    }
    m.request({
        method: 'GET',
        dataType: 'jsonp',
        url: url,
    }).then(function (data) {
        App.reenable();
        success(data);
    }).catch(function (e) {
        App.reenable();
    });
}

/**
 * Synchronous (blocks screen) get.
 * @param {any} url
 * @param {any} success callback
 */
API.get = function (url, success) {
    API._get(url, success, true);
}

/**
 * Asynchronous (does not block screen) get.
 * @param {any} url
 * @param {any} success callback
 */
API.aget = function (url, success) {
    API._get(url, success, false);
}

﻿
var Art = {};

Art.view = function () {
    return m('div', 'Paintings');
}

﻿var Home = {};

Home.view = function () {
    return m(m.route.Link, { href: '/art' }, 'Paintings');
}

﻿
var root = document.getElementById('page');

m.route.prefix = '?';

m.route(root, '/home', {
    '/home': Home,
    '/art': Art,
});

var Root = {};

/**
 * Block screen.
 */
Root.wait = function () {
    get('wall').style.display = 'block';
}

/**
 * Unblock screen.
 */
Root.reenable = function () {
    get('wall').style.display = 'none';
}

