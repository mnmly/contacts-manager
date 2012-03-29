require.config
  waitSeconds: 10
  baseUrl:       '/javascripts'
  paths:
    jquery:      'libs/jquery.min'
    backbone:    'libs/backbone-min'
    underscore:  'libs/underscore-min'

    order:       'libs/rjs-plugins/order'
    text:        'libs/rjs-plugins/text'
    json:        'libs/rjs-plugins/json'

  priority:[
    'underscore'
    'jquery'
    'backbone'
    'text'
    'order'
  ]

require [
  'app'
], (App)->
  window.app = new App
