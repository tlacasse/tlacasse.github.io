
var root = document.getElementById('page');

m.route.prefix = '?';

m.route(root, '/home', {
    '/home': Home,
    '/art': Art,
    '/thesis': Thesis,
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
