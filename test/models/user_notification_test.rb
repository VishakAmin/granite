require 'test_helper'

class UserNotificationTest < ActiveSupport::TestCase
  def setup
    user = User.create!(name: 'Sam Smith',
      email: 'sam@example.com',
      password: 'welcome',
      password_confirmation: 'welcome'
    )

    @user_notification = user.user_notifications.create!(last_notification_sent_date: Time.zone.today)
  end
end
