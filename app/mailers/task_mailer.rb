class TaskMailer < ApplicationMailer
  after_action :create_user_notification

  def pending_tasks_email(receiver_id)
    @receiver = User.find(receiver_id)
    @tasks = @receiver.tasks.pending
    mail(to: @receiver.email, subject: 'Pending Tasks')
  end

  private

  def create_user_notification
    @receiver.user_notifications.create(last_notification_sent_date: Date.today)
  end
end