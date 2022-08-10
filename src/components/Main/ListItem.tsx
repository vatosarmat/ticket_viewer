import { Ticket } from 'state'

import './ListItem.css'

// type ListItemProps = Pick<Ticket, 'id' | 'fullName' | 'city' | 'company'>
type ListItemProps = Ticket

// const LocationRow:React.FC<Pick<ListItemProps, 'origin_name', >> = () => {
//
// }

const ListItem: React.FC<ListItemProps> = ({
  origin,
  origin_name,
  departure_date,
  departure_time,
  arrival_date,
  arrival_time,
  destination,
  destination_name,
  price,
  carrier,
  stops,
}) => {
  return (
    <li className="List-item">
      <div className="List-item__logo-button">
        <span>{carrier}</span>
        <button>
          Купить
          <br />
          за {price}
        </button>
      </div>
      <div className="List-item__origin-destination">
        <div className="List-item__origin">
          <div className="List-item__time">{departure_time}</div>
          <div className="List-item__location">{`${origin}, ${origin_name}`}</div>
          <div className="List-item__date">{departure_date}</div>
        </div>
        <div className="List-item__stops-line">{stops}</div>
        <div className="List-item__destination">
          <div className="List-item__time">{arrival_time}</div>
          <div className="List-item__location">{`${destination_name}, ${destination}`}</div>
          <div className="List-item__date">{arrival_date}</div>
        </div>
      </div>
    </li>
  )
}

export default ListItem
