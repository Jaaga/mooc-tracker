class HomeController < ApplicationController
  def show
  	@project = Project.new
    @course = Course.new
  end
end
