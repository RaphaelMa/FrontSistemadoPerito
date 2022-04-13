import useAxios from "axios-hooks";
import { FinancialType, GeneralFinancial } from "./types";

type DataPayload = {
  financial: FinancialType[]
  generalFinancial: GeneralFinancial,
  success: boolean,
  message?: string,
}

const useGetFinancial = () => (useAxios<DataPayload>({ url: '/financial', method: 'GET' }, { manual: true }))

export default useGetFinancial
