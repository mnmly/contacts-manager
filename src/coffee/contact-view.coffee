define [ 'text!../misc/templates/contact.html'
'text!../misc/templates/contact-edit.html'], (contactTemplate, editTemplate)->

  class ContactView extends Backbone.View

    tagName: 'li'
    className: 'contact-container'
    template: contactTemplate
    editTemplate: editTemplate

    render: ->
      tmpl = _.template(@template)
      @$el.html(tmpl(@model.toJSON()))
      @

    events:
      "change select.type": "addType"
      "click button.delete": 'deleteContact'
      "click button.edit": "editContact"
      "click button.save": "saveEdits"
      "click button.cancel": "cancelEdit"
    
    addType: (e)->
      if @$typeSelect.val() is 'add-type'
        $input = $('<input/>',
          "class": "type input-text"
          "placeholder": "type"
        )
        @$typeSelect.after($input).remove()
        $input.focus()

     

    deleteContact: ->

      removedType = @model.get('type').toLowerCase()
      @model.destroy()
      @remove()


    editContact: =>
      tmpl    = _.template @editTemplate
      @$el.html(tmpl(@model.toJSON()))

      $newOpt = $("<option/>",
        html: "<em>Add new...</em>"
        value: "add-type"
      )
      currentValue = @model.get('type').toLowerCase()
      @$typeSelect  = $("#filter select").clone().append $newOpt
      @$typeSelect.attr('name', 'type').val(currentValue).addClass 'type'
      @$el.find("#type").after(@$typeSelect).remove()

  
    saveEdits: (e)=>
      
      e.preventDefault()
      formData = {}
      prev     = @model.previousAttributes()
      
      $(e.target).closest("form").find(":input").add(".photo").each ->
        $el = $(this)
        return if $el.is('button')
        formData[$el.attr("name")] = $el.val()

      if formData.photo is ""
        delete formData.photo
      
      @model.set formData

      @render()

      if prev.photo is "/img/placeholder.png"
        delete prev.photo

    cancelEdit: (e)=>
      e.preventDefault()
      @render()
