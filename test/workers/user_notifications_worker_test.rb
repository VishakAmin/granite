require 'test_helper'

class UserNotificationsWorkerTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'Sam Smith',
     email: 'sam@example.com',
     password: 'welcome',
     password_confirmation: 'welcome'
    )
  end

  def test_task_mailer_jobs_are_getting_processed
    assert_difference -> { @user.user_notifications.count }, 1 do
      UserNotificationsWorker.perform_async(@user.id)
    end
  end
end