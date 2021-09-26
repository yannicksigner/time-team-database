(function() {

  var documents = [
    {
        "id": 1,
        "title": "Wedgwood's First Factory",
        "thumbnailurl": "m.media-amazon.com/images/M/MV5BNTU0Mjc1MzM1OF5BMl5BanBnXkFtZTgwOTY3MTkyMDI@._V1_FMjpg_UX500_.jpg",
        "summary": "Everyone knows the name of Wedgwood when it comes to pottery, and this is what they have in mind, this blue and white design, it’s famous throughout the world.",
        "location": "Burslem, Stoke-on-Trent",
        "ngr": "SJ 87099 49908",
        "report": {
            "availability": false,
            "link": "–",
            "abstract": "–"
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
                "availability": false,
                "name": "Lincolnshire HER",
                "id": "MLI91503",
                "url": "www.heritagegateway.org.uk/Gateway/Results_Single.aspx?uid=MLI91503&resourceID=1006"
            },
            "imdb": {
                "availability": true,
                "rating": 8.7,
                "url": "www.imdb.com/title/tt0952372/?ref_=ttep_ep1"
            }
        }
    },
    {
        "id": 2,
        "title": "Smallhythe, Kent",
        "thumbnailurl": "m.media-amazon.com/images/M/MV5BYTVlYjNhN2EtZDlhZi00MDE0LTgxNTEtMjIwODI1ZjI0MzQ2XkEyXkFqcGdeQXVyMTA4NDg3MDg2._V1_FMjpg_UX1000_.jpg",
        "summary": "Smallhythe is now a village amid fields. The nearest body of water being a Sewer and a drainage ditch. But in the 15th and 16th centuries, it was the site of a bustling shipbuilding industry right next to the mile-wide River Rother.",
        "location": "Smallhythe, Kent",
        "ngr": "TQ 89400 30000",
        "report": {
            "availability": false,
            "link": "–",
            "abstract": "–"
        },
        "broadcast": {
            "date": "07.02.1999",
            "seriesepisode": 6,
            "series": 6,
            "episode": 37,
            "title": "Smallhythe, Kent",
            "year": 1999
        },
        "links": {
            "her": {
                "availability": true,
                "name": "Kent HER",
                "id": "TQ 83 SE 52",
                "url": "www.heritagegateway.org.uk/Gateway/Results_Single.aspx?uid=MKE14001&resourceID=1005"
            },
            "imdb": {
                "availability": true,
                "rating": 8,
                "url": "www.imdb.com/title/tt0952384/?ref_=ttep_ep6"
            }
        }
    }
]

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) { // Iterate over the results
        var item = documents.find(({id}) => id === parseInt(results[i].ref))
        appendString += '<section class="search-result-item">'
        appendString += '<a class="image-link" href="#"><img class="image" src="http://' + item.thumbnailurl + '"></a>'
        appendString += '<div class="search-result-item-body">'
        appendString += '<div class="row"><div class="col-sm-9">'
        appendString += '<h4 class="search-result-item-heading">' + item.title + '</h4>'
        appendString += '<p class="info">' + item.location + ' (' + item.ngr + ')</p>'
        appendString += '<p class="description">' + item.summary + '</p><hr/>'

        if (item.links.her.availability) {
          appendString += '<p class="value3 mt-sm"><i class="bi bi-archive-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>' + item.links.her.name + ' (Id: ' + item.links.her.id + ') <a href="http://' + item.links.her.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
        } else {
          appendString += '<p class="value3 mt-sm"><i class="bi bi-archive" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i> no HER entry identified</p>'
        }

        appendString += '<p class="value3 mt-sm"><i class="bi bi-file-text" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.report.availability + '</p></div>'
        appendString += '<div class="col-sm-3 text-align-center">'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-tv-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Series"></i>Series ' + item.broadcast.series + ' (' + item.broadcast.year + ')</p>'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-tv-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Episode within the series"></i>Episode ' + item.broadcast.seriesepisode + '</p>'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-calendar-event" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Date of first broadcast"></i>' + item.broadcast.date + '</p>'
        appendString += '<p class="value3 mt-sm"><i class="fa fa-imdb" style="margin-right: 15px;"></i> ' + item.links.imdb.rating + ' IMDb rating <a href="http://' + item.links.imdb.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
        appendString += '</div></div></div></section>'
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found!</li>';
    }
    // activate the tooltips (after they have been created)
    $('[data-toggle="tooltip"]').tooltip()
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
    var idx = lunr(function() {
      this.ref('id')
      this.field('title')
      this.field('location')

      documents.forEach(function(doc) {
        this.add(doc)
      }, this)
    })

    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
