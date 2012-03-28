(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['directory', 'contact-view', 'json!../misc/data/contacts.json'], function(Directory, ContactView, contacts) {
    var DirectoryView;
    return DirectoryView = (function(_super) {

      __extends(DirectoryView, _super);

      function DirectoryView() {
        DirectoryView.__super__.constructor.apply(this, arguments);
      }

      DirectoryView.prototype.el = $("#contacts");

      DirectoryView.prototype.initialize = function() {
        this.collection = new Directory(contacts);
        return this.render();
      };

      DirectoryView.prototype.render = function() {
        var _this = this;
        return this.collection.each(function(item) {
          return _this.renderContact(item);
        });
      };

      DirectoryView.prototype.renderContact = function(item) {
        var contactView;
        contactView = new ContactView({
          model: item
        });
        return this.$el.append(contactView.render().el);
      };

      return DirectoryView;

    })(Backbone.View);
  });

}).call(this);
