import { message } from 'antd'

const messageError = (error_code: string) => (
  message.error(`Algo de errado aconteceu, se o erro persistir entre em contato conosco. Código do erro: #${error_code}`)
)

export default messageError
