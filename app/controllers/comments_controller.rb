class CommentsController < ApplicationController
  before_action :load_task
  before_action :authenticate_user_using_x_auth_token

  def create
    comment = @task.comments.new(comment_params)
    comment.user = current_user
    if comment.save
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
             json: { errors: comment.errors.full_messages.to_sentence }
    end
  end

  def show
    authorize @task
      comments = @task.comments.order('created_at DESC')
      task_creator = User.find(@task.creator_id).name
      render status: :ok, json: { task: @task, assigned_user: @task.user,
                                  comments: comments, task_creator: task_creator }
  end
  
  private

  def load_task
    @task = Task.find(comment_params[:task_id])
  end

  def comment_params
    params.require(:comment).permit(:content, :task_id)
  end
end