require 'rubygems'
require 'sinatra'
require 'sinatra/assetpack'
require 'mail'
require 'sinatra/flash'

class COD3RS < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :protection, :except => :frame_options
  enable :sessions

  register Sinatra::Flash
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
      '/js/owl.carousel.min.js',
      '/js/ajax-forms.js'
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
      :password => ENV['smpt_password'], :authentication => 'plain',
      :enable_starttls_auto => true,
      :openssl_verify_mode  => 'none'
    }
  end

  get '/' do
    erb :start
  end

  post '/mail' do
    contact_params = params.dup
    begin
      contact_body = erb :contact_template, layout: false, locals: {name: params[:name], email: params[:email], text: params[:text]}
      sender_body = erb :sender_template, layout: false, locals: {name: params[:name], email: params[:email], text: params[:text]}

      Mail.deliver do
        to "contact@cod3rs.co"
        from contact_params[:email]
        subject contact_params[:subject]
        html_part do
          content_type 'text/html; charset=UTF-8'
          body contact_body
        end
      end
      Mail.deliver do
        to contact_params[:email]
        from "noreply@cod3rs.co"
        subject contact_params[:subject]
        html_part do
          content_type 'text/html; charset=UTF-8'
          body sender_body
        end
      end
      flash[:success] = "Thank you for your message. We'll be in touch soon."
    rescue Exception => exception
      flash[:error] = "Upss... Something goes wrong. We work on it."
    end
    styled_flash
  end
end
