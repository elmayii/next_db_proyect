import { Couple } from "@/interfaces/Couple";
import { useState, useEffect, useCallback } from "react";
import coupleService from "../tables/couples";
import { Marca } from "@/interfaces/Marca";
import modeloService from "../tables/modelo";
import { Modelo } from "@prisma/client";

function useGetModelos() {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Modelo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getModelos = useCallback(async () => {
    setLoading(true);
    await modeloService.get()
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
    getModelos();
  }, [getModelos]);

  return { loading: loading, list:  list , error: error};
}

export default useGetModelos;