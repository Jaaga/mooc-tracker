module SessionsHelper
	
	def signed_in?
    	!current_user.nil?
  	end

	def signed_in_user
      unless signed_in?
	      store_location
	      redirect_to root_url, notice: "Please sign in."
   	  end
  	end


end
