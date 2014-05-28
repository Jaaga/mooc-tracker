package us.jaaga.mooctracker;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class LandingPage extends Activity {
	
/*	TextView mSignUp;*/
	EditText mUserName,mPassword;
	Button btnSignIn,btnGplus,mSignUp;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login_screen);
		
		mUserName = (EditText) findViewById(R.id.etUserName);
		mPassword = (EditText) findViewById(R.id.etPass);
		btnSignIn = (Button) findViewById(R.id.btnSignIn);
		btnGplus = (Button) findViewById(R.id.btnGplus);
	
		
		
		mSignUp = (Button) findViewById(R.id.toSignup);
		
		mSignUp.setOnClickListener(new OnClickListener() {
			
		
			@Override
			public void onClick(View arg0) {
				
				Intent intent = new Intent(LandingPage.this, SignupPage.class);
				
				
				startActivity(intent);
			}
		});
		
	}
	
	
}
