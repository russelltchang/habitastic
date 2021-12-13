/* 

Passport.js

https://github.com/jaredhanson/passport/issues/208 (The Login Flow of Passport)

LOGIN (toon.io understanding passport flow)
1. POST request
2. Route’s auth middleware uses LocalStrategy set up by PLM User.createStrategy()
3. Passport passes req.body.username and password to the verify function in LocalStrategy
4. The LocalStrategy will find the user in the DB and check if the password matches
	>	If the user isn’t found or password doesn’t match, it returns done(null, false)
	>	If the user and password match, return done(null, user)
5. Calling the done function jumps back to passport.authenticate, where it’s passed (err, user, info)
6. If done(null, user) was returned by LocalStrategy, the middleware calls req.Login, a Passport function
7. Req.login calls User.serializeUser(), passing in the user (AKA the user object)
8. User.serializeUser() saves data from the user object to two places, allowing for sessions
	>	Saves entire user object to req.user
	>	Saves unique ID of user object (e-mail) to req.session.passport, and since this is modifying the req.session object, it autosaves to cookie
9. Finally, the request handler is invoked, probably a redirect or res.send

AUTHENTICATED REQUEST
1. HTTP request
2. Passport.initialize is invoked, uses client cookie to find passport.user attached to the session in DB
3. Passport.session() is invoked on every request.  If it finds serialized user object in session, it considers req authenticated, and will called DeSerializeUser()
4. DeserializeUser() deserializes the serialized user object (which is {user: username} in the DB session’s cookie field) into the deserialized user object, which has all fields besides hash and salt
5. It then loads the deserialized user object on req.user
6. This is why we can start the request handler with if (req.user), because this means user is authenticated

*/

const authorize = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.send("Unauthorized");
  }
};

module.exports = { authorize };
