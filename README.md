Modular Crypt Format
====================

This modules reads (deserialize) and writes (serialize) password fields in
databases following the Modular Crypt Format.

The Modular Crypt Format is described in detail in
http://pythonhosted.org/passlib/modular_crypt_format.html

Format
------

The Modular Crypt Format is of the following form:

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

Contributions
-------------

Pull Requests and contributions in general are welcome as long as they follow
the [Node aesthetic].

[Node aesthetic]: http://substack.net/node_aesthetic
