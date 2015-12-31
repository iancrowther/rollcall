# rollcall
This script is used to generate a rollcall for nodeschool/international-day.

Add the label ```rollcall-{yyyy}``` to each issue you want to use.  This script will gather the usernames of each user who commented in the issue and generate a json file with all the users who participated.

## setup
- rename ```github.credentials.example.js``` to ```github.credentials.js```
- add your github details to github.credentials.js

## run
```npm start {yyyy}```
