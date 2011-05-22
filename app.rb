require 'rubygems' if RUBY_VERSION < '1.9'
require 'sinatra';
require 'json'
require 'yaml'
require 'capistrano'
# Because every deployment scheme should have an "I Win" button

class App < Sinatra::Base
  set :static, true
  set :public, File.dirname(__FILE__) + '/public'
  
  get '/' do
    erb :index
  end
  
  get '/status.json' do
    content_type :json
    File.open( File.expand_path('../data/build.json', __FILE__) ).read
  end
  
  post '/status.json' do
    File.open(File.expand_path('../data/build.json', __FILE__), 'w') { |f|
      f.write(params.to_json)
    }
  end
  
  post '/deploy' do
    File.open(File.expand_path('../data/build.json', __FILE__), 'w') { |f|
      f.write(params.to_json)
    }
    `cap staging deploy`
    File.open(File.expand_path('../data/build.json', __FILE__), 'w') { |f|
      f.write(
        { :status => "deployed", :last_built => DateTime.now  }.to_json
      )
    }
    erb :index
  end
end

