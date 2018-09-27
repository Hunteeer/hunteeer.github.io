function backToTop() {
    const backToTop = $('#back-to-top');

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.on('click', function(){
        $('html, body').animate({scrollTop : 0}, 200);
    });
}

function fancyBox() {
    if ($.fancybox) {
        $('.post-content').each(function () {
            $(this).find('img').each(function () {
                $(this).wrap(`<a class="fancybox" href="${this.src}" data-fancybox="gallery" data-caption="${this.title}"></a>`)
            })
        })

        $('.fancybox').fancybox({
            selector: '.fancybox',
            protect: true
        })
    }
}

function codeFences() {
    /* Highlight code blocks, and wrap them with tables */
    const languageList = new Map([
        ['language-bash',  'Bash'],
        ['language-c',  'C'],
        ['language-cs',  'C#'],
        ['language-cpp',  'C++'],
        ['language-css',  'CSS'],
        ['language-coffeescript',  'CoffeeScript'],
        ['language-html',  'HTML'],
        ['language-xml',  'XML'],
        ['language-http',  'HTTP'],
        ['language-json',  'JSON'],
        ['language-java',  'Java'],
        ['language-js',  'JavaScript'],
        ['language-javascript',  'JavaScript'],
        ['language-makefile',  'Makefile'],
        ['language-markdown',  'Markdown'],
        ['language-objectivec',  'Objective-C'],
        ['language-php',  'PHP'],
        ['language-perl',  'Perl'],
        ['language-python',  'Python'],
        ['language-ruby',  'Ruby'],
        ['language-sql',  'SQL'],
        ['language-shell',  'Shell'],
        ['language-erlang',  'Erlang'],
        ['language-go',  'Go'],
        ['language-groovy',  'Groovy'],
        ['language-haskell',  'Haskell'],
        ['language-kotlin',  'Kotlin'],
        ['language-less',  'Less'],
        ['language-lisp',  'Lisp'],
        ['language-lua',  'Lua'],
        ['language-matlab',  'Matlab'],
        ['language-rust',  'Rust'],
        ['language-scss',  'Scss'],
        ['language-scala',  'Scala'],
        ['language-swift',  'Swift'],
        ['language-typescript',  'TypeScript'],
        ['language-yml',  'YAML'],
        ['language-yaml',  'YAML'],
        ['language-toml',  'TOML'],
        ['language-latex',  'LaTeX'],
        ['language-tex',  'TeX'],
    ]);

    const blocks = $('pre code');
    for (let block of blocks) {
        const rootElement = block.parentElement;
        const rawData = escapeHTML(block.innerHTML);  // Preserve raw code
        hljs.highlightBlock(block);  // Highlight code block
        const lineCodes = block.innerHTML.split(/\n/);
        if (lineCodes[lineCodes.length - 1] === '') lineCodes.pop();  // Skip last empty line

        // Reconstruct code block, store code lines to table cells
        let index = 0;
        let codeLines = '';
        for (let lineCode of lineCodes) {
            index += 1;
            codeLines += `<tr><td class="line-num">${index}</td><td class="line-code"><pre><code>${lineCode}</code></pre></td></tr>`;
        }

        // Create parent elements for code blocks
        const figure = document.createElement('figure');
        figure.className = block.className;

        // Decide code language
        let language = 'Code';
        if (languageList.has(figure.className.split(' ')[0])) {
            language = languageList.get(figure.className.split(' ')[0]);
        }

        // Template
        figure.innerHTML = `<header><span class="language">${language}</span><div class="copy-to-clipboard tooltip" data-clipboard-text="${rawData}"><i class="icon icon-clipboard"><svg><use xlink:href="/icons.svg#icon-clipboard"></use></svg></i><span class="tooltiptext">Copy</span></div></header><table><tbody>${codeLines}</tbody></table>`;

        figure.className += ' codefences';  // Add specific class

        rootElement.parentElement.replaceChild(figure, rootElement);  // Replace original element with reconstructed element
    }
}

function escapeHTML(string) {
    /* Escape special characters */
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
    };

    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
        return entityMap[s];
    });
}

function unescapeHTML(string) {
    /* Undo escape speical characters */
    const entityMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': '/',
        '&#x60;': '`',
        '&#3D;': '=',
    };

    return String(string).replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#3D;)/g, function (s) {
        return entityMap[s];
    })
}

function copyToClipboard() {
    /* Copy original code to clipboard */
    const buttons = $('.copy-to-clipboard');
    for (let button of buttons) {
        const tooltip = button.getElementsByClassName('tooltiptext')[0];
        const initTooltipText = tooltip.innerHTML;
        button.addEventListener('click', function () {
            tooltip.innerHTML = 'Copied';
            let $tempInput =  $("<textarea>");
            $("body").append($tempInput);
            $tempInput.val(unescapeHTML(button.getAttribute('data-clipboard-text'))).select();
            document.execCommand("copy");
            $tempInput.remove();
        });

        button.addEventListener('mouseout', function () {
            tooltip.innerHTML = initTooltipText;
        })
    }
}

backToTop();

fancyBox();

codeFences();

copyToClipboard();
