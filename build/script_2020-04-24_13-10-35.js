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
        Root.wait();
    }
    m.request({
        method: 'GET',
        dataType: 'jsonp',
        url: url,
    }).then(function (data) {
        Root.reenable();
        success(data);
    }).catch(function (e) {
        Root.reenable();
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
    return m('ul', [
        m('li', m(m.route.Link, { href: '/art' }, 'Paintings')),
        m('li', m(m.route.Link, { href: '/thesis' }, 'Thesis')),
    ]);
}

﻿var Thesis = {};

Thesis.plotLayout = {
    hovermode: 'closest',
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
    },
};

Thesis.buildTsnePlot = function (container, datapath, dim, actualDim) {
    API.get(datapath, function (data) {
        function getDim(n) {
            return data.map(x => x[n]);
        }
        var points = {
            text: getDim(0),
            x: getDim(1),
            y: getDim(2),
            mode: 'markers',
            marker: {
                symbol: 'circle',
                size: 5,
                line: {
                    color: 'rgba(217, 217, 217, 0.5)',
                    width: 0.5
                },
                opacity: 1,
            },
        };

        if (actualDim === 3) {
            points.z = getDim(3);
            points.type = 'scatter3d';
            points.hoverinfo = 'x+y+z+text';
        } else {
            if (dim > actualDim) {
                points.z = getDim(0).map(_ => 0);
                points.type = 'scatter3d';
                points.hoverinfo = 'x+y+text';
            } else {
                points.type = 'scatter';
                points.hoverinfo = 'x+y+text';
            }
        }

        Plotly.newPlot(container, [points], Thesis.plotLayout);
    });
}

Thesis.slides = function () {
    var sp = nbsp(1);
    function cc(code) {
        return m('span.codenorm', code);
    }
    function ccbold(code) {
        return m('span.codebold', code);
    }
    function ccit(code) {
        return m('span.codeit', code);
    }
    function ccgreen(code) {
        return m('span.codegreen', code);
    }
    function ccblue(code) {
        return m('span.codeblue', code);
    }
    function ccorange(code) {
        return m('span.codeorange', code);
    }
    function cclite(code) {
        return m('span.codelite', code);
    }
    function span(text) {
        return m('span', text);
    }
    return [
        m('section', [
            m('p', 'Generative Modeling of a Continuous'),
            m('p', 'Premise-Conjecture Space'),
            m('br'),
            m('p', 'by Thomas Lacasse'),
            m('br'),
            m('p', 'Presentation for Honors Thesis, April 2020.'),
            m('br'),
            m('small', 'Navigate the slides using the arrows in the bottom right, or the arrow keys. Slides move up and down in addition to left and right.'),
        ]),
        m('section', m('p', '... well, the application needs some more work, but here we at least have the theory and ideas!')),
        m('section', [
            m('p', 'Overview'),
            m('ul', [
                m('li', 'Background'),
                m('li', 'Data'),
                m('li', 'Inspiration'),
                m('li', 'My Proposed Idea'),
                m('li', 'Etc'),
            ]),
        ]),
        m('section',
            m('section', m('table', [
                m('tr', [m('td', 'Generative'), m('td', '-'), m('td', 'Creating new information, not predicting')]),
                m('tr', [m('td', 'Modeling'), m('td', '-'), m('td', 'Machine Learning, representations of "reality"')]),
                m('tr', [m('td', 'of a'), m('td', ''), m('td', '')]),
                m('tr', [m('td', 'Continuous'), m('td', '-'), m('td', 'A mathematical function property, meaning small changes in the input cause small changes in the output')]),
            ])),
            m('section', m('table', [
                m('tr', [m('td', 'Premise'), m('td', '-'), m('td', 'Steps in a logical argument (mathematical proof)')]),
                m('tr', [m('td', 'Conjecture'), m('td', '-'), m('td', 'A statement we want to prove, the conclusion of the premises')]),
                m('tr', [m('td', 'Space'), m('td', '-'), m('td', 'A structured collection of elements')]),
            ])),
        ),
        m('section', [
            m('p', 'Can computers prove mathematical theorems?'),
            m('br'),
            m('p.fragment', 'Yes, there is research on efficiently proving theorems using machine learning.'),
            m('br'),
            m('p.fragment', [
                span('But instead of proving more and more, I am more interested in understanding and exploring '),
                m('span.emphasis', 'when'),
                span(' certain concepts may be used in a proof, and visualizing it.')
            ]),
        ]),
        m('section', 'Background'),
        m('section', [
            m('section', [
                m('p', 'Theorem. There are infinitely many primes.'),
                m('p', 'Consider the following proof: '),
                m('hr'),
                m('p.fragment', [
                    span('Suppose the set of all primes is finite: p'),
                    m('sub', '1'), span(', p'),
                    m('sub', '2'), span(', ..., p'),
                    m('sub', 'n'),
                    span('. Let M = p'),
                    m('sub', '1'),
                    span('p'), m('sub', '2'),
                    span('...p'), m('sub', 'n'),
                    span(' + 1 and let q be a prime that divides M. Then q can not be any of the p'),
                    m('sub', 'i'),
                    span(' otherwise q would divide M - p'),
                    m('sub', '1'),
                    span('p'), m('sub', '2'),
                    span('...p'), m('sub', 'n'),
                    span(' = 1. Thus q is another prime not found in the set of all primes. This contradicts our assumption that there are finitely many primes.'),
                ]),
            ]),
            m('section', [
                m('p', 'Proofs are logical arguments. Conjectures follow from or are implied by a series of premises in a valid proof.'),
                m('br'),
                m('p', 'Statements are either true or false. Premises are previously proven to be true, and we hope the series of true premises conclude with the conjecture being definitively true or false.'),
            ]),
            m('section', [
                m('p', [
                    span('The above proof is a '),
                    m('span.emphasis', 'formal proof'),
                    span(', written out in complete flowing sentences, in contrast to scratch notes or a couple lines of algebra.'),
                ]),
                m('br'),
                m('br'),
                m('p.fragment', [
                    span('We can go further...'),
                ]),
            ]),
            m('section', [
                m('div.codeblock', [
                    m('div.codeline', ccorange(':: WP:  The Irrationality of the Square Root of 2')),
                    m('div.codeline', [ccbold('theorem'), sp, ccit(ccgreen('Th1')), cc(':'), sp, ccorange(':: IRRAT_1: 1')]),
                    m('div.codeline', [nbsp(4), cc('for'), sp, cclite('p'), sp, cc('being'), sp, ccblue('Nat'), sp, cc('st'), sp, cclite('p'), sp, cc('is'), sp, ccblue('prime'), sp, cc('holds')]),
                    m('div.codeline', [nbsp(4), ccblue('sqrt'), sp, cclite('p'), sp, cc('is'), sp, ccblue('irrational')]),
                    m('div.codeline', ccbold('proof end;')),
                ]),
                m('br'),
                m('br'),
                m('smaller', m('a[href=http://www.mizar.org/version/current/html/irrat_1.html#T1]', { style: 'font-size:50%;' }, 'from here')),
            ]),
            m('section', [
                m('p', [
                    span('The above proof is '),
                    m('span.emphasis', 'formalized'),
                    span(' (not to be confused with formal above) to be computer readable and unambiguous.'),
                ]),
                m('br'),
                m('br'),
                span('(Notice similarities to programming languages? - keywords, highly structured syntax, etc)')
            ]),
            m('section', [
                m('p', 'Some concerns with formalization:'),
                m('ui', [
                    m('li', 'Most of our mathematical knowledge exists in books and papers over the years, and not in this computer readable form. Proofs must be intensively manually formalized.'),
                    m('li', 'Autoformalization is the automated process of such formalization.'),
                    m('li', 'There are multiple formalized math languages, which can not be easily translated.'),
                ])
            ]),
        ]),
        m('section', [
            m('section', [
                m('p', 'Computers use the formalized proof languages to prove theorems.'),
                m('br'),
                m('p', 'Theorem proving is essentially a searching problem, by searching through the massive space of different mathematical concepts and attempting to evaluate which steps could be combined into a valid proof.'),
                m('br'),
                m('p', 'There are two methods of theorem proving...')
            ]),
            m('section', [
                m('p', [
                    m('span.emphasis', 'Interactive Theorem Proving'),
                    span(' (ITP) is done through software called '),
                    m('span.emphasis', 'proof assistants '),
                    span('(examples include '),
                    m('a[href=https://isabelle.in.tum.de/]', 'Isabelle'),
                    span(' and '),
                    m('a[href=https://coq.inria.fr/]', 'Coq'),
                    span(')'),
                ]),
                m('br'),
                m('p', 'Humans work together with the software to complete or verify a proof.')
            ]),
            m('section', [
                m('p', [
                    m('span.emphasis', 'Automated Theorem Proving'),
                    span(' (ATP) attempts to prove theorems entirely automatically. This is our method of interest here.'),
                ]),
                m('br'),
                m('p', 'The formalized proof librarys of ITP systems may supply the data for ATP methods.'),
            ]),
            m('section', [
                m('p', 'Machine Learning has recently been applied to ATP to approximate functions of this difficult proof data.'),
                m('br'),
                m('p', 'The goal is to replicate the human intuition that goes into proof writing, in an effort reduce the proof search space.'),
                m('br'),
                m('p', 'There is research on models that evaluate the next proof step each step, but we will focus on a simpler task...')
            ]),
        ]),
        m('section', [
            m('section', [
                m('p', [
                    m('span.emphasis', 'Premise Selection'),
                    span(' is a specific task in ATP.'),
                ]),
                m('br'),
                m('br'),
                m('p', [
                    span('Definition (Premise Selection Problem)'),
                    m('span.emphasis', '. Given a set of premises P and a conjecture C, determine which elements p in P are most useful in proving C.'),
                ]),
            ]),
            m('section', [
                m('p', 'For example: Let P contain:'),
                m('ol', [
                    m('li', 'If n is prime then square root n is irrational.'),
                    m('li', 'The structure of a proof by contradiction: if some statement Q implies a contradiction, then not Q is true.'),
                    m('li', '... many others.'),
                ]),
                m('br'),
                m('p.fragment', 'If C is there are infinitely many primes, premise 2 would be considered useful, but not premise 1.'),
                m('p.fragment', 'If C is the irrationality of the square root of 2, premise 1 would be useful, but not premise 2.'),
            ]),
            m('section', [
                m('p', 'When given a new statement we want to prove, Premise Selection serves to replicate the initial intuition of mathematicians of determining which direction to try.'),
                m('br'),
                m('p', 'This significantly reduces the search space. Then the actual proof may be constructed by filling in the gaps.'),
            ]),
            m('section', [
                m('p', 'In practice, a premise selection model takes in an input of a conjecture representation and a premise representation, and the output is a number between 0 and 1, where 1 is useful and 0 is not useful. Multiple premises are evaluated with a single conjectures, and the premises are ranked to determine which are most useful.')
            ]),
            m('section', [
                m('p', 'A couple points:'),
                m('ul', [
                    m('li', 'In the data for model development, premises are identified as useful or not useful, based on if they were used in a proof to create the data.'),
                    m('li', 'Theorems may have many different proofs, but we generally only have one formalized proof to learn from. A not useful premise may be useful in a different proof, but we do not have the data for it.')
                ]),
            ]),
        ]),
        m('section', 'Data'),
        m('section', [
            m('section', [
                m('p', [
                    span('The '), m('span.emphasis', 'Mizar Mathematical Library'),
                    span(', a collection of theorems proven by the '),
                    m('a[href=http://mizar.org/]', ' Mizar system'),
                    span(' (a proof assistant).'),
                ]),
                m('br'),
                m('br'),
                m('p.fragment', 'Example: recall the irrationality of the square root of 2.'),
            ]),
            m('section', [
                m('div.codeblock', [
                    m('div.codeline', ccorange(':: WP:  The Irrationality of the Square Root of 2')),
                    m('div.codeline', [ccbold('theorem'), sp, ccit(ccgreen('Th1')), cc(':'), sp, ccorange(':: IRRAT_1: 1')]),
                    m('div.codeline', [nbsp(4), cc('for'), sp, cclite('p'), sp, cc('being'), sp, ccblue('Nat'), sp, cc('st'), sp, cclite('p'), sp, cc('is'), sp, ccblue('prime'), sp, cc('holds')]),
                    m('div.codeline', [nbsp(4), ccblue('sqrt'), sp, cclite('p'), sp, cc('is'), sp, ccblue('irrational')]),
                    m('div.codeline', ccbold('proof end;')),
                ]),
            ]),
        ]),
        m('section', [
            m('section', [
                m('p', [
                    m('span.emphasis', 'Holstep'),
                    span(' is a dataset designed for machine learning for ATP applications. Available '),
                    m('a[href=http://cl-informatik.uibk.ac.at/cek/holstep/]', 'here'),
                    span('. Holstep uses the '),
                    m('a[href=https://www.cl.cam.ac.uk/~jrh13/hol-light/]', 'HOL Light'),
                    span(' theorem prover.'),
                ]),
                m('br'),
                m('br'),
                m('p.fragment', 'Each file in the dataset is a conjecture and a list of premises (identified as useful or not useful), with text representations of each expression.'),
            ]),
            m('section', [
                m('p', 'Example: '),
                m('div.codeblock', [
                    m('div.codeline', 'N Ssrnat.subSS'),
                    m('div.codeline', 'C |- (!n. (!m. (((SUC m) - (SUC n)) = (m - n))))'),
                    m('div.codeline', '...'),
                    m('div.codeline', '+ |- ((m = n) = ((int_of_num m) = (int_of_num n)))'),
                    m('div.codeline', '+ |- ((T /\\ F) = F)'),
                    m('div.codeline', '- |- ((!n. ((n - n) = (NUMERAL _0))) = T)'),
                    m('div.codeline', '- |- ((t \\/ t) = t)'),
                    m('div.codeline', '...'),
                ]),
            ]),
            m('section', [
                m('p', 'Each line begins with a token identifying the type of line: '),
                m('ul', [
                    m('li', '"N" is the conjecture name'),
                    m('li', '"C" is the conjecture expression'),
                    m('li', '"+" is a useful premise, with its expression'),
                    m('li', '"-" is a non-useful premise, with its expression'),
                ]),
            ]),
        ]),
        m('section', [
            m('p', 'Only Holstep was used for my work, for a couple main reasons: '),
            m('ul', [
                m('li', 'The designed nature of the dataset has clearly defined units of information: the conjectures and the premises (along with their usefulness).'),
                m('li', 'The language is more clearly structured, and is easier to parse.')
            ]),
        ]),
        m('section', 'Inspiration'),
        m('section', [
            m('section', [
                m('p.emphasis', 'Generative Modeling'),
                m('br'),
                m('p', 'In contrast to predictive modeling, which simply aims to be more accurate, generative modeling aims to replicate how data is constructed and generated.'),
                m('br'),
                m('p', 'Much of the success has been on the common and intuitive domain of images, where models have been able generate realistic data.'),
            ]),
            m('section', [
                m('p', 'Among the types of generative models are: '),
                m('ul', [
                    m('li', 'Generative Adversarial Networks (GANs)'),
                    m('li', 'Variational Autoencoders (VAEs)'),
                ]),
            ]),
            m('section', [
                span('For GANs, we can see '),
                m('a[href=https://www.youtube.com/results?search_query=nvidia+gans]', 'all these incredible creations'),
                span('.'),
            ]),
            m('section', [
                m('p', [
                    span('For VAEs, look at this visualization of the "'),
                    m('span.emphasis', 'latent space'),
                    span('" on MNIST handwritten digits data:'),
                ]),
                m('img', { src: 'build/img/thesis/vae_mnist.png', style: 'height:60vh;' }),
            ]),
            m('section', [
                m('p', 'Notice how we see small changes between digits, and see the position of digits in space in relation to the others.'),
                m('br'),
                m('p', 'This is not just determining which digit is shown.')
            ]),
            m('section', 'Can these concepts apply to theorem proving?'),
        ]),
        m('section', 'My Proposed Idea'),
        m('section', [
            m('section', [
                m('p', [
                    span('We create a model that represents a '),
                    m('span.emphasis', 'continuous premise-conjecture space'),
                    span(', where the premise-conjecture relationships resemble the Premise Selection problem.')
                ]),
                m('br'),
                m('p', [
                    span('This space is to be explored using '),
                    m('span.emphasis', 'interactive visualization'),
                    span('.'),
                ]),
            ]),
            m('section', [
                m('p', 'In a way, we invert the Premise Selection task to ask'),
                m('br'),
                m('p.emphasis', 'Given a set of premises P, which conjectures may be generated that are likely to be proven using a subset of P?'),
            ]),
        ]),
        m('section', [
            m('section', 'There are many advantages/goals...'),
            m('section', [
                span('Coupling Generative modeling with interactive visualization provides true '),
                m('span.emphasis', 'intuition'),
                span(' about the data.'),
            ]),
            m('section', [
                span('There is an emphasis on '),
                m('span.emphasis', 'understanding'),
                span(' the data, rather than simply achieving a higher accuracy on a model.')
            ]),
            m('section', [
                m('p.emphasis', [
                    span('A continuous space allows us to analyze the '),
                    m('span.emphasis', 'small changes'),
                    span(' in the data.'),
                ]),
                m('p', [
                    span('We normally consider proofs as discrete and separate. We do not normally consider a proof with a slight change. But considering the small changes may allow us understand when specific premises may become useful.'),
                ]),
            ]),
            m('section', 'We may then use what we have learned from the exploration to develop better predictive models.'),
            m('section', 'Also, generative modeling may serve as an alternative to autoformalization.')
        ]),
        m('section', 'A full implementation is out-of-scope for this project, but I hope to have working visualization that we may explore in the future.'),


        // a few goals/advantages
        //m('section', [
        //    m('section', m('div', { id: 'thesis-tsne-container-2d' })),
        //    m('section', m('div', { id: 'thesis-tsne-container-3d' })),
        //]),
        m('section', 'TODO MODEL'),
        m('section', 'Thank you!'),
        m('section', [
            m('section', 'References, from my paper:'),
            m('section', [
                m('p', '[1] C. Kaliszyk, F. Chollet, and C. Szegedy, "Holstep: A machine learning dataset for higher - order logic theorem proving," ArXiv, vol. abs/1703.00426, 2017.'),
                m('p', '[2] J. Alama, T. Heskes, D. Kuhlwein, E. Tsivtsivadze, and J. Urban, "Premise selection for mathematics by corpus analysis and kernel methods," Journal of Automated Reasoning, vol. 52, pp. 191-213, 2013.'),
                m('p', '[3] I. J. Goodfellow, J. Pouget-Abadie, M. Mirza, B. Xu, D. Warde-Farley, S. Ozair, A.C.Courville, and Y.Bengio, "Generative adversarial nets," in NIPS, 2014.'),
            ]),
            m('section', [
                m('p', '[4] D. P. Kingma and M. Welling, "Auto-encoding variational bayes," CoRR, vol.abs/1312.6114, 2013.'),
                m('p', '[5] G. Irving, C. Szegedy, A. A. Alemi, N. Een, F. Chollet, and J. Urban, "Deepmath - deep sequence models for premise selection," in NIPS, 2016.'),
                m('p', '[6] D. Aspinall and C. Kaliszyk, "Towards formal proof metrics," in FASE, 2016.'),
            ]),
            m('section', [
                m('p', '[7] B. Zhan, "holpy: Interactive theorem proving in python," ArXiv, vol.abs/1905.05970, 2019.'),
                m('p', '[8] L. M. de Moura, S. Kong, J. Avigad, F. van Doorn, and J. von Raumer, "The lean theorem prover(system description)," in CADE, 2015.'),
                m('p', '[9] M. Crouse, I. Abdelaziz, C. Cornelio, V. Thost, L. Wu, K. D. Forbus, and A. Fokoue, "Improving graph neural network representations of logical formulae with subgraph pooling," ArXiv, vol. abs/1911.06904, 2019.'),
            ]),
            m('section', [
                m('p', '[10] C. Kaliszyk, J. Urban, and J. Vyskocil, "Efficient semantic features for automated reasoning over large theories," in IJCAI, 2015.'),
                m('p', '[11] M. Ganesalingam and W. T. Gowers, "A fully automatic theorem prover with human - style output," in Journal of Automated Reasoning, 2016.'),
                m('p', '[12] M. Wang, Y. Tang, J. J. Wang, and J. Deng, "Premise selection for theorem proving by deep graph embedding," in NIPS, 2017.'),
            ]),
            m('section', [
                m('p', '[13] A. S. Kucik and K. Korovin, "Premise selection with neural networks and distributed representation of features," ArXiv, vol. abs/1807.10268, 2018.'),
                m('p', '[14] S. M. Loos, G. Irving, C. Szegedy, and C. Kaliszyk, "Deep network guided proof search," ArXiv, vol. abs/1701.06972, 2017.'),
                m('p', '[15] D. Huang, "Elementary logic in linear space," ArXiv, vol. abs/2001.11186, 2020.'),
            ]),
            m('section', [
                m('p', '[16] S. R. Bowman, L. Vilnis, O. Vinyals, A. M. Dai, R. Jozefowicz, and S. Bengio, "Generating sentences from a continuous space," in CoNLL, 2015.'),
                m('p', '[17] G. Bancerek, C. Bylinski, A. Grabowski, A. Kornilowicz, R. Matuszewski, A. Naumowicz, and K.Pak, "The role of the mizar mathematical library for interactive proof development in mizar," in Journal of Automated Reasoning, 2017.'),
            ]),
            m('section', [
                m('p', '[18] L. v. d. Maaten and G. Hinton, "Visualizing data using t-sne," Journal of machine learning research, vol. 9, no. Nov, pp. 2579[2605, 2008.'),
                m('p', '[19] R. Shin, A. A. Alemi, G. Irving, and O. Vinyals, "Tree-structured variational autoencoder," 2017.'),
                m('p', '[20] I. Higgins, L. Matthey, X. Glorot, A. Pal, B. Uria, C. Blundell, S. Mohamed, and A.Lerchner, "Early visual concept learning with unsupervised deep learning, " ArXiv, vol.abs/1606.05579, 2016.'),
            ]),
        ]),
    ]
}

Thesis.view = function () {
    return m('div', { class: 'slides thesis' }, Thesis.slides());
}

Thesis.oncreate = function () {
    document.title = 'Thesis Presentation';
    Reveal.initialize({
        hash: true,
        dependencies: [
            { src: 'build/framework/plugin/highlight/highlight.js' },
            { src: 'build/framework/plugin/zoom-js/zoom.js', async: true },
            { src: 'build/framework/plugin/notes/notes.js', async: true },
        ]
    });
    Reveal.addEventListener('slidechanged', function (event) {
        if (event.indexh === 1 || false) {
            if (event.indexv === 0) {
                Thesis.buildTsnePlot('thesis-tsne-container-2d', 'https://tlacasse.github.io/build/data/thesis/tsne.json', 2, 2);
            } else {
                Thesis.buildTsnePlot('thesis-tsne-container-3d', 'https://tlacasse.github.io/build/data/thesis/tsne.json', 3, 2);
            }
        } else {
            Plotly.purge('thesis-tsne-container-2d');
            Plotly.purge('thesis-tsne-container-3d');
        }
    });
}

﻿
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

