class UsersController < ApplicationController
  expose :users, -> { User.all.order(:id) }
  expose :user

  respond_to :html, :json

  def index
    respond_to do |format|
      format.html {}
      format.json {
        render json: users
      }
    end
  end

  def create
    user.save

    render json: user
  end

  def update
    user.update(user_params)

    render json: user
  end

  def destroy
    user.destroy

    render json: user
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
