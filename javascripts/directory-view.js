(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['directory', 'contact', 'contact-view', 'json!../misc/data/contacts.json'], function(Directory, Contact, ContactView, contacts) {
    var DirectoryView;
    return DirectoryView = (function(_super) {

      __extends(DirectoryView, _super);

      function DirectoryView() {
        this.showForm = __bind(this.showForm, this);
        this.removeContact = __bind(this.removeContact, this);
        this.filterByType = __bind(this.filterByType, this);
        this.setFilter = __bind(this.setFilter, this);
        this.renderContact = __bind(this.renderContact, this);
        this.render = __bind(this.render, this);
        DirectoryView.__super__.constructor.apply(this, arguments);
      }

      DirectoryView.prototype.initialize = function() {
        this.$el = $("#contacts");
        this.collection = new Directory(contacts);
        this.$el.find("#filter").append(this.createSelect());
        this.on('change:filterType', this.filterByType);
        this.collection.on('reset', this.render);
        this.collection.on('add', this.renderContact);
        return this.collection.on('remove', this.removeContact);
      };

      DirectoryView.prototype.events = {
        "change #filter select": "setFilter",
        "click #add": "addContact",
        "click #show-form": "showForm"
      };

      DirectoryView.prototype.render = function() {
        var _this = this;
        this.$el.find("li").remove();
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

      DirectoryView.prototype.getTypes = function() {
        return _.uniq(this.collection.pluck('type'), false, function(type) {
          return type.toLowerCase();
        });
      };

      DirectoryView.prototype.createSelect = function() {
        var $filter, $select;
        $filter = this.$el.find("#filter");
        $select = $("<select/>", {
          html: "<option value='all'>All</option>"
        });
        _.each(this.getTypes(), function(item) {
          var $option;
          return $option = $("<option/>", {
            value: item.toLowerCase(),
            text: item.toLowerCase()
          }).appendTo($select);
        });
        return $select;
      };

      DirectoryView.prototype.setFilter = function(e) {
        this.filterType = e.currentTarget.value;
        return this.trigger('change:filterType');
      };

      DirectoryView.prototype.filterByType = function() {
        var filterType, filtered;
        if (this.filterType === 'all') {
          this.collection.reset(contacts);
          return this.router.navigate("filter/all");
        } else {
          this.collection.reset(contacts, {
            silent: true
          });
          filterType = this.filterType;
          filtered = this.collection.filter(function(item) {
            return item.get('type').toLowerCase() === filterType;
          });
          this.collection.reset(filtered);
          return this.router.navigate("filter/" + filterType);
        }
      };

      DirectoryView.prototype.addContact = function(e) {
        var formData, _ref;
        e.preventDefault();
        formData = {};
        $("#add-contact").children('input').each(function(i, el) {
          var $el;
          $el = $(el);
          if ($el.val() !== '') return formData[el.id] = $el.val();
        });
        contacts.push(formData);
        if (_ref = formData.type, __indexOf.call(this.getTypes(), _ref) >= 0) {
          return this.collection.add(new Contact(formData));
        } else {
          this.collection.add(new Contact(formData));
          return this.$el.find("#filter").find('select').remove().end().append(this.createSelect());
        }
      };

      DirectoryView.prototype.removeContact = function(removedContact) {
        var removed, _ref;
        removed = removedContact.attributes;
        if (removed.photo === Contact.prototype.defaults.photo) {
          delete removed.photo;
        }
        _.each(contacts, function(contact) {
          if (_.isEqual(contact, removed)) {
            return contacts.splice(_.indexOf(contacts, contact), 1);
          }
        });
        if (_ref = removed.type.toLowerCase(), __indexOf.call(this.getTypes(), _ref) < 0) {
          return this.$el.find('#filter select').find("[value='" + (removed.type.toLowerCase()) + "']").remove();
        }
      };

      DirectoryView.prototype.showForm = function(e) {
        e.preventDefault();
        $(e.target).toggleClass('disabled');
        return this.$el.find("#add-contact").slideToggle();
      };

      return DirectoryView;

    })(Backbone.View);
  });

}).call(this);
