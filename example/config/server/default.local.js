module.exports = {
    "simple-local": {
        "string": "server/default.local simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "server/default.local nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "server/default.local function.string",
            "string-local": "server/default.local function.string-local",
        })
    }
}
