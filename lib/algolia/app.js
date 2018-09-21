let search = instantsearch({
    // Replace with your own values
    appId: '8P2J4Y6X73',
    apiKey: '4277702d6a1c945cbd6104aa89ca38ac', // search only API key, no ADMIN key
    indexName: 'blog',
    // urlSync: true,
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
        container: $('#search-input').get(0),
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
            previous: '<i class="icon icon-chevron-left"><svg><use xlink:href="/icons.svg#icon-chevron-left"></use></svg></i>',
            next: '<i class="icon icon-chevron-right"><svg><use xlink:href="/icons.svg#icon-chevron-right"></use></svg></i>'
        }
    })
);

search.addWidget(
    instantsearch.widgets.stats({
        container: '#search-stats'
    })
);

search.start();