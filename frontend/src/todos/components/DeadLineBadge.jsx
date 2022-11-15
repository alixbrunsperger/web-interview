import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { Badge } from '@mui/material'
import { getBadgeColor, getNumberOfDays } from '../../lib/utils'


export const DeadLineBadge = ({ deadline }) => {
  const numberOfDays = getNumberOfDays(deadline)
  return (
    <Badge badgeContent={numberOfDays} color={getBadgeColor(numberOfDays)} showZero>
      {numberOfDays >= 0 ? <EventAvailableIcon /> : <EventBusyIcon />}
    </Badge>
  )
}
