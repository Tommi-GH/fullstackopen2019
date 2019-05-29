import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    let anecdote

    store.dispatch(
      anecdote = createAnecdote(content)
    )

    const message =  `You created: ${anecdote.content}`

    store.dispatch(
            setNotification(anecdote.id,message)
        )
        
        setTimeout(() => {
            store.dispatch(
            removeNotification(anecdote.id)
            )
        }, 5000)


  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm