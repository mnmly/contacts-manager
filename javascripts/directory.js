(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['contact'], function(Contact) {
    var Directory;
    return Directory = (function(_super) {

      __extends(Directory, _super);

      function Directory() {
        Directory.__super__.constructor.apply(this, arguments);
      }

      Directory.prototype.model = Contact;

      return Directory;

    })(Backbone.Collection);
  });

}).call(this);
