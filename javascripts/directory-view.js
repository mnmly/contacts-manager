(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['directory', 'contact-view', 'json!../misc/data/contacts.json'], function(Directory, ContactView, contacts) {
    var DirectoryView;
    return DirectoryView = (function(_super) {

      __extends(DirectoryView, _super);

      function DirectoryView() {
        this.filterByType = __bind(this.filterByType, this);
        this.setFilter = __bind(this.setFilter, this);
        this.render = __bind(this.render, this);
        DirectoryView.__super__.constructor.apply(this, arguments);
      }

      DirectoryView.prototype.initialize = function() {
        this.$el = $("#contacts");
        this.collection = new Directory(contacts);
        this.$el.find("#filter").append(this.createSelect());
        this.on('change:filterType', this.filterByType);
        return this.collection.on('reset', this.render);
      };

      DirectoryView.prototype.events = {
        "change #filter select": "setFilter"
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

      return DirectoryView;

    })(Backbone.View);
  });

}).call(this);
