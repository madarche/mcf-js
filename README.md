Modular Crypt Format
====================

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

Reading from the database:

```js
var mcf = require('mcf');

var mcf_field = user.get('password');
try {
    var obj = mcf.deserialize(mcf_field);
    var identifier = obj.identifier;
    var cost = obj.cost;
    var salt = obj.salt;
    var derived_key = obj.derived_key;
} catch(err) {
    if (err instanceof mcf.McfError) {
        console.log("Format error in the database", err);
    } else {
        console.log("Unexpected fail");
    }
}
```

Writing to the database:

```js
var mcf = require('mcf');

var mcf_field = mcf.serialize('pbkdf2', cost, salt, derived_key);
```

Contributions
-------------

Pull Requests and contributions in general are welcome as long as they follow
the [Node aesthetic].

[Node aesthetic]: http://substack.net/node_aesthetic
