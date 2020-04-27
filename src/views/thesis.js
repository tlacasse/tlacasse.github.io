var Thesis = {};

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
                m('li', 'Example'),
                m('li', 'Conclusion'),
                m('li', 'Bonus'),
                m('li', 'References'),
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
                    span(' = 1. Thus q is another prime not found in the assumed set of all primes. This is a contradiction, so the set of all primes must be infinite.'),
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
                m('p', 'The formalized proof libraries of ITP systems may supply the data for ATP methods.'),
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
                m('p', 'In practice, a premise selection model takes in an input of a conjecture representation and a premise representation, and the output is a number between 0 and 1, where 1 is useful and 0 is not useful. Multiple premises are evaluated with a single conjecture, and the premises are ranked to determine which are most useful.')
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
            m('p', 'Only Holstep was used for the rest of the work, for a couple main reasons: '),
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
                m('br', { style: 'font-size: 0.4em' }),
                m('smaller', { style: 'font-size: 0.4em' }, 'Image from reference [4] at the end.'),
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
            m('section', [
                span('While the space is intended to be continuous, it is interesting to determine if there are informal "'),
                m('span.emphasis', 'discontinuities'),
                span('". These may emerge as boundaries in the premise-conjecture space, where there are sharp changes in the generated conjecture, creating distinct clusters of proofs.')
            ]),
            m('section', 'We may then use what we have learned from the exploration to develop better predictive models.'),
            m('section', 'Also, generative modeling may serve as an alternative to autoformalization.'),
            m('section', 'Finally, more work on visualization on proof content may provide better visuals for presentations like these.')
        ]),
        m('section', 'A full implementation is out-of-scope for this project, but I hope to have a working visualization that we may explore in the future.'),
        m('section', [
            m('p', 'The model has premises as input and conjectures as output, and learns a internal state that is the continuous premise-conjecture space.'),
            m('br'),
            m('p.fragment', 'A brief and simple description of the model is in the following slides. The paper explains in more detail.'),
        ]),
        m('section', [
            span('The model follows the variational autoencoder architecture. The premises are encoded into a probability distribution called the '),
            m('span.emphasis', 'latent space'),
            span(' and points in the space then generate the conjectures.'),
        ]),
        m('section', [
            m('p', [
                span('The model is named '),
                m('span.emphasis', 'PC-Space'),
                span(' for convenience. It is divided into two separate models:'),
            ]),
            m('ol', [
                m('li', 'PC-Space-A, an intermediate deliverable model, and'),
                m('li', 'PC-Space-B, a final model.')
            ]),
        ]),
        m('section', [
            m('section', 'PC-Space-A outputs just a list of probabilities of each token being in the conjecture.'),
            m('section', [
                m('p', 'For example: The training data for the previous Holstep example: '),
                m('div.codeblock', [
                    m('div.codeline', 'N Ssrnat.subSS'),
                    m('div.codeline', 'C |- (!n. (!m. (((SUC m) - (SUC n)) = (m - n))))'),
                ]),
                m('p', 'is the set of tokens:'),
                m('div.codeblock', [
                    m('div.codeline', '{ |-, !, n, ., m, SUC, -, =}'),
                ]),
            ]),
            m('section', [
                m('p', 'Multiplicity of tokens is ignored, as well as parentheses, as they influence the structure not the content of the conjecture.'),
                m('br'),
                m('p.fragment', 'The output of PC-Space-A creates a list of tokens, with probabilities of being included in the generated conjecture, to give a general, unstructured idea of what conjecture could be generated.'),
            ]),
            m('section', 'Now, the input is both the representation of premises themselves and the collection of premises.'),
            m('section', [
                m('p', 'Each premise is parsed into a binary tree structure.'),
                m('br'),
                m('p', [
                    span('Variables are encoded into a generic '),
                    m('span.emphasis', 'VAR'),
                    span(' token, so the encoding is independent of the variable naming.')
                ]),
            ]),
            m('section', [
                m('p', 'For example: The premise'),
                m('div.codeblock', [
                    m('div.codeline', '|- ((m = n) = ((int_of_num m) = (int_of_num n)))'),
                ]),
                m('p', 'is parsed into the binary tree:'),
                m('div.codeblock', [
                    m('div.codeline', [cc('|-')]),
                    m('div.codeline', [cclite('|'), cclite('-'), sp, cc('=')]),
                    m('div.codeline', [sp, sp, sp, cclite('|'), cclite('-'), sp, cc('=')]),
                    m('div.codeline', [sp, sp, sp, cclite('|'), sp, sp, cclite('|'), cclite('-'), sp, cc('VAR')]),
                    m('div.codeline', [sp, sp, sp, cclite('|'), sp, sp, cclite('|'), cclite('-'), sp, cc('VAR')]),
                    m('div.codeline', [sp, sp, sp, cclite('|'), cclite('-'), sp, cc('=')]),
                    m('div.codeline', [sp, sp, sp, sp, sp, sp, cclite('|'), cclite('-'), sp, cc('int_of_num')]),
                    m('div.codeline', [sp, sp, sp, sp, sp, sp, cclite('|'), sp, sp, cclite('|'), cclite('-'), sp, cc('VAR')]),
                    m('div.codeline', [sp, sp, sp, sp, sp, sp, cclite('|'), cclite('-'), sp, cc('int_of_num')]),
                    m('div.codeline', [sp, sp, sp, sp, sp, sp, sp, sp, sp, cclite('|'), cclite('-'), sp, cc('VAR')]),
                ]),
            ]),
            m('section', [
                m('p', 'The premises are encoding recursively buttom-up.'),
                m('br'),
                m('p', 'Leaf tokens have a initial arbitrary encoding, then subtrees with tokens that are one level above the leaves, then subtrees with a depth of 3, and so on.'),
                m('p', 'Encodings are determined by passing the subtrees through the model to the desired conjecture, and then evaluating each subtree encoding based on its child node encodings, thus allowing larger trees in the next iteration.'),
            ]),
            m('section', [
                m('p', 'Since one conjecture has many useful premises, multiple premises are sent through the model to a single conjecture.'),
                m('table', [
                    m('tr', [m('td', 'Premise 1'), m('td', '\u21E8'), m('td', 'Conjecture 1')]),
                    m('tr', [m('td', 'Premise 2'), m('td', '\u21E8'), m('td', 'Conjecture 1')]),
                    m('tr', [m('td', '...'), m('td', '\u21E8'), m('td', 'Conjecture 1')]),
                    m('tr', [m('td', 'Premise 1'), m('td', '\u21E8'), m('td', 'Conjecture 2')]),
                    m('tr', [m('td', '...'), m('td', '...'), m('td', '...')]),
                    m('tr', [m('td', 'Premise i'), m('td', '\u21E8'), m('td', 'Conjecture j')]),
                ]),
            ]),
        ]),
        m('section', [
            m('p', 'PC-Space-B outputs the entire structured conjecture. The expansion from PC-Space-A is relatively straightforward.'),
            m('br'),
            m('p', 'Encoding of premises remains unchanged.'),
            m('br'),
            m('p', 'The conjecture is then generated recursively into a binary tree.')
        ]),
        m('section', 'Example'),
        m('section', 'While we do not have an actual visualization system to explore, we can consider an example of how to analyze the continuous premise-conjecture space.'),
        m('section', 'A similar topic of research is the paper "Generating Sentences from a Continuous Space" by S. R. Bowman, L. Vilnis, O. Vinyals, A. M. Dai, R. Jozefowicz, and S. Bengio [16].'),
        m('section', [
            m('section', [
                m('p', 'Consider this example from their paper:'),
                m('div.codeblock', [
                    m('div.codeline', ccbold('he was silent for a long moment.')),
                    m('div.codeline', cc('he was silent for a moment.')),
                    m('div.codeline', cc('it was quiet for a moment.')),
                    m('div.codeline', cc('it was dark and cold.')),
                    m('div.codeline', cc('there was a pause.')),
                    m('div.codeline', ccbold('it was my turn.')),
                ]),
            ]),
            m('section', [
                m('p', [
                    span('Given two sentences, we have a series of inbetween steps to form the first sentence into a second sentence. This can be called a '),
                    m('span.emphasis', 'homotopy'),
                    span('.'),
                ]),
                m('br'),
                m('p', 'The adjacent steps (small changes in the input), cause the sentences to be slightly difference (small changes in the output), so here we have a piece of a continuous space. Also, the intermediate steps are cohesive sentences, not just combinations of the words of the endpoints.')
            ]),
            m('section', [
                m('p', 'Now try to imagine an analogy between this sentence example and some visualization using PC-Space.'),
                m('br'),
                m('p', 'What if there was some meaningful hidden information behind the generated sentences?'),
            ]),
            m('section', [
                m('p', 'If we take the endpoints to be the previously mentioned theorems:'),
                m('div.codeblock', [
                    m('div.codeline', ccbold('he was silent for a long moment. (infinitely many primes)')),
                    m('div.codeline', cc('he was silent for a moment.')),
                    m('div.codeline', cc('it was quiet for a moment.')),
                    m('div.codeline', cc('it was dark and cold.')),
                    m('div.codeline', cc('there was a pause.')),
                    m('div.codeline', ccbold('it was my turn. (square root of 2 is irrational)')),
                ]),
            ]),
            m('section', [
                m('p', 'It may be useful to suppose the theorems are a bit more complicated in their proofs, as proofs generally are.'),
                m('br'),
                m('p', 'Each theorem has an associated set of premises, and it may be clear to see why the associated premises are useful.'),
                m('br'),
                m('p', 'But it may be difficult to understand which premises relate to which specific parts of the conjecture.'),
            ]),
            m('section', [
                m('p', [
                    span('Consider the words '),
                    m('span.emphasis', 'silent'),
                    span(' and '),
                    m('span.emphasis', 'quiet'),
                    span(':'),
                ]),
                m('div.codeblock', [
                    m('div.codeline', ccbold('he was silent for a long moment. (infinitely many primes)')),
                    m('div.codeline', [cc('he was '), m('span.emphasis.codebold', 'silent'), cc(' for a moment.')]),
                    m('div.codeline', [cc('it was '), m('span.emphasis.codebold', 'quiet'), cc(' for a moment.')]),
                    m('div.codeline', cc('it was dark and cold.')),
                    m('div.codeline', cc('there was a pause.')),
                    m('div.codeline', ccbold('it was my turn. (square root of 2 is irrational)')),
                ]),
            ]),
            m('section', [
                m('p', 'Here, we are able to isolate those words as a change in the homotopy (which in the analogy, correspond to some part of the conjecture expression), and then understand the underlying useful premises for a proof.'),
                m('br'),
                m('p', 'In this example, the small change from "silent" to "quiet" (and "he" to "it") can be related to a specific movement in the premise usefulness space.')
            ]),
            m('section', [
                m('p', 'Then we have a finer-grained analysis of the premise selection problem, going beyond the scale of entire expressions to specific tokens within the expressions. We can extract exactly which part of the conjecture relates to which premise.'),
            ]),
        ]),
        m('section', 'Conclusion'),
        m('section', 'In one perspective, by turning the discrete proof objects into a continuous space, we can apply concepts or vocabulary from calculus for analysis. One example is considering the rate of change of proof object across the space.'),
        m('section', 'A grid visualization of the latent space (such as for the handwritten digits) may be even more useful for analysis with proofs, as the changes in the structure relate to thoughtful premise choice, and not intuitive motions as writing a digit.'),
        m('section', 'Also, one previous concern with premise selection models has been the separate encoding of premises and conjectures. Here in PC-Space, we have simultaneous work with premises and conjectures.'),
        m('section', 'One concern with this method is that multiple premises are packed into a single point in the latent space. There is no one-to-one correspondence for the model to learn.'),
        m('section', 'Also, it has been noted that Holstep premise selection models perform evaluation of the usefulness of a premise just as well with and without knowning the conjecture. This means the premises and conjectures are in some way independent meaning the PC-Space model may not be able to learn a meaningful space.'),
        m('section', [
            m('p', 'Future work clearly includes the actual implementation of this visualization.'),
            m('br'),
            m('p', 'Also, it may be of interest to work with a different dataset, such as the Mizar Mathematical Library.'),
        ]),
        m('section', 'Bonus'),
        m('section', [
            m('section', [
                m('p', 'For a preliminary visualization, we can plot conjectures as points where the distance between conjectures is based on the number of shared premises (which means the proofs should be similar).'),
            ]),
            m('section', [
                m('p', 'Below are two plots, using the t-SNE dimensionality reduction technique. In both, the points are reduced to a 2-dimensional space, but the second plot is shown in 3 dimensions (which performs better for me when using the interactive tools such as zooming).'),
                m('br'),
                m('p', 'Conjecture names are displayed when hovering above points in the plot.'),
            ]),
            m('section', m('div', { id: 'thesis-tsne-container-2d' })),
            m('section', m('div', { id: 'thesis-tsne-container-3d' })),
            m('section', 'Below are two additional plots, using the PCA dimensionality reduction technique. The advantage here is the space is linear, but we lose the direct similarity between conjectures based on their shared premises, and now have positioning of conjectures based on their individual premises.'),
            m('section', m('div', { id: 'thesis-pca-container-2d' })),
            m('section', m('div', { id: 'thesis-pca-container-3d' })),
        ]),
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
        if (event.indexh === 36) {
            if (event.indexv === 2) {
                Thesis.buildTsnePlot('thesis-tsne-container-2d', 'https://tlacasse.github.io/build/data/thesis/tsne.json', 2, 2);
            } else if (event.indexv === 3) {
                Thesis.buildTsnePlot('thesis-tsne-container-3d', 'https://tlacasse.github.io/build/data/thesis/tsne.json', 3, 2);
            }else if (event.indexv === 5) {
               Thesis.buildTsnePlot('thesis-pca-container-2d', 'https://tlacasse.github.io/build/data/thesis/pca.json', 2, 2);
            } else if (event.indexv === 6) {
                Thesis.buildTsnePlot('thesis-pca-container-3d', 'https://tlacasse.github.io/build/data/thesis/pca.json', 3, 2);
           }
        } else {
            Plotly.purge('thesis-tsne-container-2d');
            Plotly.purge('thesis-tsne-container-3d');
            Plotly.purge('thesis-pca-container-2d');
            Plotly.purge('thesis-pca-container-3d');
        }
    });
}
