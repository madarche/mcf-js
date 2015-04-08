var expect = require('must');

var mcf = require('../');
var McfError = mcf.McfError;

describe("MCF", function() {

    it("must export McfError", function() {
        expect(McfError).to.exist();
    });

    it("serialize must produce a string", function() {
        var res = mcf.serialize('pbkdf2', 10000, 'some_salt', 'some_derived_key');
        res.must.be.a.string();
        res.must.equal('$pbkdf2$10000$some_salt$some_derived_key');
    });

    it("deserialize must accept only a valid field", function() {
        // TODO: Change to use this when js-must is fixed to accept this
        //mcf.deserialize('an_invalid_field').must.throw();
        try {
            mcf.deserialize('an_invalid_field').must.throw();
        } catch (err) {
            expect(err).to.exist();
            err.must.be.a(McfError);
        }
    });

    it("deserialize must accept only a strictly positive (not zero) cost", function() {
        // TODO: Change to use this when js-must is fixed to accept this
        //mcf.deserialize('$pbkdf2$0$some_salt$some_derived_key').must.throw();
        try {
            mcf.deserialize('$pbkdf2$0$some_salt$some_derived_key').must.throw();
        } catch (err) {
            expect(err).to.exist();
            err.must.be.a(McfError);
        }
    });

    it("deserialize must return an object", function() {
        var res = mcf.deserialize('$pbkdf2$10000$some_salt$some_derived_key');
        res.must.be.an.object();
        res.must.include('pbkdf2', 10000, 'some_salt', 'some_derived_key');
    });

});
