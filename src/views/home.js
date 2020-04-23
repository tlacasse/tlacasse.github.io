var Home = {};

Home.view = function () {
    return m(m.route.Link, { href: '/art' }, 'Paintings');
}
