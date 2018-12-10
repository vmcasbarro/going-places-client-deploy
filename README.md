[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

## Deployed apps and repositories
| Resource   | URL            |
|------------|----------------|
| client side, deployed    | https://vmcasbarro.github.io/going-places-client-deploy/#/             |
| client app repo   | https://github.com/vmcasbarro/going-places-client-deploy             |
| server api, deployed | https://the-wind-rises.herokuapp.com/            |
| server api repo  | https://github.com/vmcasbarro/going-places-api     |



<h1>Le vent se léve...</h1>
## ... is a French phrase meaning "the wind rises."
<h2>About this app</h2>
<em>The Wind Rises</em> is an application designed for travelers who want to log, plan, and show the trips they've taken, whether across the country or around the world! My love for traveling informed this app's design process and features were built based on useful tools that I've always wanted easily accessible while on trips. While planning this project, I knew I wanted to build something practical, easily accessible, and useful for an avid traveler.

Whether going on a month-long backpacking trip through Asia, or just getting home from a cross-country road trip, travelers are often asked the questions "where have you been?" and "where are you going next?" <em>The Wind Rises</em> was designed to be a visual aid to answering that question. Travelers can create trips, log a chronological collection of stops they made along their journey, and see all of their stops plotted on an interactive map.

Travelers should also be able to leverage the power of portable technology to while abroad, and I wanted to design app functionality that is useful to the traveler during the journey. To that end, I built off of several third-party APIs to compile real-time weather data for each stop, a translation feature, and an image to text (optical character recognition) feature that translates text from an image file into English and displays both the native text and translated text.

![trip itinerary](https://i.imgur.com/D1J7Xgt.png)

![mapped trip](https://i.imgur.com/xD95thG.png)

![translation and weather](https://i.imgur.com/769Gmxe.png)


## Technologies Used
- Front End
  - React JS
  - React Router
  - Javascript
  - Google Maps Javascript API
  - Google Vision API
  - Google Translate API
  - ChartJS
  - Material UI
  - Bootstrap
  - Sass
  - Webpack
  - Node Package Manager

- Back End
  - Rails
  - Ruby
  - HTTParty
  - Dark Sky weather API




## Planning
This project was my capstone for General Assembly's Web Development Immersive, and I wanted to build a project that was challenging and rewarding. Throughout the immersive I have been able to leverage my attention to detail, growth-mindset, and willingness to learn in each project, so I wanted this to be my most ambitious plan yet. I knew I wanted to attempt connecting to a third-party API, and I was eager to dive into learning and utilizing a new front-end framework, React.

The first part of my planning process was thinking about the data structures my app would use. I knew that a traveler would have many trips, and each trip would have many stops. Within those stops, I wanted the ability to add sub-components of those stops as my app matured and I continued to develop features. Knowing that these resources were highly relational, a relational SQL database was the natural choice for database models. Rails was my framework of choice for interacting with the database, since I was able to rely on the scaffolding Rails offers to quickly build out my back end and focus more time and energy on developing client-facing features.

The app utilizes multiple 3rd party APIs and several 3rd party librarys, which took a lot of time and work to implement. Since this project was completed in the span of only 4 project days, it was crucial that I maintained the scope of the project and kept a realistic deadline. One of my strengths as a developer is the ability to thoroughly plan and balance realistic expectations with ambitious goals. The finished product is something I'm proud of and highlights my planning ability and discipline.

Below are several shots capturing my planning process, including brainstorming features of the app, thinking about entity relationships, and sketching out wireframes.

![user stories](https://i.imgur.com/cTlc0MJ.jpg "User stories")

![ERD](https://i.imgur.com/Oe7FdWZ.jpg "entity relationships")

![wireframes](https://i.imgur.com/CJtyaqf.jpg "wireframe brainstorming")

![project brainstorming](https://i.imgur.com/VlLKlhz.jpg")

## Future Directions
1. Incorporate more advanced weather data using Dark Sky
2. Add a range of dates to each stop
3. Add currency info for each stop
4. Refactor weather chart with ChartJS-2

## Setting Up and Deploying the Client Side
1. Start with React Auth template from GA (https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)
2. Change api url in arc/auth/api.js to be dynamic based on deployment/development environments
3. Follow deployment recommendations from (https://github.com/gitname/react-gh-pages)

## API Endpoints
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/trips`               | `trips#index`     |
| POST   | `/trips`               | `trips#create`    |
| GET    | `/trips/:id`           | `trips#show`      |
| PATCH  | `/trips/:id`           | `trips#update`    |
| GET    | `/trips/:id/stops`     | `stops#index`     |
| POST   | `/trips/:id/stops/:id`               | `stops#create`    |
| GET    | `/trips/:id/stops/:id`           | `stops#show`      |
|PATCH   | `/forecast`  | `darksky#forecast`   |

## Server Side Steplog (Setup and Installation Instructions)
1. create rails app using GA-boston's rails api template
2. deploy to heroku
3. generate Trip resource
  - `bin/rails generate scaffold trip name:string`
  - trip model inherits from ProtectedController
  - `bin/rails generate migration AddUserToTrips user:references`
  - user & trip models updated to show one:many relationships
  - [C] update trip controller to make a trip for the user
  - [R] update trip controller to return only an index of the user's trips
  - [R] update trip controller to show a trip only if owned by that user
  - [U] update trip if owned by that user
  - [D] delete trip if owned by that user
4. generate Stop resource
  - `bin/rails generate scaffold stop location:string date:date`
  - stop model inherits from ProtectedController
  - `bin/rails generate migration AddTripToStops trip:references`
  - nest stop routes within trip routes
  - trip & stop models updated to show one:many relationship
  - set_trip for stop controller (make sure user is updating a trip that they own)
  - [C] update stop controller to make a stop for a user's trip
  - [R] update stop controller to return only an index of a user's trip
  - [R] update stop controller to show a stop only if owned by that user's trip
  - [U] update stop if owned by a user's trip
  - [D] delete stop if owned by a user's trip

5. route for dark sky API
  - add to gemfile: gem 'httparty' & gem 'figaro'
  - create darksky.rb in /lib
  - build out darksky class using HTTParty
  - add route and controller for /forecast



## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
2.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
