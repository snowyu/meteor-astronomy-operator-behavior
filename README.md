# Operator behavior for Meteor Astronomy

The `operator` behavior adds two fields that store information about document's creator and updater.


You can add the behavior to your project by executing the following command.

    meteor add snowyu:astronomy-operator-behavior

The operator behavior comes with following options. Options names are self explanatory.

```js
behaviors: {
  operator: {
    hasCreatorField: true,
    hasCustomCreator: true,
    creatorFieldName: 'createdBy',
    hasUpdaterField: true,
    updaterFieldName: 'updatedBy',
    systemUserId: 0
  }
}
```

Let's take a look at the behavior usage.

```js
var post = new Post();
//You can set the createdBy if hasCustomCreator is true:
//Or the logined meteor.userId added.
//Or the systemUserId added if no logined.
post.set('createdBy', 'theAuthorUserId');
post.save();

post.createdBy; // A document creator id.

/* ... */

post.save();
post.updatedBy; // A document updater id.
```
