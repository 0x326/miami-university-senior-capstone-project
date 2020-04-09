import React, {
  useCallback,
  useState,
} from 'react'

import {
  List,
} from 'immutable'

import {
  Snackbar,
  SnackbarAction,
} from '@rmwc/snackbar'

import '@material/snackbar/dist/mdc.snackbar.css'
import '@material/button/dist/mdc.button.css'

export interface SnackbarNotification extends Readonly<{
  message: string;
  actions: List<Readonly<{
    text: string;
    callback: () => void;
  }>>;
}> {}

enum OpenState {
  CLOSED,
  WAITING_TO_OPEN,
  OPENED,
  WAITING_TO_CLOSE,
}

function useSnackbar(
  initialQueue: List<SnackbarNotification> = List(),
): [JSX.Element | null, (item: SnackbarNotification) => void] {
  const [queue, setQueue] = useState(initialQueue)
  const queueAppend = useCallback((item: SnackbarNotification) => setQueue((prevQueue) => prevQueue.push(item)),
    [setQueue])

  const displayItem = queue.first({
    message: '',
    actions: List(),
  } as SnackbarNotification)
  const [snackbarState, setSnackbarState] = useState(OpenState.CLOSED)

  const {
    message,
    actions,
  } = displayItem

  if (message === '') {
    if (snackbarState !== OpenState.WAITING_TO_CLOSE && snackbarState !== OpenState.CLOSED) {
      setSnackbarState(OpenState.WAITING_TO_CLOSE)
    }
  } else if (snackbarState === OpenState.CLOSED) {
    setSnackbarState(OpenState.WAITING_TO_OPEN)
  }

  return [(
    <Snackbar
      key="snackbar"
      open={snackbarState === OpenState.WAITING_TO_OPEN || snackbarState === OpenState.OPENED}
      onOpen={(): void => setSnackbarState(OpenState.OPENED)}
      onClose={(): void => {
        setSnackbarState(OpenState.CLOSED)
        setQueue((prevQueue) => prevQueue.shift())
      }}
      message={message}
      action={actions.map(({ text, callback }) => (
        <SnackbarAction
          key={text}
          label={text}
          onClick={callback}
        />
      ))}
    />
  ), queueAppend]
}

export default useSnackbar
