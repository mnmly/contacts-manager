require.config
  baseUrl: '/javascripts'
  paths:
    order:       "order"
    jquery:      "jquery.min"
    modernizr:   "modernizr.foundation"
    reveal:      "jquery.reveal"
    orbit:       "jquery.orbit-1.4.0"
    customforms: "jquery.customforms"
    placeholder: "jquery.placeholder.min"
    tooltips:    "jquery.tooltips"
    app:         "app"

  priority:[
    'modernizr'
    'jquery'
  ]

require [
  'reveal'
  'orbit'
  'customforms'
  'placeholder'
  'tooltips'
  'app'
], ->
  console.log "Dependencies are loaded"
