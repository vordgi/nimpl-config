module.exports = {
    "simple": {
        "string": 'build/default simple.string',
        "array": [
            "build/default simple.array[0]",
            "build/default simple.array[1]",
        ]
    },
    "simple-processed": {
        "string": "build/default simple-processed.string",
    },
    "simple-envs": {
        "string": "build/default simple-envs.string",
    },
    "simple-local": {
        "string": "build/default simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "build/default nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "build/default function.string",
            "string-local": "build/default function.string-local",
        })
    }
}
