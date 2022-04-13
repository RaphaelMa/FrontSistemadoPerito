import moment, { defaultFormat } from 'moment'
import { currencyFormatter } from 'Utils/formatters'
import { ProcessType } from './types'

export const normalizeData = (data: ProcessType): ProcessType => {
  return {
    ...data,
    processData: {
      ...data.processData,
      deliveryReport: moment(data.processData.deliveryReport).isValid()
        ? moment(data.processData.deliveryReport, defaultFormat).format('DD/MM/YYYY') :
        '',
      clarificationReport: moment(data.processData.clarificationReport).isValid()
        ? moment(data.processData.clarificationReport, defaultFormat).format('DD/MM/YYYY') :
        '',
      clarificationDeliveryReport: moment(data.processData.clarificationDeliveryReport).isValid()
        ? moment(data.processData.clarificationDeliveryReport, defaultFormat).format('DD/MM/YYYY') :
        '',
      previsionImpugnment: moment(data.processData.previsionImpugnment).isValid()
        ? moment(data.processData.previsionImpugnment, defaultFormat).format('DD/MM/YYYY') :
        '',
      deliveryImpugnment: moment(data.processData.deliveryImpugnment).isValid()
        ? moment(data.processData.deliveryImpugnment, defaultFormat).format('DD/MM/YYYY') :
        '',
      clarificationImpugnment: moment(data.processData.clarificationImpugnment).isValid()
        ? moment(data.processData.clarificationImpugnment, defaultFormat).format('DD/MM/YYYY') :
        '',
      clarificationDeliveryImpugnment: moment(data.processData.clarificationDeliveryImpugnment).isValid()
        ? moment(data.processData.clarificationDeliveryImpugnment, defaultFormat).format('DD/MM/YYYY')
        : ''
    },
    schedule: {
      ...data.schedule,
      expertiseDate: moment(data.schedule.expertiseDate).isValid()
        ? moment(data.schedule.expertiseDate, defaultFormat).format('DD/MM/YYYY')
        : '',
      previsionReport: moment(data.schedule.previsionReport).isValid()
        ? moment(data.schedule.previsionReport, defaultFormat).format('DD/MM/YYYY')
        : '',
      honoraryValue: currencyFormatter(data.schedule.honoraryValue || '', { cents: true }),
      hour: data.schedule.hour ? `${data.schedule.hour} h` : ''
    }
  }
}
