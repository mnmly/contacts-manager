(function() {

  define(['contacts-router'], function(ContactsRouter) {
    var App;
    return App = (function() {

      function App() {
        this.router = new ContactsRouter();
        this.router.directoryView.render();
        Backbone.history.start();
      }

      return App;

    })();
  });

}).call(this);
