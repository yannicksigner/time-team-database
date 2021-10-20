# About this website

The aim of this website is twofold. First, it should attempt to provide a complete overview of the archaeological work conducted by Time Team between 1994 and 2014. The only other resources that have tried similar data collections are the episode overviews found on Wikipedia (e.g. for [Season 5](https://en.wikipedia.org/wiki/Time_Team_(series_5))) and on Time Team 'fan-sites' (e.g. the now unavailable [unofficial Time Team site](https://web.archive.org/web/20080104131324/http://www.timeteam.k1z.com/index.php?pid=32)). However, these collections lack(ed) the archaeological information that would have allowed for a more detailed insight into the work by the tv show. As such, there was a need to synthesise the archaeological work created by the show in an easily searchable format.

Second, many of the site locations investigated by Time Team have only seen little subsequent work. The evidence uncovered by the show can therefore be reinterpreted and compared in light of more recent research. As such, an overview of the previous work by the tv show should make such research attempts easier.

### Which resources have been used?
A variety of repositories have been consulted in order to identify relevant data regarding the work undertaken during each episode:

* [Historic England NRHE Excavation Index](https://archaeologydataservice.ac.uk/archsearch/browser.xhtml) hosted by the ADS
* [Library of Unpublished Fieldwork Reports](https://archaeologydataservice.ac.uk/archives/view/greylit/query.cfm) hosted by the ADS
* Various regional (e.g. [Somerset HER](https://www.somersetheritage.org.uk/)) and national (e.g. [Wales HER](https://archwilio.org.uk/arch/)) Historic Environment Record repositories
* The [Heritage Gateway](https://heritagegateway.org.uk/gateway/default.aspx)
* The [Wessex Archaeology Time Team Overview](https://www.wessexarch.co.uk/our-work/time-team)

### How was this website created?

This website is hosted on [GitHub Pages](https://pages.github.com/) and connects to a public GitHub repository (which can be found here: [yannicksigner/time-team-database](https://github.com/yannicksigner/time-team-database)). The template used is the bootstrap 4 template by [nicolas-van/bootstrap-4-github-pages](https://github.com/nicolas-van/bootstrap-4-github-pages).

The search engine used in this project is [fuse.js](https://fusejs.io/) which allows the fuzzy searching of content. The main reason this engine was selected over others like [lunr](https://lunrjs.com/) is its ability to search through nested JSON objects. The underlying data is being collected in a Google Sheet, which can be found [here](https://docs.google.com/spreadsheets/d/13tlJfWIflEA2xGpRRfYw1xoQcGypCpukEkqpt4XYaEY/edit#gid=0).

### Wrong link? Missing content?

In case that there are any issues with some of the content shown on the website or suggestions for future improvement, just drop me an email at yannick.signer@gmail.com. Alternatively, pull requests can be made through the [GitHub repository](https://github.com/yannicksigner/time-team-database/pulls).

### How do I cite this?

This website can be cited as follows:

> Signer (2021) Time Team Episode Database [data-set]. Available at: https://yannicksigner.github.io/time-team-database/
