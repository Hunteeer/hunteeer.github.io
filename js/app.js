// Set Algolia options
  const options = {
    appId: '1L1I8ZEYGB',
    apiKey: '2422808fe4e37003bd73b4a94f520b56',
    indexName: 'reed_blog',
    hitsPerPage: 10,
    routing: true
 }

// Parse options to instantsearch
  const search = instantsearch(options);
  // initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for post',
    reset: false,
    cssClasses: {
     root: 'Search-box-container',
     input: 'Search-box-input',
    }
  })
);

// create variable for custom hit template
var hitTemplate =
  '<a href="{{ permalink }}" class="List-item">' +
      '<div class="List-image">' +
        '<img src="https://res.cloudinary.com/harrycresswell/image/upload/w_auto,dpr_auto,c_scale/{{{featuredimage}}}" />'
    + '</div>' +
      '<div class="List-title">{{{_highlightResult.title.value}}}</div>' +
  '</a>'
+ '<div class="List-summary">{{{summary}}}</div>';



// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    cssClasses: {
      root:'Search-hits',
      empty:'Search-hits--empty'
    },
    templates:{
      // call custom hit template
      item: hitTemplate,
      empty: 'Didn’t find any results for the search <em>\"{{query}}\"</em>'
    }
  })
);

// initialize RefinementList
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#refinement-list',
    attributeName: 'tags'
  })
);


search.start();