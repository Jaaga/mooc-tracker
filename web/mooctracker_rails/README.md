## mooctracker_rails - REST API for the mooctracker client

Working example for mooctracker REST API.

## Checkout the code

```shell
$ git clone https://github.com/Jaaga/mooc-tracker.git
```

## Running the code

First checkout the code. 

You need rvm to contribute to this project without hassling over ruby gemsets. 

Get [rvm](https://rvm.io/). Make sure to enter the configuration into bash profile. 
Install ruby 2.0.0 in rvm. 

Get to the present directory. 

```shell
$ cd mooc-tracker/web/mooctracker_rails
```

At this point rvm should pick up the gemset. If not do, 

```shell
$ rvm use 2.0.0@mooctracker --create
```

Updating the gemset
```shell
$ bundle update
$ bundle install --without production
```

Run the server
```shell
$ rails s
```

Running all tests
```shell
$ guard
```



http://localhost:3000/auth/google_oauth2/callback