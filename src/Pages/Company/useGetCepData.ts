import { useState } from 'react'
import axios from 'axios'

type QueryPayload = {
  cep?: string,
  logradouro?: string,
  complemento?: string,
  bairro?: string,
  localidade?: string,
  uf?:string,
  ibge?: string,
  gia?: string,
  ddd?: string,
  siafi?: string,
  erro?: boolean,
}

const useSaveCompany = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const query = async (raw_cep?: string) => {
    try {
      setLoading(true)
      const cep = raw_cep?.replace(/[^0-9.]/g, '')
      if (cep?.length !== 8) return { success: false }

      const { data } = await axios.get<QueryPayload>(`https://viacep.com.br/ws/${cep}/json/`)
      if (data.erro) return { success: false }

      return { success: true, data: data }
    } catch (error) {
      console.log('[useGetCepData] ', error)

      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  return [query, { loading }]  as const
}

export default useSaveCompany
