rails_env = "staging"

set :rails_env, "#{rails_env}"
set :deploy_to, "/srv/healthism/#{rails_env}/"

role :app, "#{rails_env}.healthism.com"
role :web, "#{rails_env}.healthism.com"
role :db,  "#{rails_env}.healthism.com", :primary => true
