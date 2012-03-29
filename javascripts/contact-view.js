(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['text!../misc/templates/contact.html'], function(contactTemplate) {
    var ContactView;
    return ContactView = (function(_super) {

      __extends(ContactView, _super);

      function ContactView() {
        ContactView.__super__.constructor.apply(this, arguments);
      }

      ContactView.prototype.tagName = 'li';

      ContactView.prototype.className = 'contact-container';

      ContactView.prototype.template = contactTemplate;

      ContactView.prototype.render = function() {
        var tmpl;
        tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
      };

      ContactView.prototype.events = {
        "click button.delete": 'deleteContact'
      };

      ContactView.prototype.deleteContact = function() {
        var removedType;
        removedType = this.model.get('type').toLowerCase();
        this.model.destroy();
        return this.remove();
      };

      return ContactView;

    })(Backbone.View);
  });

}).call(this);
