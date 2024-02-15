class ExampleJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "Example job is being performed."
  end
end