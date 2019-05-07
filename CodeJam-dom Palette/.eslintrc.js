module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-restricted-globals": ["off", "event"],
        "no-restricted-syntax": ["error", "BinaryExpression[operator='in']"],
        "prefer-destructuring": ["error", { "object": false }],
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],     
        "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["elem"] }],
        "no-new": 0,
        "prefer-const": ["error", { "destructuring": "any", "ignoreReadBeforeAssign": true }]  
    }
};