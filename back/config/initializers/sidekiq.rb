require 'sidekiq'
require 'sidekiq-cron'

Sidekiq.configure_server do |config|
  schedule_file = "config/schedule.yml"
  config.redis = {
    url: ENV['REDIS_URL'],
    connect_timeout: 5,
    read_timeout: 5,
    write_timeout: 5
  }

  if File.exist?(schedule_file)
    Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
  end
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: ENV['REDIS_URL'],
    connect_timeout: 5,
    read_timeout: 5,
    write_timeout: 5
  }
end