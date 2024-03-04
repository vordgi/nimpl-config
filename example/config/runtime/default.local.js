module.exports = {
    "simple-local": {
        "string": "runtime/default.local simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "runtime/default.local nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "runtime/default.local function.string",
            "string-local": "runtime/default.local function.string-local",
        })
    }
}
