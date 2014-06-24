mooc-tracker
============

MOOC Tracker is a project of Jaaga Students- http://jaaga.in/study to build a platform to keep track of various online courses that one is enrolled in. 

To get started:

git clone https://github.com/Jaaga/mooc-tracker.git

install python virtualenv
> apt-get install python-virtualenv

create a virutal environment
> virtualenv mooc-tracker-env 
# not in the project directory.

activate the virtual environment
> source mooc-tracker-env/bin/activate

move to the web/mooctracker directory
> cd mooc-tracker/web/mooctracker

install all packages 
> pip install -r requirements.txt

run server
> python manage.py runserver

