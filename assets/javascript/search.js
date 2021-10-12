(function() {

  $('#prev-button').click(function() {
    if (!$('#prev-button').hasClass("disabled")) {
      updatePageination(-1);
    }
  });


  $('#next-button').click(function() {
    if (!$('#next-button').hasClass("disabled")) {
      updatePageination(1);
    }
  });

  var pagesize = 10;

  var json = $.getJSON({
    'url': "assets/data/data.json",
    'async': false
  });

  var documents = JSON.parse(json.responseText);

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
    var pageNum = 1;
    pageNum = getQueryVariable('page');

    $("#current-button").text("Page " + pageNum);

    if (results.length) { // Are there any results?
      var appendString = '';

      var iterator;
      var start;
      if (results.length <= pagesize) {
        start = 0;
        iterator = results.length;
        togglePageination("normal");
      } else {
        if ((pageNum * pagesize) > results.length) {
          start = (pageNum * pagesize) - pagesize;
          iterator = results.length;
          togglePageination("end");
        } else {
          start = (pageNum * pagesize) - pagesize;
          iterator = (pageNum * pagesize);
          togglePageination("full");
        }
      }

      for (var i = start; i < iterator; i++) { // Iterate over the results
        var item = results[i].item;
        appendString += '<section class="search-result-item">'
        appendString += '<img class="image" src="http://raw.githubusercontent.com/yannicksigner/sturdy-robots/master/assets/thumbnails/' + item.thumbnailurl + '">'
        appendString += '<div class="search-result-item-body">'
        appendString += '<div class="row"><div class="col-sm-8">'
        appendString += '<h4 class="search-result-item-heading">' + item.broadcast.title + ' </h4>'
        //<span class="badge bg-success">'+ ((1-parseFloat(results[i].score)).toFixed(3) * 100).toFixed(1) + '% match</span>
        appendString += '<p class="info">' + item.location + ' (' + item.country + ') at <a href="http://osmaps.ordnancesurvey.co.uk/' + item.coord + ',11/pin" target="_blank">' + item.ngr + '</i></a></p>'
        appendString += '<p class="description">' + item.summary + '</p><hr/>'

        if (item.links.ei.availability) {
          appendString += '<p class="value3 mt-sm"><img src="https://historicengland.org.uk/public/src/images/HE-Logo_White.svg" class="body-ei">' + item.links.ei.main.name + ' (Id: ' + item.links.ei.main.id + ') <a href="http://' + item.links.ei.main.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
          if (item.links.ei.multiple) {
            appendString += '<p class="value3 mt-sm"><img src="https://historicengland.org.uk/public/src/images/HE-Logo_White.svg" class="body-ei">' + item.links.ei.additional1.name + ' (Id: ' + item.links.ei.additional1.id + ') <a href="http://' + item.links.ei.additional1.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
            if (item.links.ei.additional2.name != "–") {
              appendString += '<p class="value3 mt-sm"><img src="https://historicengland.org.uk/public/src/images/HE-Logo_White.svg" class="body-ei">' + item.links.ei.additional2.name + ' (Id: ' + item.links.ei.additional2.id + ') <a href="http://' + item.links.ei.additional2.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
            }
          }
        } else {
          appendString += '<p class="value3 mt-sm"><i class="bi bi-archive" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>No EI entry identified</p>'
        }

        if (item.links.her.availability) {
          appendString += '<p class="value3 mt-sm"><i class="bi bi-archive-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>' + item.links.her.main.name + ' (Id: ' + item.links.her.main.id + ') <a href="http://' + item.links.her.main.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
          if (item.links.her.multiple) {
            appendString += '<p class="value3 mt-sm"><i class="bi bi-archive-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>' + item.links.her.additional1.name + ' (Id: ' + item.links.her.additional1.id + ') <a href="http://' + item.links.her.additional1.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
            if (item.links.her.additional2.name != "–") {
              appendString += '<p class="value3 mt-sm"><i class="bi bi-archive-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>' + item.links.her.additional2.name + ' (Id: ' + item.links.her.additional2.id + ') <a href="http://' + item.links.her.additional2.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
            }
          }
        } else {
          appendString += '<p class="value3 mt-sm"><i class="bi bi-archive" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>No HER entry identified</p>'
        }

        if (item.links.report.availability) {
          if (item.links.report.main.accessable) {
            appendString += '<p class="value3 mt-sm"><i class="bi bi-file-text-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.main.title + ' <a href="http://' + item.links.report.main.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
          } else {
            if (item.links.report.main.url != "–") {
              appendString += '<p class="value3 mt-sm"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.main.title + ' <a href="http://' + item.links.report.main.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
            } else {
              appendString += '<p class="value3 mt-sm"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.main.title + '</p>'
            }
          }
          if (item.links.report.multiple) {
            if (item.links.report.additional1.accessable) {
              appendString += '<p class="value3 mt-sm"><i class="bi bi-file-text-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.additional1.title + ' <a href="http://' + item.links.report.additional1.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
            } else {
              if (item.links.report.additional1.url != "–") {
                appendString += '<p class="value3 mt-sm"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.additional1.title + ' <a href="http://' + item.links.report.additional1.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
              } else {
                appendString += '<p class="value3 mt-sm"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.additional1.title + '</p>'
              }
            }

            if (item.links.report.additional2.title != "–") {
              if (item.links.report.additional2.accessable) {
                appendString += '<p class="value3 mt-sm"><i class="bi bi-file-text-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.additional2.title + ' <a href="http://' + item.links.report.additional2.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
              } else {
                if (item.links.report.additional2.url != "–") {
                  appendString += '<p class="value3 mt-sm"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.additional2.title + ' <a href="http://' + item.links.report.additional2.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
                } else {
                  appendString += '<p class="value3 mt-sm"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report"></i>' + item.links.report.additional2.title + '</p>'
                }
              }
            }
          }
        } else {
          if (item.links.report.comment != "–") {
            appendString += '<p class="value3 mt-sm"><i class="bi bi-file-text" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>' + item.links.report.comment + '</p>'
          } else {
            appendString += '<p class="value3 mt-sm"><i class="bi bi-file-text" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>No excavation report identified</p>'
          }
        }

        appendString += '</div><div class="col-sm-4 text-align-center">'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-tv-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Season"></i>' + item.broadcast.season + ' – ' + item.broadcast.episode + '</p>'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-calendar-event" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Date of first broadcast"></i>' + item.broadcast.date + '</p>'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-camera-reels-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Dates when recorded"></i>' + item.recorded + '</p>'

        if (item.links.imdb.availability) {
          appendString += '<p class="value3 mt-sm"><i class="fa fa-imdb" style="margin-right: 15px;"></i>IMDb rating ' + item.links.imdb.rating + '/10 <a href="www.imdb.com/title/' + item.links.imdb.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
        } else {
          appendString += '<p class="value3 mt-sm"><i class="fa fa-imdb" style="margin-right: 15px;"></i>No IMDb entry</p>'
        }

        if (item.links.channel4.availability) {
          appendString += '<p class="value3 mt-sm"><img src="https://s3-eu-west-1.amazonaws.com/c4-cp-assets/corporate-assets/styles/large/s3/2019-08/C4_RGB_Grey.jpg" style="margin-right: 15px;height: 16px;vertical-align: text-top;">Available on Channel4 <a href="http://' + item.links.channel4.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
        } else {
          appendString += '<p class="value3 mt-sm"><img src="https://s3-eu-west-1.amazonaws.com/c4-cp-assets/corporate-assets/styles/large/s3/2019-08/C4_RGB_Grey.jpg" style="margin-right: 15px;height: 16px;vertical-align: text-top;">Not available on Channel4</p>'
        }

        if (item.links.youtube.availability) {
          appendString += '<p class="value3 mt-sm"><i class="bi bi-youtube" style="margin-right: 15px;"></i>Available on Youtube <a href="https://www.youtube.com/watch?v=' + item.links.youtube.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
        } else {
          appendString += '<p class="value3 mt-sm"><i class="bi bi-youtube" style="margin-right: 15px;"></i>Not available on Youtube</p>'
        }

        appendString += '</div></div></div></section>'
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found!</li>';
    }
    // activate the tooltips (after they have been created)
    $('[data-toggle="tooltip"]').tooltip()

    document.getElementById('search-info').innerHTML = '<p>' + results.length + ' episodes found</p>';
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

  function togglePageination(state) {
    var pageNum = parseInt(getQueryVariable('page'));
    if (!getQueryVariable('page')) {
      var url = document.location.href + "&page=1";
      document.location = url;
    }

    if (state == "normal") {
      $("#search-addon").hide();
    }

    if (state == "full") {
      $("#search-addon").show();
      if (pageNum == 1) {
        $('#prev-button').addClass("disabled");
      } else {
        $('#prev-button').removeClass("disabled");
      }
    }

    if (state == "end") {
      $("#search-addon").show();
      $('#next-button').addClass("disabled");
      $('#prev-button').removeClass("disabled");
    }
  }

  function updatePageination(value) {
    var pageNum = parseInt(getQueryVariable('page'));
    pageNum = pageNum + value;

    var currentUrl = 'http://www.example.com/hello.png?w=100&h=100&bg=white';
    var url = new URL(document.location.href);
    url.searchParams.set("page", pageNum); // setting your param
    var newUrl = url.href;
    console.log(newUrl);
    document.location = newUrl;
  }

  // search
  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    const options = {
      ignoreLocation: true,
      includeScore: true,
      threshold: 0.3,
      useExtendedSearch: true,
      keys: [
        {name:"location",weight:0.3},
        {name:"summary",weight:0.3},
        {name:"broadcast.title",weight:0.3},
        {name:"broadcast.season",weight:0.2},
        {name:"broadcast.episode",weight:0.2},
        {name:"country",weight:0.2}
      ]
    };

    const fuse = new Fuse(documents, options);

    fuse.search(searchTerm)

    displaySearchResults(fuse.search(searchTerm), window.store); // We'll write this in the next section
  }
})();
