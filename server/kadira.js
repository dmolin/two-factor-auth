const kadiraSettings = Meteor.settings.private.kadira

if(!kadiraSettings) return

Kadira.connect(kadiraSettings.key1, kadiraSettings.key2)
