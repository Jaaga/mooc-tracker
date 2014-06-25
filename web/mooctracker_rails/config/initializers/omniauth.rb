OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '325221067434-uh0hp886c498dnda8b9u2dep54gdmr1c', 'F4gVKxkp9fw6foZreLfnpGO6', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end