class UserNotificationsWorker
  include Sidekiq::Worker

  def perform(*args)
    TaskMailer.delay.pending_tasks_email(user_id)
  end
end
