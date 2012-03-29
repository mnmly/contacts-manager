define ['directory-view'], (DirectoryView)->

  class ContactsRouter extends Backbone.Router
    initialize: ->
      @directoryView = new DirectoryView()
      @directoryView.router = @
      @directoryView.render()

    routes:
      'filter/:type': 'urlFilter'

    urlFilter: (type)->
      @directoryView.filterType = type
      @directoryView.trigger('change:filterType')
      
