import { Couple } from "@/interfaces/Couple";
import { useState, useEffect, useCallback } from "react";
import coupleService from "../tables/couples";
import { Marca } from "@/interfaces/Marca";
import marcaService from "../tables/marca";

function useGetMarcas() {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Marca[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getMarcas = useCallback(async () => {
    setLoading(true);
    await marcaService.get()
      .then((res) => {
        setList(res);
      })
      .catch((e) => {
        setError(e)
      })
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMarcas();
  }, [getMarcas]);

  return { loading: loading, list:  list , error: error};
}

export default useGetMarcas;