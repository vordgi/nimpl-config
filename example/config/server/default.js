module.exports = {
    "simple": {
        "string": 'server/default simple.string',
        "array": [
            "server/default simple.array[0]",
            "server/default simple.array[1]",
        ]
    },
    "simple-processed": {
        "string": "server/default simple-processed.string",
    },
    "simple-envs": {
        "string": "server/default simple-envs.string",
    },
    "simple-local": {
        "string": "server/default simple-local.string",
    },
    "nested": {
        "nested2": {
            "nested3": {
                "string": "server/default nested.nested2.nested3.string",
            }
        }
    },
    "function": () => {
        return ({
            "string": "server/default function.string",
            "string-local": "server/default function.string-local",
        })
    }
}
