(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['text!../misc/templates/contact.html', 'text!../misc/templates/contact-edit.html'], function(contactTemplate, editTemplate) {
    var ContactView;
    return ContactView = (function(_super) {

      __extends(ContactView, _super);

      function ContactView() {
        this.cancelEdit = __bind(this.cancelEdit, this);
        this.saveEdits = __bind(this.saveEdits, this);
        this.editContact = __bind(this.editContact, this);
        ContactView.__super__.constructor.apply(this, arguments);
      }

      ContactView.prototype.tagName = 'li';

      ContactView.prototype.className = 'contact-container';

      ContactView.prototype.template = contactTemplate;

      ContactView.prototype.editTemplate = editTemplate;

      ContactView.prototype.render = function() {
        var tmpl;
        tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
      };

      ContactView.prototype.events = {
        "change select.type": "addType",
        "click button.delete": 'deleteContact',
        "click button.edit": "editContact",
        "click button.save": "saveEdits",
        "click button.cancel": "cancelEdit"
      };

      ContactView.prototype.addType = function(e) {
        var $input;
        if (this.$typeSelect.val() === 'add-type') {
          $input = $('<input/>', {
            "class": "type input-text",
            "placeholder": "type"
          });
          this.$typeSelect.after($input).remove();
          return $input.focus();
        }
      };

      ContactView.prototype.deleteContact = function() {
        var removedType;
        removedType = this.model.get('type').toLowerCase();
        this.model.destroy();
        return this.remove();
      };

      ContactView.prototype.editContact = function() {
        var $newOpt, currentValue, tmpl;
        tmpl = _.template(this.editTemplate);
        this.$el.html(tmpl(this.model.toJSON()));
        $newOpt = $("<option/>", {
          html: "<em>Add new...</em>",
          value: "add-type"
        });
        currentValue = this.model.get('type').toLowerCase();
        this.$typeSelect = $("#filter select").clone().append($newOpt);
        this.$typeSelect.attr('name', 'type').val(currentValue).addClass('type');
        return this.$el.find("#type").after(this.$typeSelect).remove();
      };

      ContactView.prototype.saveEdits = function(e) {
        var formData, prev;
        e.preventDefault();
        formData = {};
        prev = this.model.previousAttributes();
        $(e.target).closest("form").find(":input").add(".photo").each(function() {
          var $el;
          $el = $(this);
          if ($el.is('button')) return;
          return formData[$el.attr("name")] = $el.val();
        });
        if (formData.photo === "") delete formData.photo;
        this.model.set(formData);
        this.render();
        if (prev.photo === "/img/placeholder.png") return delete prev.photo;
      };

      ContactView.prototype.cancelEdit = function(e) {
        e.preventDefault();
        return this.render();
      };

      return ContactView;

    })(Backbone.View);
  });

}).call(this);
