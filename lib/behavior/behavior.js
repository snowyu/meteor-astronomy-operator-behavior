Astro.createBehavior({
  name: 'operator',
  methods: {
    setCreator: function(doc) {
      var Class = doc.constructor;

      // Find a class on which the behavior had been set.
      var classBehavior = Class.getBehavior('operator');
      var options = classBehavior.options;

      // Get current user id.
      var userId = Meteor.userId() || options.systemUserId;

      // If the "hasCreatorField" option is set.
      if (options.hasCreatorField) {
        if (!(options.hasCustomCreator && doc.get(options.creatorFieldName)))
          // Set value for createdBy field if not hasCustomCreator or createdBy is null.
          doc.set(options.creatorFieldName, userId);
      }

      if (options.hasUpdaterField) {
        // Set value for the "updatedBy" field.
        doc.set(options.updaterFieldName, userId);
      }
    },
    setUpdater: function(doc) {
      var Class = doc.constructor;

      // Find a class on which the behavior had been set.
      var classBehavior = Class.getBehavior('operator');
      var options = classBehavior.options;

      // If the "hasUpdaterField" option is set.
      if (options.hasUpdaterField) {
        // We only set the "updatedBy" field if there are any changes.
        if (_.size(doc.getModified())) {
          var userId = Meteor.userId() || options.systemUserId;
          // Set value for the "updatedBy" field.
          doc.set(options.updaterFieldName, userId);
        }
      }
    }
  },
  options: {
    hasCreatorField: true,
    hasCustomCreator: true,
    creatorFieldName: 'createdBy',
    hasUpdaterField: true,
    updaterFieldName: 'updatedBy',
    systemUserId: 0
  },
  createSchemaDefinition: function(options) {
    var schemaDefinition = {
      fields: {},
      events: events
    };

    if (options.hasCreatorField) {
      // Add a field for storing a creation date.
      schemaDefinition.fields[options.creatorFieldName] = {
        type: 'string',
        immutable: true,
        default: null
      };
    }

    if (options.hasUpdaterField) {
      // Add a field for storing an update date.
      schemaDefinition.fields[options.updaterFieldName] = {
        type: 'string',
        optional: true,
        default: null
      };
    }

    return schemaDefinition;
  }
});
