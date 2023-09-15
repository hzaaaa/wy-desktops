import React from 'react'
import Windows from "./windows/index"
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Portal from "./Portal"
// import Mac from "./mac/indexLoadable"
// import Windows from "./windows/indexLoadable"

class App extends React.Component {
  render() {
    return (
      <Windows></Windows>
    //   <BrowserRouter>
    //   <Switch>
        
        
    //     <Route path="/platformManagement" component={Windows}/>
    //   </Switch>
    // </BrowserRouter>
        
    )
  }
}

export default App
