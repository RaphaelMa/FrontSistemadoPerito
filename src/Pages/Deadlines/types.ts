export type IndicatorsType = {
  countTwentyDays: number, //Faltam 20 Dias Para o Fim do Prazo
  countFifteenDays: number, //Faltam 15 Dias Para o Fim do Prazo
  countTenDays: number, //Faltam 10 Dias Para o Fim do Prazo
  countFiveDays: number, //Faltam 5 Dias Para o Fim do Prazo
  countOverDue: number, //Passou do Prazo de Entrega
  countDone: number, //Prazos Concluídos
}

export type DeadlineType = {
  process_id: string,
  processNumber: string,
  expertName: string,
  deadeLine_description: string,
  deadeLine_date: string,
  deadeLine_days: number | null,
  deadeLine_done: string | null,
  situation_description: string,
  financialSituation_description: string,
}

export type FiltersType = {
  expert_names: string[],
  deadlines: string[],
  situation_descriptions: string[],
  financial_situations: string[],
  processNumber?: string,
}
