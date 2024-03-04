module.exports = {
    "simple": {
        "string": 'runtime/default simple.string',
        "array": [
            "runtime/default simple.array[0]",
            "runtime/default simple.array[1]",
        ]
    },
    "simple-processed": {
        "string": "runtime/default simple-processed.string",
    },
    "simple-envs": {
        "string": "runtime/default simple-envs.string",
    },
    "simple-local": {
        "string": "runtime/default simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "runtime/default nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "runtime/default function.string",
            "string-local": "runtime/default function.string-local",
        })
    }
}
