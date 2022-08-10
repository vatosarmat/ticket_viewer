import type { Reducer, Dispatch } from 'react'
import { createContext } from 'react'

export type Ticket = {
  id: string
  origin: string
  origin_name: string
  destination: string
  destination_name: string
  departure_date: string
  departure_time: string
  arrival_date: string
  arrival_time: string
  carrier: string
  stops: number
  price: number
}

export type State = {
  ticketTable: Record<string, Ticket>
  ticketSortKey: 'price'
}

export const initialState: State = {
  ticketTable: {},
  ticketSortKey: 'price',
}

type Action = {
  type: 'Ticket/add_bulk'
  payload: { ticketList: Ticket[] }
}

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'Ticket/add_bulk': {
      return {
        ...state,
        ticketTable: payload.ticketList.reduce(
          (table, ticket) => ({ ...table, [ticket.id]: ticket }),
          state.ticketTable
        ),
      }
    }
  }
}

export const StateContext = createContext(initialState)
export const DispatchContext = createContext<Dispatch<Action>>(a => {})
