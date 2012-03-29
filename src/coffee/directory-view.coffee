define [
  'directory'
  'contact-view'
  'json!../misc/data/contacts.json'
], (Directory, ContactView, contacts)->

  class DirectoryView extends Backbone.View

    initialize: ->
      @$el         = $("#contacts")
      @collection = new Directory(contacts)
      @$el.find("#filter").append @createSelect()
      
      @on('change:filterType', @filterByType)
      @collection.on('reset', @render)

    events:
      "change #filter select": "setFilter"


    render: =>

      @$el.find("li").remove()

      @collection.each (item)=>
        @renderContact(item)


    renderContact: (item)->

      contactView = new ContactView model: item
      @$el.append contactView.render().el
    

    getTypes: ->
      _.uniq @collection.pluck('type'), no, (type)->
        type.toLowerCase()


    createSelect: ->
      $filter = @$el.find("#filter")
      $select = $("<select/>",
        html: "<option value='all'>All</option>"
      )

      _.each @getTypes(), (item)->
        $option = $("<option/>",
          value: item.toLowerCase()
          text: item.toLowerCase()
        ).appendTo $select
      $select


    # setFilter
    setFilter: (e)=>
      @filterType = e.currentTarget.value
      @trigger('change:filterType')
    
    filterByType: =>
      if @filterType is 'all'
        @collection.reset(contacts)
        @router.navigate "filter/all"

      else

        @collection.reset contacts, silent: yes

        filterType = @filterType
        filtered   = @collection.filter ( item )->
          item.get('type').toLowerCase() is filterType

        @collection.reset filtered
        @router.navigate "filter/#{filterType}"


