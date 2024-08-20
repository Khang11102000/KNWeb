import moment from 'moment'

const TIME_DISPLAY = 'DD/MM/YYYY'

export const formatDate = (date: string, format: string = TIME_DISPLAY) => {
  if (!date) return ''
  return moment(date).format(format)
}
