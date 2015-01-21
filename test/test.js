require("must");

var obj = "an";
var mcf = require('mcf');
var user ="anthony";

var mcf_field = "$pbkdf2$10000$salt$derived";

var obj = mcf.deserialize(mcf_field);
obj.must.be.an.object();

var tabString = mcf.serialize("pbkdf2,10000,salt,derived");
tabString.must.be.a.string();


