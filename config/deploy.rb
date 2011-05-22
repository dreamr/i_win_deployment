set :stages, %w(ci staging production)
set :default_stage, "staging"
require 'capistrano/ext/multistage'

set :application, "healthism"

# Use Git source control
set :scm, :git
set :repository, "git@github.com:damonr/Healthism.git"
# Deploy from master branch by default
set :branch, "master"
set :deploy_via, :remote_cache
set :scm_verbose, true

set :user, 'ubuntu'
ssh_options[:user] = "ubuntu"
ssh_options[:keys] = ["#{ENV['HOME']}/.ssh/healthism.pem"]

set :use_sudo, false

ssh_options[:forward_agent] = true
default_run_options[:pty] = true

namespace :deploy do
  desc "Restarting mod_rails with restart.txt"
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{current_path}/tmp/restart.txt"
  end

  [:start, :stop].each do |t|
    desc "#{t} task is a no-op with mod_rails"
    task t, :roles => :app do ; end
  end
end

namespace :bundle do
  task :install, :roles => :app do
    shared_dir = File.join(shared_path, 'bundle')
    envs = %w(development test).join(" ")
    run "mkdir -p #{shared_dir}"
    run "cd #{release_path} && bundle install --without #{envs} --path #{shared_dir}"
  end
end

after 'deploy:update_code', 'bundle:install'