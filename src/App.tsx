import { useState, useEffect, useReducer } from 'react'

import { reducer, initialState, StateContext, DispatchContext } from 'state'
import type { State, Ticket } from 'state'
import Page from 'components/Page'

const App: React.FC = () => {
  const [storedState, setStoredState] = useState<State | undefined>(undefined)
  const [done, setDone] = useState(false)
  useEffect(() => {
    const stored = localStorage.getItem('state')
    if (stored) {
      const state: State = JSON.parse(stored)
      setStoredState(state)
    }
    setDone(true)
  }, [])

  if (done) {
    return <StateProvider storedState={storedState} />
  }

  return null
}

type StateProviderProps = {
  storedState?: State
}

const fetchDromDb = (): Promise<Ticket[]> =>
  fetch('tickets.json')
    .then(resp => resp.json())
    .then((data: { tickets: Omit<Ticket, 'id'>[] }) =>
      data.tickets.map((item, idx) => ({ ...item, id: idx.toString() }))
    )

const StateProvider: React.FC<StateProviderProps> = ({ storedState }) => {
  const [state, dispatch] = useReducer(reducer, storedState ?? initialState)
  useEffect(() => {
    if (!storedState) {
      fetchDromDb()
        .then((data: Ticket[]) => {
          dispatch({ type: 'Ticket/add_bulk', payload: { ticketList: data } })
        })
        .catch(e => console.log('Failed to fetch data!'))
    }
  }, [storedState])
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Page />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
