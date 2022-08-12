import { Ticket } from 'state'
import { priceString, Currency } from 'utils/currency'
import { stopsString } from 'utils/stops'
import { formatDate } from 'utils/date'

import './ListItem.css'

type ListItemProps = Ticket & { currency: Currency }

const ListItem: React.FC<ListItemProps> = ({
  origin,
  origin_name,
  departure_date,
  departure_time,
  arrival_date,
  arrival_time,
  destination,
  destination_name,
  priceRub,
  carrier,
  stops,
  currency,
}) => {
  return (
    <li className="List-item paper">
      <div className="List-item__logo-button">
        <span>{carrier}</span>
        <button className="List-item__button typography-larger">
          Купить
          <br />
          за {priceString(priceRub, currency)}
        </button>
      </div>
      <div className="List-item__origin-destination">
        <div className="List-item__origin">
          <div className="List-item__time typography-huge">{departure_time}</div>
          <div className="List-item__location typography-subheading">{`${origin}, ${origin_name}`}</div>
          <div className="List-item__date typography-normal">
            {formatDate(departure_date)}
          </div>
        </div>
        <div className="List-item__stops">
          <div className="List-item__stops-label typography-small-upper">
            {stopsString(stops)}
          </div>
          <div className="List-item__stops-content">
            <div className="List-item__stops-line" />
          </div>
        </div>
        <div className="List-item__destination">
          <div className="List-item__time typography-huge">{arrival_time}</div>
          <div className="List-item__location typography-subheading">{`${destination_name}, ${destination}`}</div>
          <div className="List-item__date typography-normal">
            {formatDate(arrival_date)}
          </div>
        </div>
      </div>
    </li>
  )
}

export default ListItem
