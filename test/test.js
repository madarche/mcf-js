require("must");
var mcf = require('../');
var assert = require("assert");
var mcf_field = "$pbkdf2$10000$salt$derived";
var mcf_cost_null= "$pbkdf2$0$salt$derived";
var mcf_cost_error= "$-15pbkdf2$abc$salt$derived";



//var mcf_index = require('index.js');  // our module

describe('mcf', function(){
  describe('Module mcf_index', function(){
    it('should have a serialize adn deserialize Method', function(){
      assert.equal(typeof mcf, 'object');
      assert.equal(typeof mcf.deserialize, 'function');
      assert.equal(typeof mcf.serialize, 'function');
    });
  });


  describe('#serialize', function(){
    it('serialize("pbkdf2,10000,salt,derived"should equal : $pbkdf2$10000$salt$derived ',function(){
      var testSerialize = mcf.serialize("pbkdf2",10000,"salt","derived");
      testSerialize.must.equal("$pbkdf2$10000$salt$derived");
      testSerialize.must.be.a.string();
    });
  });
  
  describe("#deserialize",function(){
    it('deserialize(mcf_field) should return an object [pbkdf2,10000,salt,derived]',function(){
    
      //assert.deepEqual(mcf.deserialize(mcf_field),['identifier:pbkdf2','cost:10000','salt:salt','derived_key:derived']);
      var testDeserialize = mcf.deserialize(mcf_field);
      testDeserialize.must.be.an.object();
    
    });
  });


  describe("#serialize cost is null",function(){
    it("deserialize(mcf_cost_null) should return an error", function(){

       //iThrowError = mcf.deserialize(mcf_cost_null);
       //assert.throws(mcf.deserialize(mcf_cost_null), Error, "Error thrown");
        mcf.deserialize.bind(mcf_cost_null).must.throw();
      
      
    });
  });

  describe("#serialize error regex",function(){
    it("deserialize(mcf_cost_error) should return an error of regex", function(){
     
       mcf.deserialize.bind(mcf_cost_error).must.throw();
       
      
    });

  });

});





