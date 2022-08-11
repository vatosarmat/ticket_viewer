import { useContext } from 'react'
import { StateContext } from 'state'
import ListItem from './ListItem'
import './List.css'

const List: React.FC = () => {
  const { ticketTable, ticketSortKey, currency } = useContext(StateContext)
  const list = Object.values(ticketTable)

  return (
    <ul className="List">
      {list
        .sort((a, b) => {
          const aa = a[ticketSortKey]
          const bb = b[ticketSortKey]
          return aa > bb ? 1 : aa < bb ? -1 : 0
        })
        .map(item => (
          <ListItem {...item} currency={currency} key={item.id} />
        ))}
    </ul>
  )
}

export default List
