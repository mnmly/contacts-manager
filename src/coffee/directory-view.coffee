define [
  'directory'
  'contact-view'
  'json!../misc/data/contacts.json'
], (Directory, ContactView, contacts)->

  class DirectoryView extends Backbone.View

    el: $("#contacts")

    initialize: ->
      @collection = new Directory(contacts)
      @render()

    render: ->
      @collection.each (item)=>
        @renderContact(item)


    renderContact: (item)->

      contactView = new ContactView model: item
      @$el.append contactView.render().el
        
