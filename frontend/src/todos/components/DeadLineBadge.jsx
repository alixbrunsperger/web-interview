import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { Badge } from '@mui/material'
import { getBadgeColor, getBadgeContent } from '../../lib/utils'


export const DeadLineBadge = ({ deadline }) => {
  const content = getBadgeContent(deadline)
  return (
    <Badge badgeContent={content} color={getBadgeColor(content)} showZero>
      {content >= 0 ? <EventAvailableIcon /> : <EventBusyIcon />}
    </Badge>
  )
}
