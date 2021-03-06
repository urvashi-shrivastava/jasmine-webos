/*
 This code stubs/fakes out Mojo under test.

 When testing in the emulator, Jasmine spies are introduced on some ekey functions.

 When testing in a desktop browser, where there is no Mojo defined, fake Mojo objects & properties are defined enough
 for useful testing.
 */
jasmine.webos.initTestMojo = function() {
  window.$L = function(toLoc) {
    if (typeof toLoc == "string") {
      return toLoc;
    } else if (typeof toLoc == "object") {
      return toLoc["value"] || "a string";
    }
    return "a string";
  };
  // fake out the version string
  window.PalmSystem = {
    version: "a fake version string"
  };

  // fake out enough Mojo
  window.Mojo = {
    appInfo: eval('(' + loadFile('appinfo.json') + ')'),
    doNothing: function() {
    },
    Event: {
      listen: jasmine.createSpy('listen'),
      stopListening: jasmine.createSpy('stopListening'),
      stageDeactivate: 'stage deactivate event',
      stageActivate: 'stage activate',
      command: 'command',
      commandEnable: 'commandEnable',
      make: function(type, extras) {
        var event = {
          stop: function() {
          },
          stopPropagation: function() {
          },
          preventDefault: function() {
          }
        };
        event.type = type;
        event = Object.extend(event, extras || {});
        return event;
      }
    },
    Menu: {
      commandMenu: 'command',
      viewMenu: 'view',
      appMenu: 'app'
    },
    Log: {
      error: jasmine.createSpy('Mojo.Log.error').andCallFake(function() {
        console.error.apply(console, arguments);
      })
    }
  }
};