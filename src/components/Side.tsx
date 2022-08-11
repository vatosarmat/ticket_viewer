import { useContext } from 'react'
import ToggleButtonGroup from 'components/controls/ToggleButtonGroup'
import { StateContext, DispatchContext } from 'state'
import { currencyValues } from 'utils/currency'

import './Side.css'

const Side: React.FC = () => {
  const { currency } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  return (
    <div className="Side">
      <div className="Side-control">
        <div className="Side-control__label">ВАЛЮТА</div>
        <ToggleButtonGroup
          variants={currencyValues}
          value={currency}
          onChange={value =>
            dispatch({ type: 'Currency/set', payload: { currency: value } })
          }
        />
      </div>
    </div>
  )
}

export default Side
