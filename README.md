Modular Crypt Format
====================

Format
------

Check the doc here: http://pythonhosted.org/passlib/modular_crypt_format.html

API
---

    deserialize

    return {
        identifier: identifier,
        cost: cost,
        salt: salt,
        derived_key: derived_key
    };

    cost is a Number

    serialize

Contributions
-------------

Pull Requests and contributions in general are welcome as long as they follow
the [Node aesthetic].

[Node aesthetic]: http://substack.net/node_aesthetic
