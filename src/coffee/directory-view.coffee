define [
  'directory'
  'contact'
  'contact-view'
  'json!../misc/data/contacts.json'
], (Directory, Contact, ContactView, contacts)->

  class DirectoryView extends Backbone.View

    initialize: ->
      @$el         = $("#contacts")
      @collection = new Directory(contacts)
      @$el.find("#filter").append @createSelect()
      

      @on('change:filterType', @filterByType)

      @collection.on('reset', @render)
      @collection.on('add', @renderContact)
      @collection.on('change', @updateContacts)

    events:
      "change #filter select": "setFilter"
      "click #add": "addContact"
      "click #show-form": "showForm"


    render: =>

      @$el.find("li").remove()

      @collection.each (item)=>
        @renderContact(item)


    renderContact: (item)=>

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


    addContact: (e)->
      e.preventDefault()

      formData = {}
      $("#add-contact").children('input').each (i, el)->
        $el = $(el)
        if $el.val() isnt ''
          formData[el.id] = $el.val()
      
      contacts.push formData

      
      if formData.type in @getTypes()
        @collection.add new Contact(formData)
      else
        @collection.add new Contact(formData)
        @$el.find("#filter")
          .find('select').remove()
          .end().append @createSelect()


    removeContact: (removedContact)=>
      removed = removedContact.attributes
      if removed.photo is Contact::defaults.photo
        delete removed.photo
      
      _.each contacts, (contact)->
        if _.isEqual(contact, removed)
          contacts.splice _.indexOf(contacts, contact), 1

      unless removed.type.toLowerCase() in @getTypes()
        @$el.find('#filter select').find("[value='#{removed.type.toLowerCase()}']").remove()


    showForm: (e)=>
      e.preventDefault()
      $( e.target ).toggleClass 'disabled'
      @$el.find("#add-contact").slideToggle()
    
    updateContacts: (contact)->

      prev       = contact.previousAttributes()
      attributes = {}
      
      # Clone attributes
      for key, val of contact.attributes
        attributes[key] = val

      if prev.photo is Contact::defaults.photo
        delete prev.photo
      
      if attributes.photo is Contact::defaults.photo
        delete attributes.photo

      _.each contacts, (contact)->
        if _.isEqual(contact, prev)
          contacts.splice _.indexOf(contacts, contact), 1, attributes
