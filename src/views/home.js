var Home = {};

Home.view = function () {
    return m('ul', [
        m('li', m(m.route.Link, { href: '/art' }, 'Paintings')),
        m('li', m(m.route.Link, { href: '/thesis' }, 'Thesis')),
    ]);
}
