class Course < ActiveRecord::Base
	has_many :user
	has_many :studentcourse
end
