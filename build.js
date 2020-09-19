var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');

metalsmith(__dirname)
.metadata({
  site: {
    name: 'JansBlog',
    description: "My blog about ... stuff."
  }
})
.source('./jansblog/src')
.destination('./public')
.use(markdown())
.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('JansBlog built!');
  }
});