require 'rubygems'
require 'sinatra'
require 'sinatra/assetpack'
require 'mail'

class COD3RS < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :protection, :except => :frame_options

  register Sinatra::AssetPack

  assets do
    serve '/javascripts', from: 'public/js'
    serve '/stylesheets', from: 'public/css'
    serve '/fonts',       from: 'public/fonts'

    js :application, [
      '/js/jquery-1.11.0.min.js',
      '/js/jquery.easing-1.3.min.js',
      '/js/jquery.nicescroll.min.js',
      '/js/jquery.stellar.min.js',
      '/js/bootstrap.min.js',
      '/js/main.js',
      '/js/modernizr-2.6.2-respond-1.1.0.min.js',
      '/js/owl.carousel.min.js'
    ]

    css :application, [
      '/css/bootstrapG.css',
      '/css/main.css',
      '/css/plugins.css',
      '/css/icons.css'
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
