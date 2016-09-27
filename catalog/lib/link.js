'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormulate = require('react-formulate');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DynamicLink = function DynamicLink(_ref, _ref2) {
  var to = _ref.to;
  var text = _ref.text;

  var props = _objectWithoutProperties(_ref, ['to', 'text']);

  var preview = _ref2.preview;
  return _react2.default.createElement(
    _reactRouter.Link,
    _extends({ to: preview ? 'preview/' + preview + to : to }, props),
    text
  );
};

DynamicLink.generateInputs = function (info) {
  return (0, _reactFormulate.object)({
    text: (0, _reactFormulate.string)({ label: 'Text' }),
    to: (0, _reactFormulate.select)(info.pages.map(function (page) {
      return { value: page.path, name: page.name };
    }), { label: 'To' }),
    style: (0, _reactFormulate.object)({
      flex: (0, _reactFormulate.number)({ label: 'Flex' }),
      fontSize: (0, _reactFormulate.number)({ label: 'Font Size' }),
      fontWeight: (0, _reactFormulate.string)({ label: 'Font Weight' }),
      padding: (0, _reactFormulate.number)({ label: 'Padding' }),
      textAlign: (0, _reactFormulate.string)({ label: 'Text Align' }),
      color: (0, _reactFormulate.string)({ label: 'Font Color' }),
      textShadow: (0, _reactFormulate.string)({ label: 'Text Shadow' })
    }, { label: 'Style' })
  });
};

DynamicLink.propTypes = {
  to: _react.PropTypes.string,
  text: _react.PropTypes.string
};

DynamicLink.Icon = _react2.default.createElement(
  'svg',
  { fill: '#eee', height: '48', viewBox: '0 0 24 24', width: '48', xmlns: 'http://www.w3.org/2000/svg' },
  _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
  _react2.default.createElement('path', { d: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z' })
);

DynamicLink.defaultProps = {
  text: "Link",
  to: '/',
  style: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'normal',
    boxSizing: 'border-box',
    padding: 10,
    textAlign: 'inherit',
    color: 'inherit',
    textShadow: 'inherit',
    textDecoration: 'none'
  }
};

DynamicLink.contextTypes = {
  preview: _react.PropTypes.string,
  info: _react.PropTypes.object
};

exports.default = DynamicLink;