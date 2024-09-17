export interface Municipio {
    id_mun: number;
    nom_mun: string;
}

export interface CreateMunicipio extends Omit<Municipio, "id_mun"> {

}