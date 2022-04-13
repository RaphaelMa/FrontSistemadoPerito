import useAxios from "axios-hooks";
import { FinancialType } from "Pages/Financial/types";

type DataPayload = {
  message?: {
    dataFinancial: FinancialType[],
    totalReceive: number,
    totalPay: number,
  }
  success?: boolean,
}

const useGetFinancial = (id: string) => (
  useAxios<DataPayload>(
    {
      url: `/processtabs/module=financial/id=${id}`,
      method: 'GET'
    },
    { manual: true }
  )
)

export default useGetFinancial
