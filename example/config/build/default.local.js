module.exports = {
    "simple-local": {
        "string": "build/default.local simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "build/default.local nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "build/default.local function.string",
            "string-local": "build/default.local function.string-local",
        })
    }
}
