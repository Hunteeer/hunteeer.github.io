let search = instantsearch({
    // Replace with your own values
    appId: '1L1I8ZEYGB',
    apiKey: '7e6d7a46f2268d48331744557465374e', // search only API key, no ADMIN key
    indexName: 'reed_blog',
    urlSync: true,
    searchParameters: {
        hitsPerPage: 5
    },
    searchFunction: function(helper) {
        let searchResults = document.getElementById('search-results');
        if (helper.state.query === '') {
            searchResults.style.display = 'none';
            return;
        }
        searchResults.style.display = 'block';
        helper.search();
    },
    loadingIndicator: true
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-box',
        wrapInput: false,
        autofocus: false,
        magnifier: false,
        reset: false
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#search-hits',
        templates: {
            item: '<div class="hit"><p class="hit-name"><a href="{{{url}}}">{{{_highlightResult.title.value}}}</a><p>{{{_snippetResult.content.value}}}</p></p></div>',
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


search.start();