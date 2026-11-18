'use strict';

const Theme = require('./core/theme');
const Layout = require('./core/layout');
const Connectors = require('./core/connectors');
const Icons = require('./core/icons');
const Illustrations = require('./illustrations/primitives');
const Runner = require('./core/runner');

const TechVideoStudio = {
  Theme,
  Layout,
  Connectors,
  Icons,
  Illustrations,
  createVideo: Runner.createVideo
};

if (typeof window !== 'undefined') {
  window.TechVideoStudio = TechVideoStudio;
}

module.exports = TechVideoStudio;
