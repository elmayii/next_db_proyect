import { User, CreateUser, EditUser } from "../User";

export const userTableAdapter = (users: User[]): TableDataType<User>[] => {
  return users.map((user) => ({
    id_usuario: user.id_usuario.toString(),
    nom_usuario: user.nom_usuario,
    edad: user.edad.toString(),
    sexo: user.sexo,
    num_tel: user.num_tel,
    id_mun: user.id_mun.toString(),
    id_rol: user.id_rol.toString(),
    key: user.id_usuario.toString(),
    rol: user.rol,
    nom_mun: user.nom_mun
  }));
};

export const userFormAdapter = (user: User): FormDataType<EditUser> => ({
  id_usuario: user.id_usuario.toString(),
  nom_usuario: user.nom_usuario,
  edad: user.edad.toString(),
  sexo: user.sexo,
  num_tel: user.num_tel,
  id_mun: user.id_mun.toString(),
  id_rol: user.id_rol.toString(),
  password: user.password,
});

export const userTypesAdapter = (user: FormDataType<EditUser>): EditUser => ({
  id_usuario: Number(user.id_usuario),
  nom_usuario: user.nom_usuario,
  edad: Number(user.edad.toString()),
  sexo: user.sexo,
  num_tel: user.num_tel,
  id_mun: Number(user.id_mun),
  id_rol: Number(user.id_rol),
  password: user.password,
});

export const userCreateAdapter = (user: EditUser): CreateUser => ({
  nom_usuario: user.nom_usuario,
  edad: user.edad,
  sexo: user.sexo,
  num_tel: user.num_tel,
  id_mun: user.id_mun,
  id_rol: user.id_rol,
  password: user.password,
});
