module.exports = {
    "simple": {
        "string": 'postbuild/default simple.string',
        "array": [
            "postbuild/default simple.array[0]",
            "postbuild/default simple.array[1]",
        ]
    },
    "simple-processed": {
        "string": "postbuild/default simple-processed.string",
    },
    "simple-envs": {
        "string": "postbuild/default simple-envs.string",
    },
    "simple-local": {
        "string": "postbuild/default simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "postbuild/default nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "postbuild/default function.string",
            "string-local": "postbuild/default function.string-local",
        })
    }
}
