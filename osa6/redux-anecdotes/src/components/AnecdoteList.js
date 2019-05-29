import React from 'react'
import anecdoteReducer, { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

    const {anecdotes, filter} = store.getState()

    const anecdotesToShow = () => {
        if (filter === ''){
            return anecdotes
        }

        return anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }

    const vote = (id) => {
        const message = `You voted: ${anecdotes.find(ancdote => ancdote.id === id).content}`

        store.dispatch(
            addVote(id)
        )

        store.dispatch(
            setNotification(id,message)
        )
        
        setTimeout(() => {
            store.dispatch(
            removeNotification(id)
            )
        }, 5000)

    }

    return (
        <div>
            {anecdotesToShow().map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }

export default AnecdoteList