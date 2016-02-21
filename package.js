Package.describe({
  summary: 'Operator behavior for Meteor Astronomy',
  version: '1.0.0',
  name: 'snowyu:astronomy-operator-behavior',
  git: 'https://github.com/snowyu/meteor-astronomy-operator-behavior.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@1.2.0');
  api.use('underscore');

  // Behavior.
  api.addFiles('lib/behavior/events.js', ['client', 'server']);
  api.addFiles('lib/behavior/behavior.js', ['client', 'server']);
});
