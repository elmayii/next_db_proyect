export interface Situacion {
    id_situa: number;
    nom_situa: string | null;
}
export interface CreateSituacion extends Omit<Situacion, "id_situa"> {
}