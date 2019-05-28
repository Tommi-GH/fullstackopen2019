import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const updateState = (typeName) => {
    console.log(typeName)
    store.dispatch({
      type: typeName
    })
  }

  return (
    <div>
      <button onClick={() => updateState('GOOD')}>hyvä</button> 
      <button onClick={() => updateState('OK')}>neutraali</button> 
      <button onClick={() => updateState('BAD')}>huono</button>
      <button onClick={() => updateState('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
