(function() {

  var json = $.getJSON({'url': "assets/data/data.json", 'async': false});
  var documents = JSON.parse(json.responseText);

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) { // Iterate over the results
        var item = documents.find(({id}) => id === parseInt(results[i].ref))
        appendString += '<section class="search-result-item">'
        appendString += '<img class="image" src="http://' + item.thumbnailurl + '">'
        appendString += '<div class="search-result-item-body">'
        appendString += '<div class="row"><div class="col-sm-8">'
        appendString += '<h4 class="search-result-item-heading">' + item.broadcast.title + '</h4>'
        appendString += '<p class="info">' + item.location + ' (' + item.country + ') at <a href="http://osmaps.ordnancesurvey.co.uk/' + item.coord + ',11/pin" target="_blank">' + item.ngr + '</i></a></p>'
        appendString += '<p class="description">' + item.summary + '</p><hr/>'

        if (item.links.ei.availability) {
          appendString += '<p class="value3 mt-sm"><img src="https://historicengland.org.uk/public/src/images/HE-Logo_White.svg" class="body-ei">' + item.links.ei.main.name + ' (Id: ' + item.links.ei.main.id + ') <a href="http://' + item.links.ei.main.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
          if (item.links.ei.multiple) {
            appendString += '<p class="value3 mt-sm"><img src="https://historicengland.org.uk/public/src/images/HE-Logo_White.svg" class="body-ei">' + item.links.ei.additional1.name + ' (Id: ' + item.links.ei.additional1.id + ') <a href="http://' + item.links.ei.additional1.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
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
        appendString += '<p class="value3 mt-sm"><i class="bi bi-tv-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Series"></i>Series ' + item.broadcast.series + ' – Episode ' + item.broadcast.episode + '</p>'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-calendar-event" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Date of first broadcast"></i>' + item.broadcast.date + '</p>'
        appendString += '<p class="value3 mt-sm"><i class="bi bi-camera-reels-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Dates when recorded"></i>' + item.recorded + '</p>'

        if (item.links.imdb.availability) {
          appendString += '<p class="value3 mt-sm"><i class="fa fa-imdb" style="margin-right: 15px;"></i>IMDb rating ' + item.links.imdb.rating + '/10 <a href="http://' + item.links.imdb.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
        } else {
          appendString += '<p class="value3 mt-sm"><i class="fa fa-imdb" style="margin-right: 15px;"></i>No IMDb entry</p>'
        }

        if (item.links.channel4.availability) {
          appendString += '<p class="value3 mt-sm"><img src="https://s3-eu-west-1.amazonaws.com/c4-cp-assets/corporate-assets/styles/large/s3/2019-08/C4_RGB_Grey.jpg" style="margin-right: 15px;height: 16px;vertical-align: text-top;">Available on Channel4 <a href="http://' + item.links.channel4.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
        } else {
          appendString += '<p class="value3 mt-sm"><img src="https://s3-eu-west-1.amazonaws.com/c4-cp-assets/corporate-assets/styles/large/s3/2019-08/C4_RGB_Grey.jpg" style="margin-right: 15px;height: 16px;vertical-align: text-top;">Not available on Channel4</p>'
        }

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

    import Fuse from '/sturdy-robots/assets/javascript/search.js'

    const options = {
      keys: [
        "location",
        "broadcast.title",
        "country",
        "summary"
      ]
    };

    const fuse = new Fuse(documents, options);

    fuse.search(searchTerm)

    displaySearchResults(fuse.search(searchTerm), window.store); // We'll write this in the next section
  }
})();
