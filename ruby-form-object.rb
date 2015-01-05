# Ruby 2.1/Rails 4.1
# Example of a Ruby Form Object used with Rails and Bootstrap

# app/objects/form/login_form.rb
class LoginForm < ActiveModel::Model
  attr_reader :email, :password, :url

  validates_presence_of :email, :password, :url
  validates :email, format: { with: VALID_EMAIL_REGEX }, allow_blank: false

  def initialize(attributes = {})
    @url = attributes.fetch(:url) { nil }
    @email = attributes.fetch(:email) { nil }
    @password = attributes.fetch(:password) { nil }
  end

  def persisted?
    false
  end

  def submit
    valid?
  end
end

# app/controllers/website/sessions_controller.rb
class Website::SessionsController < ApplicationController
  layout 'session/index'

  def new
    @login_form = LoginForm.new({ url: website_sessions_path })
  end

  def create
    @login_form = LoginForm.new({
                    url: website_sessions_path,
                    email: params[:login_form][:email],
                    password: params[:login_form][:password]
                  })

    if @login_form.submit
      user = UserAuthenticator.new(@login_form.email).first

      if user && user.authenticate(@login_form.password)
        # Authenticate the user ....
        # Set cookies/sessions/etc.

        redirect_to dashboard_path, notice: 'Logged In'
      else
        @login_form.errors.add(:base, 'Please verify your information and try again')
        render :new
      end
    else
      render :new
    end
  end
end

# app/views/website/_form.html.erb
# Using Bootstrap 3.3.X
<%= form_for @login_form, url: @login_form.url, html: { id: 'login-form' } do |f| %>
  <%= render 'shared/error_messages', target: @login_form %>
  <div class="form-group">
    <%= f.text_field :email, { class: 'form-control', placeholder: 'Email' } %>
  </div>
  <div class="form-group">
    <%= f.password_field :password, { class: 'form-control', placeholder: 'Password' } %>
  </div>
  <div class="form-actions">
    <%= f.submit 'Sign In', class: 'btn btn-default' %>
  </div>
<% end %>
