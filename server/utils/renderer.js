const React =  require('react');
const renderToString = require('react-dnd-layout').renderToString;
const Catalog = require('../../catalog/lib');

const renderPageToString = page => renderToString(
  page.items, "root", Catalog
);

module.exports = renderPageToString;
