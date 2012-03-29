define ['contacts-router'], (ContactsRouter)->

  class App

    constructor: ->
      @router = new ContactsRouter()
      Backbone.history.start()
      
