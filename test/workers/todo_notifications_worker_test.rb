# frozen_string_literal: true

require 'test_helper'

class TodoNotificationsWorkerTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'Sam Smith',
     email: 'sam@example.com',
     password: 'welcome',
     password_confirmation: 'welcome'
    )
    @user.tasks.create!(title: 'test task for sam')
    default_mail_delivery_time = "#{Constants::DEFAULT_NOTIFICATION_DELIVERY_HOUR}:00 AM"
    travel_to DateTime.parse(default_mail_delivery_time)
  end

  def test_todo_notification_worker_sends_email_to_users_with_pending_tasks
    assert_difference -> { @user.user_notifications.count }, 1 do
      TodoNotificationsWorker.perform_async
    end
  end
end