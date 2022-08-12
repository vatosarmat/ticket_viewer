import { useState, useEffect, useReducer } from 'react'

import { reducer, initialState, StateContext, DispatchContext } from 'state'
import type { State, Ticket } from 'state'
import { utcDate } from 'utils/date'
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
    .then((data: { tickets: (Omit<Ticket, 'id' | 'priceRub'> & { price: number })[] }) =>
      data.tickets.map((item, idx) => {
        const departure_date = utcDate(item.departure_date)
        const arrival_date = utcDate(item.arrival_date)
        return {
          id: idx.toString(),
          origin: item.origin,
          origin_name: item.origin_name,
          destination: item.destination,
          destination_name: item.destination_name,
          departure_date,
          departure_time: item.departure_time,
          arrival_date,
          arrival_time: item.arrival_time,
          carrier: item.carrier,
          stops: item.stops,
          priceRub: item.price,
        }
      })
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
