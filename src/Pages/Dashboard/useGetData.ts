import useAxios from 'axios-hooks'
import { AppointmentsType } from './Graphics/Appointments'
import { ProcessSituationType } from './Graphics/ProcessSituation'
import { FinancialSituationType } from './Graphics/FinancialSituation'

type QueryPayload = {
  success?: boolean,
  dashboard: {
    totalProcess: number,
    processMonitoring: number,
    honoraryValue: number,
    acceptAppointment: AppointmentsType,
    situation: ProcessSituationType[],
    financialSituation: FinancialSituationType[],
    processExpertDate: number,
  }
}

const useGetData = () => (
  useAxios<QueryPayload>({ url: '/dashboard', method: 'GET' })
)

export default useGetData
