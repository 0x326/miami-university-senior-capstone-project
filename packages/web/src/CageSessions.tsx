import React from 'react'

import {
  List,
  ListItem,
} from '@rmwc/list'

import CageSessionTable from './CageSessionTable'

import '@material/list/dist/mdc.list.css'

interface Props {

}

interface State {

}

class CageSessions extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      someState: 0, // Initialization
    }
  }

  render(): JSX.Element {
    return (
      <>
        <List>
          {/* Do I need to send this objects the props/data? */}
          <ListItem>
            <CageSessionTable />
          </ListItem>
        </List>
      </>
    )
  }
}
