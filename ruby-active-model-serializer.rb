# Ruby 2.1/Rails 4.1
# Example of a Ruby Serializer Object (AMS) to serialize a Facebook Post from a serialized queue

require 'facebook_post_job'

class FacebookPostSerializer < ActiveModel::Serializer
  root :facebook_post

private
  def attributes
    hash = super
    hash['id'] = object.id
    hash['job_type'] = object.job_type
    hash['run_at'] = object.run_at
    hash['state'] = object.state
    hash['created_at'] = object.created_at
    hash['updated_at'] = object.updated_at

    if object.scheduled_job.present?
      handler = YAML.load(object.scheduled_job.handler)
      hash['message'] = handler.message
      hash['images'] = handler.images
      hash['link'] = handler.link
      hash['name'] = handler.name
      hash['caption'] = handler.caption
      hash['description'] = handler.description
      hash['destination'] = handler.destination
    end

    hash
  end
end
