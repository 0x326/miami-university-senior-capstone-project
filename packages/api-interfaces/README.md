# api-interfaces

All websockets will send either stringified JSON if success or `FAIL`
if some error occurred

You initialize connections like so:

```typescript
const ws = new WebSocket('ws://localhost:<port>/<path>')
// create an onmessage handler e.g.
ws.onmessage = event => console.log(JSON.parse(event.data))
// call websocket with query
ws.send(<query>)
```

When I say a route "returns" X, I mean it returns a `Response` object as defined in
`webSocketServer.ts` where the X is the value of data.

```typescript
interface Response {
  status: 'OK' | 'FAIL';
  data?: ExperimentWrapper | Array<ExperimentWrapper> | Array<string> | string;
  message?: string;
}
```

## Initiated by `web`

- `/get-root-dir` returns root directory of experiments `/archived` and `/active`
  are found

  - Send it an empty string. This just says "Give me the root
    directory"

- `/list-experiments` returns a list of wrappedExperiments matching `query.filter`

  - Query: stringified JSON object

    ```typescript
    JSON.stringify( {
      path: 'somePath',
      filter?: {
        name?: 'something',
        primaryExperimenter?: 'something',
        isComplete?: true|false,
        ...
      }
    })
    ```

  - `ExperimentWrapper`, as defined in `fsOperations.ts`:

    ```typescript
    export interface ExperimentWrapper {
      path: string;
      data: Experiment;
    }
    ```

- `/get-experiment` returns a single wrapped experiment at a given path

  - Query: a string representing a path to an experiment JSON file

    ```typescript
    JSON.stringify('/somepath')
    ```

- `/write-experiment`: save experiment at a particular pat. Doesn't return
  anything, but _does_ give you a message that contains either the error
  message for a failure or "Saved experiment at SOME_PATH"

  - Query: stringified ExperimentWrapper

    ```typescript
    JSON.stringify({
      path: 'path',
      data: experimentObject,
    })
    ```

- `/list-experiment-paths` returns list of experiment **paths** (strings) at
  given path that match query

  - You could use this in combination with `/get-experiment` to fetch
    a particular experiment

  - This might be preferable to `/list-experiments` in some cases

  - If you want all experiments at the given path, use empty strings
    and don't provide dates

  - Query: stringified JSON object

    ```typescript
    JSON.stringify({
      path: '/somepath',
      experimentName?: 'some experiment',
      primaryExperimenter?: 'some name',
      dateStart?: +new Date('2019'),
      dateEnd?: + new Date('2020'),
    })
    ```

## Initiated by `scale-interface`

- `/scale-data`. Initiates connection with scale. Just create a
  websocket client to it. You don't need to send it a message.
