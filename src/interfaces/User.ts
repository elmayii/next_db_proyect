
export interface User {
  id_usuario: number;
  nom_usuario: string;
  edad: number;
  sexo: string;
  num_tel: string;
  id_mun: number;
  nom_mun?: string;
  id_rol: number;
  rol?: string;
  password: string;
}

export interface EditUser extends Omit<User, "rol"|'nom_mun'> {
  id_rol: number;
  id_mun: number;
}

export interface CreateUser extends Omit<EditUser, "id_usuario"> {}
