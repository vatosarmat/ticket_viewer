import type { Reducer, Dispatch } from 'react'
import { createContext } from 'react'

import type { Currency } from 'utils/currency'

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
  priceRub: number
}

export type State = {
  ticketTable: Record<string, Ticket>
  ticketSortKey: 'priceRub'
  currency: Currency
}

export const initialState: State = {
  ticketTable: {},
  ticketSortKey: 'priceRub',
  currency: 'RUB',
}

type Action =
  | {
      type: 'Ticket/add_bulk'
      payload: { ticketList: Ticket[] }
    }
  | {
      type: 'Currency/set'
      payload: { currency: Currency }
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
    case 'Currency/set': {
      return {
        ...state,
        currency: payload.currency,
      }
    }
  }
}

export const StateContext = createContext(initialState)
export const DispatchContext = createContext<Dispatch<Action>>(a => {})
