module SessionsHelper
	
	def signed_in?
    	!current_user.nil?
  	end

	def signed_in_user
      unless signed_in?
	      #redirect_to root_url, notice: "Please sign in."
	      head 403
   	  end
  	end


end
