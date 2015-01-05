# Ruby 2.1/Rails 4.1
# Example of a Ruby Custom Job to post a message to Facebook that is serialized to the DB
# Can easily be switched from DelayedJob, Rescue, Sidekiq or Custom Queue managing service
# Uses a service to deliver the actual post

class FacebookPostJob
  include UtilityJob

  attr_accessor :caption, :description, :destination, :destination_name, :link, :message, :images, :name, :oauth_user_id

  def initialize(attributes = {})
    self.caption = attributes.fetch(:caption) { '' }
    self.description = attributes.fetch(:description) { '' }
    self.destination = attributes.fetch(:destination)
    self.destination_name = attributes.fetch(:destination_name)
    self.link = attributes.fetch(:link) { '' }
    self.message = attributes.fetch(:message)
    self.images = attributes.fetch(:images)
    self.name = attributes.fetch(:name) { '' }
    self.oauth_user_id = attributes.fetch(:oauth_user_id)
  end

  def max_attempts
    1
  end

  def before(job)
    @scheduled_job = find_scheduled_job(job.id)
  end

  def perform
    FacebookPostService.new({
      caption: self.caption,
      description: self.description,
      destination: self.destination,
      link: self.link,
      message: self.message,
      images: self.images,
      name: self.name,
      oauth_user_id: self.oauth_user_id,
      scheduled_job: @scheduled_job
    }).process
  end

  def success(job)
    @scheduled_job.complete_job
  end

  def failure(job)
    @scheduled_job.fail_job
  end

  def error(job, exception)
    @scheduled_job.error_job
  end
end
