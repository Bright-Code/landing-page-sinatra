require 'rubygems'
require 'sinatra'
require 'sinatra/assetpack'
require 'mail'

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

  Mail.defaults do
    delivery_method :smtp, {
      :address => 'mailng.az.pl',
      :port => 587,
      :domain => 'cod3rs.co',
      :user_name => ENV['smtp_login'],
      :password => ENV['smpt_password'],
      :authentication => 'plain',
      :enable_starttls_auto => true,
      :openssl_verify_mode  => 'none'
    }
  end

  get '/' do
    erb :start
  end

  post '/mail' do
    contact_params = params.dup
    mail = Mail.deliver do
      to "contact@cod3rs.co"
      from contact_params[:email]
      subject contact_params[:subject]
      text_part do
        body contact_params[:text]
      end
    end
  end
end
