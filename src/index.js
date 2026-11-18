'use strict';

const Theme = require('./core/theme');
const Camera = require('./core/camera');
const Effects = require('./core/draw-effects');
const Layout = require('./core/layout');
const Connectors = require('./core/connectors');
const Icons = require('./core/icons');
const Primitives = require('./illustrations/primitives');
const Archetypes = require('./illustrations/archetypes');
const Runner = require('./core/runner');

// Merge Primitives + Archetypes under Illustrations for ergonomic one-stop access,
// while also exposing Archetypes explicitly.
const Illustrations = Object.assign({}, Primitives, Archetypes);

const TechVideoStudio = {
  version: '2.0.0',
  Theme,
  Camera,
  Effects,
  Layout,
  Connectors,
  Icons,
  Illustrations,
  Archetypes,
  createVideo: Runner.createVideo
};

if (typeof window !== 'undefined') {
  window.TechVideoStudio = TechVideoStudio;
}

module.exports = TechVideoStudio;
