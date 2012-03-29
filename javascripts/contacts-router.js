(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['directory-view'], function(DirectoryView) {
    var ContactsRouter;
    return ContactsRouter = (function(_super) {

      __extends(ContactsRouter, _super);

      function ContactsRouter() {
        ContactsRouter.__super__.constructor.apply(this, arguments);
      }

      ContactsRouter.prototype.initialize = function() {
        this.directoryView = new DirectoryView();
        this.directoryView.router = this;
        return this.directoryView.render();
      };

      ContactsRouter.prototype.routes = {
        'filter/:type': 'urlFilter'
      };

      ContactsRouter.prototype.urlFilter = function(type) {
        this.directoryView.filterType = type;
        return this.directoryView.trigger('change:filterType');
      };

      return ContactsRouter;

    })(Backbone.Router);
  });

}).call(this);
