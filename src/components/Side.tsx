import { useContext } from 'react'
import ToggleButtonGroup from 'components/controls/ToggleButtonGroup'
import CheckBoxGroup from 'components/controls/CheckBoxGroup'
import { StateContext, DispatchContext } from 'state'
import { currencyValues } from 'utils/currency'

import './Side.css'

const LUT: Record<number, string> = {
  0: 'Без пересадок',
  1: '1 пересадка',
  2: '2 пересадки',
  3: '3 пересадки',
  4: '4 пересадки',
}

const Side: React.FC = () => {
  const { currency, ticketTable, stopsFilter } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const possibleStops = Object.values(ticketTable).reduce(
    (record, ticket) => ({ ...record, [ticket.stops]: true as const }),
    {} as Record<number, true>
  )

  const labeledValues = Object.keys(possibleStops)
    .map(key => parseInt(key, 10))
    .sort()
    .map(
      stopsCount => [stopsCount, LUT[stopsCount] ?? `${stopsCount} пересадок`] as const
    )

  return (
    <div className="Side">
      <div className="Side-control">
        <div className="Side-control__label">ВАЛЮТА</div>
        <ToggleButtonGroup
          variants={currencyValues}
          value={currency}
          onChange={value =>
            dispatch({ type: 'Ticket/set_currency', payload: { currency: value } })
          }
        />
      </div>
      <div className="Side-control">
        <div className="Side-control__label">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
        <CheckBoxGroup
          labeledValues={labeledValues}
          valuesSelected={stopsFilter}
          onChange={value =>
            dispatch({ type: 'Ticket/set_stops_filter', payload: { stopsFilter: value } })
          }
        />
      </div>
    </div>
  )
}

export default Side
