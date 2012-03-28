(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function() {
    var Contact;
    return Contact = (function(_super) {

      __extends(Contact, _super);

      function Contact() {
        Contact.__super__.constructor.apply(this, arguments);
      }

      Contact.prototype.defaults = {
        photo: '/images/user_64.png'
      };

      return Contact;

    })(Backbone.Model);
  });

}).call(this);
