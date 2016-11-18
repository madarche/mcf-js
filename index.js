'use strict'

const createError = require('create-error')

const McfError = createError('McfError')

// http://pythonhosted.org/passlib/modular_crypt_format.html
// salt must be a base64 encoded string
// derived_key must be a base64 encoded string
// '$'+identifier+'$'+cost+'$'+salt+'$'+derived_key
const MCF_REGEXP = /\$([A-Za-z0-9_-]+)\$(\d+)\$([A-Za-z0-9_-]+)\$([A-Za-z0-9_-]+)/

/**
 * @param {string} mcf_field
 * @returns {Object}
 */
function deserialize(mcf_field) {
    let match = MCF_REGEXP.exec(mcf_field)
    if (!match) {
        throw new McfError('Invalid MCF: ' + mcf_field +
                           ' while it must be: ' + MCF_REGEXP)
    }
    let identifier = match[1]

    let cost = Number(match[2])
    if (cost === 0) {
        throw new McfError('Invalid MCF: ' + cost +
                           ' must be a strictly positive number')
    }

    let salt = match[3]

    let derived_key = match[4]

    return {
        identifier: identifier,
        cost: cost,
        salt: salt,
        derived_key: derived_key
    }
}

/**
 * @param {string} identifier
 * @param {string} cost
 * @param {string} salt base64 encoded
 * @param {string} derived_key base64 encoded
 * @returns {string}
 */
function serialize(identifier, cost, salt, derived_key) {
    return '$' + identifier + '$' + cost +
        '$' + salt + '$' + derived_key
}

exports.McfError = McfError
exports.serialize = serialize
exports.deserialize = deserialize
