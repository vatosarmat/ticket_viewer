import { useContext } from 'react'
import ToggleButtonGroup from 'components/controls/ToggleButtonGroup'
import CheckBoxGroup from 'components/controls/CheckBoxGroup'
import { StateContext, DispatchContext } from 'state'
import { currencyValues } from 'utils/currency'
import { stopsString } from 'utils/stops'

import './Side.css'

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
    .map(stopsCount => [stopsCount, stopsString(stopsCount)] as const)

  return (
    <div>
      <div className="Side">
        <div className="Side-content paper">
          <div className="Side-control">
            <div className="Side-control__label typography-subheading-upper">Валюта</div>
            <ToggleButtonGroup
              variants={currencyValues}
              value={currency}
              onChange={value =>
                dispatch({ type: 'Ticket/set_currency', payload: { currency: value } })
              }
            />
          </div>
          <div className="Side-control">
            <div className="Side-control__label typography-subheading-upper">
              Количество пересадок
            </div>
            <CheckBoxGroup
              labeledValues={labeledValues}
              valuesSelected={stopsFilter}
              onChange={value =>
                dispatch({
                  type: 'Ticket/set_stops_filter',
                  payload: { stopsFilter: value },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Side
