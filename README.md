basic-grunt
===========

Steps
1 - npm install -g grunt-cli
2 - npm init
3 - npm install grunt --save-dev
4 - touch Gruntfile.js
5 - Setup tasks using: https://www.youtube.com/watch?v=fSAgFxjFSqY as an example
6 - npm install grunt-contrib-connect
7 - setup the server 
8 - added livereload to the watch and server

TODO
Basic Example
[X] - Setup watch
[X] - Setup live reload
[X] - One folder for the finished distribution
[X] - Server from grunt dev
[X] - Auto inject bower dependencies
[X] - Add bootstrap
[X] - Add fontawesome
[X] - setup minification for js and css
[X] - Add dev folder to run server from. dev will hold non concatenated and un minified files. Dist should have the min
[X] - add html hint
[O] - use grunt-remove-logging to remove console.log
[O] - keep this as an example repo and fork to a thin frontend and a thick frontend

Thin Frontend
[O] - One workflow for thin frontend
[O] - Decide about the place for the server language (Default PHP)

Thick frontend
[O] - One workflow for thick frontend with Angular
[O] - Unittesting with Karma and Mocha/Sinon
[O] - Run unit tests on tmp folder and on dist to see or minification is working
[O] - Auto dependency Injection
[O] - Auto Generation of files

Maybe Later
[O] - Update the homepage task to work for all pages
