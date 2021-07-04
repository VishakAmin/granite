class Log < ApplicationRecord
  validates :message, presence: true
  validates :task_id, presence: true
end
