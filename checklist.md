All websockets will send either stringified JSON if success or \'FAIL\'
if some error occurred

You initialize connections like so:

``` {.javascript}
const ws = new WebSocket("ws://localhost:<port>/<path>")
// create an onmessage handler e.g.
ws.onmessage = event => console.log(JSON.parse(event.data))
// call websocket with query
ws.send(<query>)
```

[DONE]{.done .DONE} Initiated by web {#initiated-by-web}
====================================

-   /get-root-dir returns root directory of experiments where subdirs
    /archived and /active are found
    -   No argument expected
-   /list-experiments get list of all experiments matching query.filter
    -   Query: stringified JSON obj

``` {.javascript}
JSON.stringify(
    {
        path: 'somePath',
        filter?: {
            name?: "something",
            primaryExperimenter?: "something",
            isComplete?: true|false,
            ...
        }
    }
)
```

-   /get-experiment get a single experiment at a given path
    -   Query: a string representing a path to an experiment json file

``` {.text}
"/somepath"
```

-   /write-experiment: save experiment at a particular path
    -   Query: stringified ExperimentWrapper

``` {.javascript}
JSON.stringify(
    {
        path: "path",
        data: experimentObj
    }
)
```

-   /list-experiment-paths get list of experiment **paths** at given
    path that match query
    -   You could use this in combination with /get-experiment to fetch
        a particular experiment
    -   This might be preferable to /list-experiments in some cases
    -   If you want all experiments at the given path, use empty strings
        and don\'t provide dates
    -   Query: stringified json object

``` {.javascript}
JSON.stringify(
    {
        path: "/somepath",
        experimentName: "some experiment",
        primaryExperimenter: "some name"
        dateStart?: +new Date('2019'),
        dateEnd?: + new Date('2020'),

    }
)
```

[TODO]{.todo .TODO} Initiated by scale {#initiated-by-scale}
======================================
