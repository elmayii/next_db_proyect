export interface Role {
  id_role: number;
  nom_rol: string;
}

export interface CreateRole extends Omit<Role, "id_role"> {}
