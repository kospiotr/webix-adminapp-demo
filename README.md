Example of Webix MVC Admin App
===============================

[![Join the chat at https://gitter.im/webix-hub/webix](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/webix-hub/webix) 

Forked from: https://github.com/webix-hub/webix-adminapp-demo


Live demos
----------

https://kospiotr.github.io/webix-adminapp-material-demo-webpack

Technical details
------------------

### Prerequisite

NodeJS

### Run

- clone repo from git
- install dependencies with: `npm install`
- run in development mode: `npm run start:dev`
- run in development mode: `npm run start:prod`

### Build

- clone repo from git
- install dependencies with: `npm install`
- run in development mode: `npm run build:dev`
- run in development mode: `npm run build:prod`

### Some known issues

- Server side is omitted by purpose - didn't have time to cover all functionality
- Localisation code was commented out as it was not used for that demo

### Observations

- Building time is slower
- Building package is more bigger but probably and mostly thanks to additional fonts that needed to be delivered as well
- Building process is much more clear and the configuration is more declarative and convention driven than imperative with gulp and switching requirejs with almond manually.
- Building output can be and should be optimized further as this is just an overview for the migration process
- Migration process was quite easy and I'm positively surprised how nice it plays with webpack - mostly because consequent sticking to AMD format. Thanks to webpack it is possible to replace it with CommonJS or mix both of them.
- Really like te idea of Webix Jet, however the way the router was implemented is a very bad idea for 2 reasons: 1) security - user can inject any UI component knowing the path 2) customization - components can't be easily reused. Moving configuration about routing from directory and files structure to a somekind routing mapper configuration is much more better idea. I find angular ui-router as one of the best good practice source: https://github.com/angular-ui/ui-router/wiki. 
 
 ### Migration steps
 
 - Move all files to `src` directory
 - Replace relative paths to main directory to relative to each other
 - Removed unused libraries - almond and requirejs
 - Polyfill missing fonts

License
---------

All code except of dhtmlxScheduler files is available under MIT License

[dhtmlxScheduler](http://dhtmlx.com/docs/products/dhtmlxScheduler/) is available under GPL license
