# frozen_string_literal: true

require "test_helper"

class TodoNotificationServiceTest < ActiveSupport::TestCase

  def setup
    @sam = User.create!(name: 'Sam Smith',
     email: 'sam@example.com',
     password: 'welcome',
     password_confirmation: 'welcome'
    )

    @nancy = User.create!(name: 'Nancy',
      email: 'nancy@example.com',
      password: 'welcome',
      password_confirmation: 'welcome'
    )

    @sam.tasks.create!(title: 'test task for sam')
    @nancy.tasks.create!(title: 'test task for nancy')

    default_mail_delivery_time = "#{Constants::DEFAULT_NOTIFICATION_DELIVERY_HOUR}:00 AM"
    travel_to DateTime.parse(default_mail_delivery_time)
  end

  def test_notification_worker_is_invoked_for_users_receiving_mail_for_first_time
    assert_difference -> { @sam.user_notifications.count }, 1 do
      todo_notification_service.process
    end
  end

  def test_notification_worker_is_invoked_for_users_according_to_delivery_hour_preference
    delivery_hour_in_future = Constants::DEFAULT_NOTIFICATION_DELIVERY_HOUR + 1
    @sam.preference.update(notification_delivery_hour: delivery_hour_in_future)

    assert_difference -> { UserNotification.count }, 1 do
      todo_notification_service.process
    end
  end

  def test_notification_worker_is_invoked_only_for_users_with_receive_email_enabled
    @sam.preference.update(receive_email: false)

    assert_difference -> { UserNotification.count }, 1 do
      todo_notification_service.process
    end
  end

  def test_notification_worker_is_invoked_only_for_users_yet_to_receive_notification_today
    @sam.user_notifications.create!(last_notification_sent_date: Time.zone.today)

    assert_difference -> { UserNotification.count }, 1 do
      todo_notification_service.process
    end
  end

  private

    def todo_notification_service
      TodoNotificationService.new
    end
end