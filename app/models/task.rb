class Task < ApplicationRecord

  validates :title, presence: true, length: { maximum: 50 }
  validates :slug, uniqueness: true
  validate :slug_not_changed
  belongs_to :user
  before_create :set_slug
  has_many :comments, dependent: :destroy


  def show
    task_creator = User.find(@task.creator_id).name
    render status: :ok, json: { task: @task,
                              assigned_user: @task.user,
                              task_creator: task_creator }

  end

  private

  def set_slug
    itr = 1
    loop do
      title_slug = title.parameterize
      slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
      break self.slug = slug_candidate unless Task.exists?(slug: slug_candidate)
      itr += 1
    end
  end

  def load_task
    @task = Task.find_by_slug!(params[:slug])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def slug_not_changed
    if slug_changed? && self.persisted?
      errors.add(:slug, t('task.slug.immutable'))
    end
  end
end