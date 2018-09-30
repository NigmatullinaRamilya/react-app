class UsersController < ApplicationController
  expose :users, -> { User.all }

  def index
  end

  def create
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
