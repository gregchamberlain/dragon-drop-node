import React, { PropTypes, Component } from 'react';
import { string, select, object, number } from 'react-formulate';
import { Link } from 'react-router';

const DynamicLink = ({ to, text, ...props }, { preview }) => (
    <Link to={preview ? `preview/${preview}${to}` : to } {...props}>{text}</Link>
);

DynamicLink.generateInputs = info => object({
  text: string({label: 'Text'}),
  to: select(info.pages.map(page => ({value: page.path, name: page.name})), {label: 'To'}),
  style: object({
    flex: number({label: 'Flex'}),
    fontSize: number({label: 'Font Size'}),
    fontWeight: string({label: 'Font Weight'}),
    padding: number({label: 'Padding'}),
    textAlign: string({label: 'Text Align'}),
    color: string({label: 'Font Color'}),
    textShadow: string({label: 'Text Shadow'})
  }, {label: 'Style'}),
});

DynamicLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string
};

DynamicLink.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
  </svg>
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
    textDecoration: 'none',
  },
};

DynamicLink.contextTypes = {
  preview: PropTypes.string,
  info: PropTypes.object
};

export default DynamicLink;
