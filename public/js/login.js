// var authenticate = function() {
// 	var username = document.getElementById("login-name").value;
// 	var password = document.getElementById("login-pass").value;
// 	if(username == "admin" && password == "1234") {
// 		document.location.href = "success";
// 	} else {
// 		alert("Your Username and Password combination was not recognized. Please try again");
// 	}
// }

var username = document.getElementById("login-name").value;
var password = document.getElementById("login-pass").value;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));