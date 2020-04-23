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

Art.path = 'build/img/paintings/';

Art.images = [];

Art.createSlide = function (name) {
    var src = Art.path + name;
    return m('section',
        m('img', {
            src: src,
            alt: src,
            class: 'art-img',
        })
    );
}

Art.addSlide = function (name, additional) {
    Art.images.push(Art.path + name);
    if (additional === null) {
        return Art.createSlide(name);
    } else {
        var sections = [Art.createSlide(name)];
        for (var i = 0; i < additional.length; i++) {
            sections.push(Art.createSlide(additional[i]));
        }
        return m('section', sections);
    }
}

Art.slides = function () {
    var wipself = [];
    for (var i = 1; i <= 12; i++) {
        wipself.push('wipself/wipself' + String(i) + '.png');
    }
    return [
        Art.addSlide('colorferns.png', null),
        Art.addSlide('torus.png', null),
        Art.addSlide('plants.jpg', null),
        Art.addSlide('self.jpg', wipself),
        Art.addSlide('circles.jpg', null),
        Art.addSlide('towels.jpg', null),
        Art.addSlide('bwblocks.png', null),
        Art.addSlide('seascape.png', null),
        Art.addSlide('flower.png', null),
        Art.addSlide('dragonfly.png', null),
        Art.addSlide('cubeself.jpg', null),
        Art.addSlide('impression.jpg', null),
        Art.addSlide('hands.jpg', null),
    ];
}

Art.setBackground = function (imgnum) {
    var style = 'rgba(0, 0, 0, 0.5)';
    style = "linear-gradient(" + style + "," + style + ")";
    style += ", url('" + Art.images[imgnum] + "')";
    document.body.style.background = style;
}

Art.view = function () {
    return m('div', { class: 'slides' }, Art.slides());
}

Art.oncreate = function () {
    Reveal.initialize({
        hash: true,
        dependencies: [
            { src: 'build/framework/plugin/highlight/highlight.js' },
            { src: 'build/framework/plugin/zoom-js/zoom.js', async: true },
            { src: 'build/framework/plugin/notes/notes.js', async: true },
        ]
    });
    Reveal.addEventListener('slidechanged', function (event) {
        Art.setBackground(event.indexh);
    });
    Art.setBackground(0);
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

////////////////////////////////////////////////////////////////

