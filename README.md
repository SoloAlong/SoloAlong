# Solo Along
A rad app to make chord progressions you can shred to!

## Create a user!
Signing up is easy and secure! Just enter a username, your email, and the password you
would like to use and that's it!  If your username or email is already taken, you'll
need to use another username or email...hey, thems the breaks, man.

## Sign in!
Signing is easy too! It works exactly how you'd think it would!  Enter your username
and password -- If it's right, you'll be logged in and whisked away to your profile page
where you'll see all of your amazing chord progressions!

## Create a new Chord Progression!
Just pick the key you'd like, and if you'd like the key to be "Major" or "minor" to
see your available chords!  Drop whatever chords you'd like into place, and when you're
ready, hit the button! The new chord progression will be added to your collection!
It's that easy!

## Play a chord progression and SHRED IT UP!
After you've made a chord progression, play it! It will play in a loop over and over again
so you can SOLO ALONG! Have fun shredding!

## Authors
This server/router was written by [Yueyue Qin](https://github.com/Yueyue07),
[Gene Troy](https://github.com/energene), [Aaron Filson](https://github.com/AaronFilson),
[Kenneth Suh](https://github.com/suhk), [Cameron Forras](https://github.com/cameron4us), and
[James Vermillion](https://github.com/jamesvermillion) for the
JavaScript 401 course at Code Fellows.

## License

This project is licensed under the terms of the MIT license.


##Development Documentation

###Technologies:
Bootstrap, Handlebars, jQuery, jQuery UI, HTML5 audio, cookies, Node.js, Mongo, Mongoose, JWT (jsonwebtoken), Garageband, Photoshop, Express, Heroku, Mocha / Chai, ESLint, etc!

###Back End : Server / DB

For our SoloAlong project, we first focused on the server and established the logic of chords and chord progressions. Using REST and MVC models, we developed a framework to deliver the key functionality in a tight time frame.

Database : 2 resource Mongo DB, users and chord progressions.
Mongoose plug-in with Schemas
MongoLab on Heroku

###Node as Server Platform and Environment

The SoloAlong project used the 4.2.3 version of Node.js, running on the V8 engine. The Node modules used included 'fs', and asynchronous streaming of files. We used modular patterns to help us with the complexity of having six people work on a project under strict time crunches. The modular pattern proved to be a huge help in debugging and feature introductions. Whiteboards were a vital technology to the project, improving organization and group morale.

####HTTP Server : using Express, with body-parser and middleware

Routes and middleware:
Sign in, Sign up, newCP, profile, player (used by client-side app)
Authentication middleware with JWT
body-parser for JSON help

Auth: we used bcrypt, JSONWebToken, and cookies to help the user.
We value security, and you should too! Mongoose attack!

###Front End : Website and Deployment

SoloAlong is using cookies and templates for a cohesive user experience. There is a friendly and formatted GUI for the browser to use to sign up for the app, and to log in. The client app is responsive on desktop and laptop browsers. The sign in and sign up routes have error checking using AJAX that does not leave the page, improving user experience. There is an easy to use button to log out.

The client app uses Handlebars for templates. SoloAlong primarily uses Ajax and jQuery to interact with the server and DB resources. This means that our pages are dynamically created on the server to customize the experience for our users.

We use HTML 5 audio tags for loading and playing our samples. This proved to be faster and simpler than using a library from a third party. The sprint focused our attention on delivering the MVP, and inventive means were employed to reach the goal (setTimeout ftw). BPM magic was computed for a varied musical tempo.

From the beginning, we used HTML, CSS, and Bootstrap for responsive design. This greatly helped with Thursday and Thursday related issues. Our project uses jQuery UI for draggable / droppable chords, for an intuitive UI in making new chord progressions. The favicon helps to identify the tabs in a busy browser.

SoloAlong is deployed to Heroku at :
  [SoloAlong](https://SoloAlong.herokuapp.com)

###Tooling : Testing and Graphics / Sound

GitHub is our main work flow tool. Much better than sneaker net, and available for the community to help, add, and get us employed. Please?

We used : NPM, gulp, ESLint, Mocha, Chai, Unit tests, route testing, manual testing, TEST TEST TEST, Integration testing for sign in, sign up. Tyler told us to. We liked it.

The project used Garageband for sampling audio, assembling the files, and looking cool. Photoshop was used for creating chord images, icons, background, and logo. The end.
