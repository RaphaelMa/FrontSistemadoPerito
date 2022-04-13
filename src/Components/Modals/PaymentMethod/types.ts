export type PaymentType = {
  _id: string,
  description: 'Boleto' | 'Cartão de Crédito',
  key: 'billet' | 'credit_card'
}
