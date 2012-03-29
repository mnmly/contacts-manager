define ['contacts-router'], (ContactsRouter)->

  class App

    constructor: ->
      @router        = new ContactsRouter()
      @router.directoryView.render()
      Backbone.history.start()
      
