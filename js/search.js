// initialize instantsearch
const search = instantsearch({
    appId: '1L1I8ZEYGB',
    apiKey: '7e6d7a46f2268d48331744557465374e',
    indexName: 'reed_blog',
    // urlSync: true,
    route: true,

    searchFunction: function(helper) {
        const searchResults = document.getElementById('search-results');

        if (helper.state.query === '') {
            searchResults.style.display = 'none';
        } else {
            searchResults.style.display = 'block';
            helper.search();
        }
    }

});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-input',
        placeholder: "Search ...",
        reset: false,
        magnifier: false,
        powerBy: true
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#search-hits',
        templates: {
            item: '<div class="hit"><p class="hit-name"><a href="{{{permalink}}}"> {{{_highlightResult.title.value}}}</a></p><p class="hit-content">{{{_snippetResult.content.value}}}</p></div>',
            empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
        }
    })
);

search.addWidget(
    instantsearch.widgets.pagination({
        container: '#search-pagination',
        showFirstLast: false,
        autoHideContainer: true,
        labels: {
            previous: '<i class="fa fa-chevron-left"></i>',
            next: '<i class="fa fa-chevron-right"></i>'
        }
    })
);
search.addWidget(
    instantsearch.widgets.stats({
        container: '#search-stats'
    })
);
search.start();