events = {};

events.beforeInsert = function() {
  var doc = this;
  var Class = doc.constructor;
  Class.getBehavior('operator').setCreator(doc);
};

events.beforeUpdate = function() {
  var doc = this;
  var Class = doc.constructor;
  Class.getBehavior('operator').setUpdater(doc);
};
