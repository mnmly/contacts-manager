(function() {

  define(['contacts-router'], function(ContactsRouter) {
    var App;
    return App = (function() {

      function App() {
        this.router = new ContactsRouter();
        Backbone.history.start();
      }

      return App;

    })();
  });

}).call(this);
