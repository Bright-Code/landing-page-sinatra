require 'rubygems'
require 'sinatra'
require 'sinatra/assetpack'

class BrightCode < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :protection, :except => :frame_options

  register Sinatra::AssetPack

  assets do
    serve '/javascripts', from: 'public/js'
    serve '/stylesheets', from: 'public/css'
    serve '/fonts',       from: 'public/fonts'

    js :application, [
      '/js/jquery-1.11.0.js',
      '/js/bootstrap.min.js',
      '/js/main.js',
      '/js/less.min.js',
      '/js/jquery.fractionslider.min.js'
    ]

    css :application, [
      '/css/bootstrap.min.css',
      '/css/landing-page.css',
      '/css/skill_circle.css',
      '/css/about_us.css',
      '/css/fractionslider.css'
    ]

    js_compression :jsmin
    css_compression :sass
    prebuild true
  end

  get '/' do
    erb :start
  end
end
