export type UserType = {
  kindUser?: {
    kindUser_id: string,
    kindUser_description: string, //Tipo de Usuário
    kindUser_key: string,
  },
  professional?: {
    professional_id: string,
    professional_description: string, //Atuando Como
    professional_key: string,
  },
  email: string,
  cellPhone?: string,
  active: boolean,
  _id: string,
  name: string,
  areaId?: string,
  areaDescription?: string, //Área de Atuação
  area_key?: string,
}
