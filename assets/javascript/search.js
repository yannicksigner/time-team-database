(function() {

    var documents = [
    {
        "id": 1,
        "title": "Wedgwood's First Factory",
        "thumbnailurl": "static-cse.canva.com/blob/651263/youtube.b1db6241.jpg",
        "summary": "Everyone knows the name of Wedgwood when it comes to pottery, and this is what they have in mind, this blue and white design, it’s famous throughout the world. But few people know that it was here in Burslem on the outskirts of Stoke-On-Trent, that Josiah Wedgwood’s climb to fame and fortune first began. This is actually the site of his first factory, which was at the heart of the pottery industry when it took off in the eighteenth century, but does any of it remain under the paving stones of present day Burslem.",
        "location": "Burslem, Stoke-on-Trent",
        "report": {
            "availability": "no",
            "link": "no",
            "abstract": "no"
        },
        "broadcast": {
            "date": "03.01.1999",
            "seriesepisode": 1,
            "series": 6,
            "episode": 31,
            "title": "Wedgwood's First Factory",
            "year": 1999
        },
        "links": {
            "her": {
                "name": "no",
                "globallink": "no",
                "url": "no"
            },
            "imdb": {
                "name": "no",
                "url": "no"
            }
        }
    },
    {
        "id": 2,
        "title": "Wedgwood's First Factory",
        "thumbnailurl": "static-cse.canva.com/blob/651263/youtube.b1db6241.jpg",
        "summary": "Everyone knows the name of Wedgwood when it comes to pottery, and this is what they have in mind, this blue and white design, it’s famous throughout the world. But few people know that it was here in Burslem on the outskirts of Stoke-On-Trent, that Josiah Wedgwood’s climb to fame and fortune first began. This is actually the site of his first factory, which was at the heart of the pottery industry when it took off in the eighteenth century, but does any of it remain under the paving stones of present day Burslem.",
        "location": "Burslem, Stoke-on-Trent",
        "report": {
            "availability": "no",
            "link": "no",
            "abstract": "no"
        },
        "broadcast": {
            "date": "03.01.1999",
            "seriesepisode": 1,
            "series": 6,
            "episode": 31,
            "title": "Wedgwood's First Factory",
            "year": 1999
        },
        "links": {
            "her": {
                "name": "no",
                "globallink": "no",
                "url": "no"
            },
            "imdb": {
                "name": "no",
                "url": "no"
            }
        }
    }
]

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = documents.find(({id}) => id === results[i].ref)
        appendString += '<li><img src="'+ item.thumbnailurl +'" alt="" width="600" height="400">';
        appendString += '<h3>' + item.title + '</h3><p>'+ item.summary+'</p></li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found!</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');


  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('location')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
