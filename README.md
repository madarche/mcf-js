
Modular Crypt Format
====================

[![NPM version](http://img.shields.io/npm/v/mcf.svg)](https://www.npmjs.org/package/mcf)
[![Dependency Status](https://david-dm.org/madarche/mcf-js.svg)](https://david-dm.org/madarche/mcf-js)
[![devDependency Status](https://david-dm.org/madarche/mcf-js/dev-status.svg)](https://david-dm.org/madarche/mcf-js#info=devDependencies)
[![Build Status](https://travis-ci.org/madarche/mcf-js.svg?branch=master)](https://travis-ci.org/madarche/mcf-js)
[![Coverage Status](https://coveralls.io/repos/github/madarche/mcf-js/badge.svg?branch=master)](https://coveralls.io/github/madarche/mcf-js?branch=master)

This modules reads (deserialize) and writes (serialize) password fields in
databases following the Modular Crypt Format (MCF).

The modular crypt format (MCF) is a standard for encoding password hash strings
in order to defend a database against attacks (dictionary attacks, pre-computed
rainbow table attacks, etc.).

The Modular Crypt Format is described in detail in
http://pythonhosted.org/passlib/modular_crypt_format.html


Format
------

A password field in the Modular Crypt Format is of the following form:

    $identifier$cost$salt$derived_key


Install
-------

```bash
npm install mcf
```


API
---

```js
deserialize(mcf_field)
```

```js
serialize(identifier, cost, salt, derived_key)
```


Usage
-----

Reading the format from the database:

```js
const mcf = require('mcf');

let mcf_field = user.get('password');
try {
    let obj = mcf.deserialize(mcf_field);
    let identifier = obj.identifier;
    let cost = obj.cost;
    let salt = obj.salt;
    let derived_key = obj.derived_key;
} catch(err) {
    if (err instanceof mcf.McfError) {
        console.log("Format error in the database", err);
    } else {
        console.log("Unexpected fail");
    }
}
```

Creating the format to write in the database:

```js
const mcf = require('mcf');

let mcf_field = mcf.serialize('pbkdf2', cost, salt, derived_key);
```

Development
-----------

To run the tests:
```bash
npm test
```

To compute test coverage:
```bash
npm run test:coverage
```

Contributions
-------------

Pull Requests and contributions in general are welcome as long as they follow
the [Node aesthetic].

[Node aesthetic]: http://substack.net/node_aesthetic
