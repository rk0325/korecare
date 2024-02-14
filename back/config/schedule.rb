# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

set :environment, "production"
set :output, "log/cron_log.log"

every 1.day, at: '9:50 pm' do
  runner "LineNotifyService.send_message(user_line_id, message)"
end

every 1.day, at: '9:45 pm' do
  runner "LineNotifyService.send_message('U10f113aafce110cb4b376c3d261c9bad', 'テストメッセージ')"
end

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
