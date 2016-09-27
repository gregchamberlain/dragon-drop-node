'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDndLayout = require('react-dnd-layout');

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Row: _reactDndLayout.Row, Column: _reactDndLayout.Column, Text: _reactDndLayout.Text, Title: _reactDndLayout.Title, Link: _link2.default
};