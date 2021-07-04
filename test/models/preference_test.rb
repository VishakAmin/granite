require 'test_helper'

class PreferenceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    user = User.create!(name: 'Sam Smith',
      email: 'sam@example.com',
      password: 'welcome',
      password_confirmation: 'welcome'
    )

    @preference = user.preference
  end

  def test_notification_delivery_hour_must_be_present_and_valid
    @preference.notification_delivery_hour = nil
    assert @preference.invalid?
    assert_includes @preference.errors.messages[:notification_delivery_hour], t('errors.messages.blank')
  end

  def test_notification_delivery_hour_should_be_in_range
    invalid_hours = [-10, -0.5, 10.5, 23.5, 24]
  
    invalid_hours.each do |hour|
      @preference.notification_delivery_hour = hour
      assert @preference.invalid?
    end
  end

  def test_last_notification_sent_date_must_be_present
    @user_notification.last_notification_sent_date = nil
    assert @user_notification.invalid?
    assert_includes @user_notification.errors.messages[:last_notification_sent_date], t('errors.messages.blank')
  end

  def test_last_notification_sent_date_must_be_parasble
    @user_notification.last_notification_sent_date = "12-13-2021"
    assert_equal @user_notification.last_notification_sent_date, nil
  end

  def test_last_notification_sent_date_cannot_be_in_past
    @user_notification.last_notification_sent_date = Time.zone.yesterday
    assert @user_notification.invalid?
    assert_includes @user_notification.errors.messages[:last_notification_sent_date], t('date.cant_be_in_past')
  end
  
end
