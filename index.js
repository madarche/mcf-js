var createError = require('create-error');

var McfError = createError('McfError');

// http://pythonhosted.org/passlib/modular_crypt_format.html
// salt must be a base64 encoded string
// derived_key must be a base64 encoded string
// '$'+identifier+'$'+cost+'$'+salt+'$'+derived_key
var MCF_REGEXP = /\$(\w+)\$(\d+)\$([A-Za-z0-9_-]+)\$([A-Za-z0-9_-]+)/;

/**
 * @param {string} mcf_field
 * @returns {Object}
 */
exports.deserialize = function(mcf_field) {
    var match = MCF_REGEXP.exec(mcf_field);
    if (!match) {
        throw new McfError("Invalid MCF: " + mcf_field +
                           " while it must be: " + MCF_REGEXP);
    }
    var identifier = match[1];

    var cost = Number(match[2]);
    if (Number.isNaN(cost) || cost <= 0) {
        throw new McfError("Invalid MCF: " + cost +
                           " must be a strictly positive number");
    }

    var salt = match[3];

    var derived_key = match[4];

    return {
        identifier: identifier,
        cost: cost,
        salt: salt,
        derived_key: derived_key
    };
};

/**
 * @param {string} identifier
 * @param {string} cost
 * @param {string} salt base64 encoded
 * @param {string} derived_key base64 encoded
 * @returns {string}
 */
exports.serialize = function(identifier, cost, salt, derived_key) {
    return '$' + identifier + '$' + cost +
        '$' + salt + '$' + derived_key ;
};
