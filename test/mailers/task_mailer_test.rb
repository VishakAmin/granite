require 'test_helper'

class TaskMailerTest < ActionMailer::TestCase
  def setup
    @user = User.create!(name: 'Sam Smith',
     email: 'sam@example.com',
     password: 'welcome',
     password_confirmation: 'welcome'
    )
  end

  def test_task_mailer_is_delivering_mails
    email = TaskMailer.pending_tasks_email(@user.id).deliver_now
    assert_not ActionMailer::Base.deliveries.empty?
    assert_equal ["no-reply@granite.com"], email.from
    assert_equal [@user.email], email.to
    assert_equal "Pending Tasks", email.subject
  end

  def test_task_mailer_after_action_create_user_notifications
    assert_equal 0, UserNotification.count
    TaskMailer.pending_tasks_email(@user.id).deliver_now

    assert_equal 1, UserNotification.count
  end
end