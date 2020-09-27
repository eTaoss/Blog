var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var discoverPartials = require('metalsmith-discover-partials');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
.metadata({
  site: {
    name: 'MyBlog',
    description: 'My blog about anything'
  }
})
.source('./blog/src')
.destination('./build')
.use(discoverPartials({
  directory: './blog/layouts/partials',
  pattern: /\.hbs$/
}))
.use(collections({
  articles: {
    pattern: 'articles/*.md',
    sortBy: 'date',
    reverse: true
  },
}))
.use(markdown())
.use(permalinks({
  relative: false,
  pattern: ':title',
}))
.use(serve({
  port: 8081,
  verbose: true
}))
.use(watch({
  paths: {
    "${source}/**/*": true,
    "layout/**/*": "**/*",
  }
}))
.use(layouts({
  engine: 'handlebars',
  directory: './blog/layouts',
  default: 'article.hbs',
  pattern: ["*/*/*html","*/*html","*html", "*/*/*hbs", "*/*hbs", "*hbs"]
}))
.build(function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Built!');
  }
});