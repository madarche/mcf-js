require('must');
var mcf = require('../');

describe("MCF", function() {

    it("serialize(pbkdf2,10000,salt,derived) should equal: $pbkdf2$10000$salt$derived and must be a string", function() {
        var testSerialize = mcf.serialize("pbkdf2", 10000, "salt", "derived");
        testSerialize.must.equal("$pbkdf2$10000$salt$derived");
        testSerialize.must.be.a.string();
    });

    it("deserialize(mcf_field) should return an object [pbkdf2,10000,salt,derived]", function() {
        var testDeserialize = mcf.deserialize('$pbkdf2$10000$salt$derived');
        testDeserialize.must.include("pbkdf2", 10000, "salt", "derived");
        testDeserialize.must.be.an.object();
    });

    it("NaN must return an error", function() {
        mcf.deserialize.bind('$pbkdf2$a$salt$derived').must.throw();
    });

    it("Negative must return an error", function() {
        mcf.deserialize.bind('$pbkdf2$-1$salt$derived').must.throw();
    });

    it("0 must return an error", function() {
        mcf.deserialize.bind('$pbkdf2$0$salt$derived').must.throw();
    });

    it("deserialize(mcf_cost_error) should return an error of regex", function() {
        mcf.deserialize.bind('$-15pbkdf2$0$salt$derived').must.throw();
    });

});
