module.exports = {
    "simple-local": {
        "string": "postbuild/default.local simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "postbuild/default.local nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "postbuild/default.local function.string",
            "string-local": "postbuild/default.local function.string-local",
        })
    }
}
