function addPeriodBadges(item) {
  var html = "";
  if (item.periods.prehistoric) {
    html += addBadge("Prehistoric", "prehistoric")
  }

  if (item.periods.palaeolithic) {
    html += addBadge("Palaeolithic", "palaeolithic")
  }

  if (item.periods.mesolithic) {
    html += addBadge("Mesolithic", "mesolithic")
  }

  if (item.periods.neolithic) {
    html += addBadge("Neolithic", "neolithic")
  }

  if (item.periods.bronzeage) {
    html += addBadge("Bronze Age", "bronzeage")
  }

  if (item.periods.ironage) {
    html += addBadge("Iron Age", "ironage")
  }

  if (item.periods.roman) {
    html += addBadge("Roman", "roman")
  }

  if (item.periods.earlymedieval) {
    html += addBadge("Early Medieval", "earlymedieval")
  }

  if (item.periods.medieval) {
    html += addBadge("Medieval", "medieval")
  }

  if (item.periods.postmedieval) {
    html += addBadge("Post-Medieval", "postmedieval")
  }

  if (item.periods.twentiethcentury) {
    html += addBadge("20th century", "twentiethcentury")
  }

  return html
}

function addBadge(name, code) {
  return '<a href="?query=%22' + name + '%22"><span class="badge custom-badge custom-badge-' + code + '">' + name + '</span></a>'
}

function createNRHELink(name, id, url) {
  return '<p class="links"><img src="https://historicengland.org.uk/frontend/dist/shared/images/HE-Logo_White.svg" class="body-ei" data-toggle="tooltip" data-placement="left" title="NRHE entry available"><a href="http://' + url + '" target="_blank">' + name + ' (Id: ' + id + ') <i class="bi bi-link-45deg"></i></a></p>'
}

function createHERLink(url, title, name, id) {
  return '<p class="links"><i class="bi bi-archive-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER entry available"></i><a href="http://' + url + '" target="_blank">' + title + ' (' + name + ' Id: ' + id + ') <i class="bi bi-link-45deg"></i></a></p>'
}

function setPageNumberParameter(p_num) {
  var url = new URL(document.location.href);
  url.searchParams.set("page", p_num);
  var newUrl = url.href;
  document.location = newUrl;
}

function setExtendedParameter(p_state) {
  var url = new URL(document.location.href);
  url.searchParams.set("extended", p_state);
  var newUrl = url.href;
  document.location = newUrl;
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
    setPageNumberParameter(1);
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

function toggleExtended() {
  if (!getQueryVariable('extended')) {
    setExtendedParameter(false);
  }
  $('#chk1').prop('checked', (getQueryVariable('extended') === 'true'));
}

function updatePageination(value) {
  var pageNum = parseInt(getQueryVariable('page'));
  pageNum = pageNum + value;
  setPageNumberParameter(pageNum);
}

function displaySearchResults(results, store) {
  var searchResults = document.getElementById('search-results');
  var pageNum = 1;
  pageNum = getQueryVariable('page');
  var pagesize = 10;

  $("#current-button").text("Page " + pageNum);

  if (results.length) {
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
      appendString += '<img class="image" src="https://raw.githubusercontent.com/yannicksigner/sturdy-robots/master/assets/thumbnails/' + item.thumbnailurl + '">'
      appendString += '<div class="search-result-item-body">'
      appendString += '<div class="row"><div class="col-sm-8">'
      appendString += '<h4 class="search-result-item-heading">' + item.broadcast.title + ' </h4>'
      appendString += '<p class="info">' + item.location + ' (' + item.country + ') at <a href="http://osmaps.ordnancesurvey.co.uk/' + item.coord + ',11/pin" target="_blank">' + item.ngr + '</i></a></p>'
      appendString += '<p class="description">' + item.summary + ' (Source: <a href="https://www.channel4.com/programmes/time-team/episode-guide/series-' + item.broadcast.season.replace("Season 0", "Season ").replace("Season ", "") + '" target="_blank">Channel 4</a>)</p>'
      appendString += '<hr/>'

      // SUB-HEADER
      appendString += '<h6 class="subheader">Historic England NRHE Excavation Index<i class="bi bi-info-circle" style="padding-left:5px;" data-toggle="tooltip" data-placement="right" title="Historic England NRHE Excavation Index"></i></h6>'

      if (item.links.ei.availability) {
        appendString += createNRHELink(item.links.ei.main.name, item.links.ei.main.id, item.links.ei.main.url)
        if (item.links.ei.multiple) {
          appendString += createNRHELink(item.links.ei.additional1.name, item.links.ei.additional1.id, item.links.ei.additional1.url)
          if (item.links.ei.additional2.name != "–") {
            appendString += createNRHELink(item.links.ei.additional2.name, item.links.ei.additional2.id, item.links.ei.additional2.url)
          }
        }
      } else {
        appendString += '<p class="links"><i class="bi bi-archive" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="NRHE entry not available"></i>No NRHE entry identified</p>'
      }

      // SUB-HEADER
      appendString += '<h6 class="subheader">Historic Environment Record<i class="bi bi-info-circle" style="padding-left:5px;" data-toggle="tooltip" data-placement="right" title="Historic Environment Record"></i></h6>'

      if (item.links.her.availability) {
        appendString += createHERLink(item.links.her.main.url, item.links.her.main.title, item.links.her.main.name, item.links.her.main.id)
        if (item.links.her.multiple) {
          appendString += createHERLink(item.links.her.additional1.url, item.links.her.additional1.title, item.links.her.additional1.name, item.links.her.additional1.id)
          if (item.links.her.additional2.name != "–") {
            appendString += createHERLink(item.links.her.additional2.url, item.links.her.additional2.title, item.links.her.additional2.name, item.links.her.additional2.id)
          }
        }
      } else {
        appendString += '<p class="links"><i class="bi bi-archive" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>No HER entry identified</p>'
      }

      // SUB-HEADER
      appendString += '<h6 class="subheader">Archaeological reports<i class="bi bi-info-circle" style="padding-left:5px;" data-toggle="tooltip" data-placement="right" title="Excavation reports and publications related to the work done by Time Team"></i></h6>'

      if (item.links.report.availability) {
        if (item.links.report.main.accessable) {
          appendString += '<p class="links"><i class="bi bi-file-text-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report available"></i><a href="http://' + item.links.report.main.url + '" target="_blank">' + item.links.report.main.title + ' <i class="bi bi-link-45deg"></i></a></p>'
        } else {
          if (item.links.report.main.url != "–") {
            appendString += '<p class="links"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report not available"></i><a href="http://' + item.links.report.main.url + '" target="_blank">' + item.links.report.main.title + ' <i class="bi bi-link-45deg"></i></a></p>'
          } else {
            appendString += '<p class="links"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report not available"></i>' + item.links.report.main.title + '</p>'
          }
        }
        if (item.links.report.multiple) {
          if (item.links.report.additional1.accessable) {
            appendString += '<p class="links"><i class="bi bi-file-text-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report available"></i><a href="http://' + item.links.report.additional1.url + '" target="_blank">' + item.links.report.additional1.title + ' <i class="bi bi-link-45deg"></i></a></p>'
          } else {
            if (item.links.report.additional1.url != "–") {
              appendString += '<p class="links"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report not available"></i><a href="http://' + item.links.report.additional1.url + '" target="_blank">' + item.links.report.additional1.title + ' <i class="bi bi-link-45deg"></i></a></p>'
            } else {
              appendString += '<p class="links"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report not available"></i>' + item.links.report.additional1.title + '</p>'
            }
          }

          if (item.links.report.additional2.title != "–") {
            if (item.links.report.additional2.accessable) {
              appendString += '<p class="links"><i class="bi bi-file-text-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report available"></i><a href="http://' + item.links.report.additional2.url + '" target="_blank">' + item.links.report.additional2.title + ' <i class="bi bi-link-45deg"></i></a></p>'
            } else {
              if (item.links.report.additional2.url != "–") {
                appendString += '<p class="links"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report not available"></i><a href="http://' + item.links.report.additional2.url + '" target="_blank">' + item.links.report.additional2.title + ' <i class="bi bi-link-45deg"></i></a></p>'
              } else {
                appendString += '<p class="links"><i class="bi bi-file-lock" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Report not available"></i>' + item.links.report.additional2.title + '</p>'
              }
            }
          }
        }
      } else {
        if (item.links.report.comment != "–") {
          appendString += '<p class="links"><i class="bi bi-file-text" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>' + item.links.report.comment + '</p>'
        } else {
          appendString += '<p class="links"><i class="bi bi-file-text" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="HER"></i>No excavation report identified</p>'
        }
      }

      appendString += '</div><div class="col-sm-4 text-align-center">'
      appendString += '<hr id="perioddivider"/>'
      appendString += '<h6>Periods represented</h6>'

      if (item.periods.prehistoric != "–") {
        appendString += addPeriodBadges(item);
      }
      appendString += '<hr/>'

      appendString += '<p class="entry"><i class="bi bi-tv-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Season"></i>' + item.broadcast.season.replace("Season 0", "Season ") + ' – ' + item.broadcast.episode + '</p>'
      appendString += '<p class="entry"><i class="bi bi-calendar-event" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Date of first broadcast"></i>' + item.broadcast.date + '</p>'
      appendString += '<p class="entry"><i class="bi bi-camera-reels-fill" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Dates when recorded"></i>' + item.recorded + '</p><hr/>'

      if (item.links.imdb.availability) {
        appendString += '<p class="entry"><i class="fa fa-imdb" style="margin-right: 15px;"></i>IMDb rating ' + item.links.imdb.rating + '/10 <a href="https://www.imdb.com/title/' + item.links.imdb.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
      } else {
        appendString += '<p class="entry"><i class="fa fa-imdb" style="margin-right: 15px;"></i>No IMDb entry</p>'
      }

      if (item.links.channel4.availability) {
        appendString += '<p class="entry"><i class="bi bi-film" style="margin-right: 11px;"></i>Available on Channel 4 <a href="http://www.channel4.com/programmes/time-team/on-demand/' + item.links.channel4.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
      } else {
        appendString += '<p class="entry"><i class="bi bi-film" style="margin-right: 11px;"></i>Not available on Channel 4</p>'
      }

      if (item.links.youtube.availability) {
        appendString += '<p class="entry"><i class="bi bi-youtube" style="margin-right: 11px;"></i>Available on YouTube <a href="https://www.youtube.com/watch?v=' + item.links.youtube.url + '" target="_blank"><i class="bi bi-link-45deg"></i></a></p>'
      } else {
        appendString += '<p class="entry"><i class="bi bi-youtube" style="margin-right: 11px;"></i>Not available on YouTube</p>'
      }
      appendString += '<hr/>'
      appendString += '<p class="entry"><i class="bi bi-clock-history" style="margin-right: 15px;" data-toggle="tooltip" data-placement="left" title="Last updated"></i>Updated on ' + item.dateupdated + '</p>'

      appendString += '</div></div></div></section>'
    }

    searchResults.innerHTML = appendString;
  } else {
    togglePageination("normal");
  }
  // activate the tooltips (after they have been created)
  $('[data-toggle="tooltip"]').tooltip()

  if (results.length == 1) {
    document.getElementById('result-count').innerHTML = results.length + ' episode found';
  } else if (results.length == 0) {
    document.getElementById('result-count').innerHTML = 'no episodes found';
  } else {
    document.getElementById('result-count').innerHTML = results.length + ' episodes found';
  }
}

(function() {

  if (window.location.pathname.includes("/season/")) {

    var json = $.getJSON({
      'url': "/time-team-database/assets/data/data.json",
      'async': false
    });

    var documents = JSON.parse(json.responseText);

    // site interaction
    var searchTerm = givenST;
    $('meta[name=description]').attr('content', givenDesc);
    document.title = givenTitle + " | Time Team Episode Database";

    const options = {
      ignoreLocation: true,
      includeScore: true,
      threshold: 0.3,
      useExtendedSearch: true,
      keys: [{
          name: "location",
          weight: 0.3
        },
        {
          name: "summary",
          weight: 0.3
        },
        {
          name: "broadcast.title",
          weight: 0.3
        },
        {
          name: "broadcast.season",
          weight: 0.2
        },
        {
          name: "broadcast.episode",
          weight: 0.2
        },
        {
          name: "country",
          weight: 0.2
        },
        {
          name: "periods.search",
          weight: 0.3
        }
      ]
    };

    const fuse = new Fuse(documents, options);
    displaySearchResults(fuse.search(searchTerm), window.store);

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

  } else {

    if (window.location.search.split('&').length < 2) {
      var url = new URL(document.location.href);
      url.searchParams.set('page', 1);
      url.searchParams.set('extended', false);
      document.location = url.href;
    } else {

      var search_threshold = 0.3;

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

      $('#chk1').click(function() {
        if ($('#chk1').is(':checked')) {
          setExtendedParameter(true);
        } else {
          setExtendedParameter(false);
        }
      });

      toggleExtended();

      if (getQueryVariable('extended') === 'true') {
        search_threshold = 0.6;
      }

      var json = $.getJSON({
        'url': "/time-team-database/assets/data/data.json",
        'async': false
      });

      var documents = JSON.parse(json.responseText);

      // search
      var searchTerm = getQueryVariable('query');

      const options = {
        ignoreLocation: true,
        includeScore: true,
        threshold: search_threshold,
        useExtendedSearch: true,
        keys: [{
            name: "location",
            weight: 0.3
          },
          {
            name: "summary",
            weight: 0.3
          },
          {
            name: "broadcast.title",
            weight: 0.3
          },
          {
            name: "broadcast.season",
            weight: 0.2
          },
          {
            name: "broadcast.episode",
            weight: 0.2
          },
          {
            name: "country",
            weight: 0.2
          },
          {
            name: "periods.search",
            weight: 0.3
          }
        ]
      };

      const fuse = new Fuse(documents, options);

      if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);
        displaySearchResults(fuse.search(searchTerm), window.store);
        document.title = "Time Team Episode Database | " + searchTerm.replace('"', '').replace('"', '');
      } else {
        displaySearchResults(fuse.search("Season"), window.store);
        document.title = "Time Team Episode Database";
      }
    }

  }
})();
