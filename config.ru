$LOAD_PATH << File.dirname( File.expand_path(__FILE__) )
require 'app'

set :app_file,         'app.rb'
set :environment,      :production

disable :run, :reload
 
run App.new
