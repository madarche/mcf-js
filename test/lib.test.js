'use strict'

const expect = require('must')

const mcf = require('../')
const McfError = mcf.McfError

describe('MCF', () => {

    it('exports McfError', () => {
        expect(McfError).to.exist()
    })

    it('serialize produces a string', () => {
        let res = mcf.serialize('pbkdf2', 10000, 'some_salt', 'some_derived_key')
        res.must.be.a.string()
        res.must.equal('$pbkdf2$10000$some_salt$some_derived_key')
    })

    it('deserialize accepts only a valid field', () => {
        // TODO: Change to use this when js-must is fixed to accept this
        //mcf.deserialize('an_invalid_field').must.throw(McfError);
        try {
            mcf.deserialize('an_invalid_field').must.throw(McfError)
        } catch (err) {
            expect(err).to.exist()
            err.must.be.a(McfError)
        }
    })

    it('deserialize accepts only a strictly positive (not zero) cost', () => {
        // TODO: Change to use this when js-must is fixed to accept this
        //mcf.deserialize('$pbkdf2$0$some_salt$some_derived_key').must.throw(McfError);
        try {
            mcf.deserialize('$pbkdf2$0$some_salt$some_derived_key').must.throw()
        } catch (err) {
            expect(err).to.exist()
            err.must.be.a(McfError)
        }
    })

    it('deserialize returns an object', () => {
        let res

        res = mcf.deserialize('$pbkdf2$10000$some_salt$some_derived_key')
        res.must.be.an.object()
        res.must.include('pbkdf2', 10000, 'some_salt', 'some_derived_key')

        res = mcf.deserialize('$pbkdf2-sha256$10000$some_salt$some_derived_key')
        res.must.be.an.object()
        res.must.include('pbkdf2-sha256', 10000, 'some_salt', 'some_derived_key')
    })

})
