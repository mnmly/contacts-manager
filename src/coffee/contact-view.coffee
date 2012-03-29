define ['text!../misc/templates/contact.html'], (contactTemplate)->

  class ContactView extends Backbone.View

    tagName: 'li'
    className: 'contact-container'
    template: contactTemplate

    render: ->
      tmpl = _.template(@template)
      @$el.html(tmpl(@model.toJSON()))
      @

    events:
      "click button.delete": 'deleteContact'


    deleteContact: ->

      removedType = @model.get('type').toLowerCase()
      @model.destroy()
      @remove()
