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
  stopsFilter: Record<number, boolean>
}

export const initialState: State = {
  ticketTable: {},
  ticketSortKey: 'priceRub',
  currency: 'RUB',
  stopsFilter: {},
}

type Action =
  | {
      type: 'Ticket/add_bulk'
      payload: { ticketList: Ticket[] }
    }
  | {
      type: 'Ticket/set_currency'
      payload: { currency: Currency }
    }
  | {
      type: 'Ticket/set_stops_filter'
      payload: { stopsFilter: Record<number, boolean> }
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
    case 'Ticket/set_currency': {
      return {
        ...state,
        currency: payload.currency,
      }
    }
    case 'Ticket/set_stops_filter': {
      return {
        ...state,
        stopsFilter: payload.stopsFilter,
      }
    }
  }
}

export const StateContext = createContext(initialState)
export const DispatchContext = createContext<Dispatch<Action>>(a => {})
