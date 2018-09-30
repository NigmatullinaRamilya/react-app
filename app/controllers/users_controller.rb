class UsersController < ApplicationController
  expose :users, -> { User.all }
  expose :user

  respond_to :html

  def index
  end

  def create
    user.save

    respond_with user, location: users_path
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
