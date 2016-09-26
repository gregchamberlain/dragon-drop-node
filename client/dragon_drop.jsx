import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import Root from './components/root.jsx';
import { hashHistory } from 'react-router';
import * as ACTIONS from './actions/session_actions.js';
import { syncHistoryWithStore } from 'react-router-redux';
import { normalize } from 'normalizr';
import { arrayOfSites } from './actions/schema';
import { merge } from 'lodash';
require('./styles/dragon_drop.scss');

// let wing = new Audio('/assets/wing.mp3');
// let dragon = new Audio('/assets/dragon.mp3');
// document.addEventListener('click', () => dragon.play());
// document.addEventListener('mousemove', () => wing.play());
const userData = window.currentUser;
const sites = userData ? normalize(userData.sites, arrayOfSites).entities.sites : {};
const currentUser = merge({}, userData);
if (userData) delete currentUser.sites;

document.addEventListener('DOMContentLoaded', () => {

  let defaultState = userData ? {session: {currentUser}, sites} : {};
  const store = window.rootStore = configureStore(defaultState);
  const history = syncHistoryWithStore(hashHistory, store);
  const root = document.getElementById('root');

  render(
    <Root store={store} history={hashHistory}/>
  , root);
});
