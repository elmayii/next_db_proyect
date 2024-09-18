"use client";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { DriverWorkedTourGroup } from "@/interfaces/DriverWorkedTourGroup";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { Tourist } from "@/interfaces/TourGroup";
import { touristOptionsAdapter } from "@/interfaces/adapters/TouristAdapter";
import { reportsService } from "@/services/reports";
import { Client, ClientTable } from '@/interfaces/Clients';
import React from 'react'
import { Municipio } from "@/interfaces/Municipio";
import clientService from "@/services/tables/clients";
import { munOptionsAdapter } from "@/interfaces/adapters/MunicipioAdapter";

interface ListClientsProps {
  columns: ColumnsType<ClientTable>;
  data: ClientTable[];
  muns: Municipio[];
}

const ListClients: React.FC<ListClientsProps> = ({
  columns,
  muns,
  data,
}) => {
    const router = useRouter();
    const initialMun = muns.length > 0 ? muns[0] : "";
    const [selectedMun, setSelectedMun] = useState(initialMun);
    const [loading, setLoading] = useState(false);
    const [dataToShow, setDataToShow] = useState(data);
  
    const updateDataToShow = async () => {
      setLoading(true);
      try {
        const data = await clientService.getBy(
            selectedMun.toString()
        );
        const booleanToString = data.map((item: ClientTable )=>({
          key: item.id_cliente,
          ...item,
        }));
        setDataToShow(booleanToString);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      updateDataToShow();
    }, [selectedMun]);
  
    return (
      <>
        <div className="flex flex-col">
          <Title>{"Filtrar por Municipios"}</Title>
          <Select
            placeholder="Seleccione un Municipio"
            style={{ width: 200, marginBottom: 16 }}
            onChange={setSelectedMun}
            options={munOptionsAdapter(muns)}
            value={selectedMun}
          />
          <Table loading={loading} columns={columns} dataSource={dataToShow} />
          <footer className="flex justify-end gap-2">
            <Button
              onClick={() =>
                downloadPDF(
                  mapData(data, columns),
                  columns,
                  "Drivers worked tour group"
                )
              }
            >
              Download PDF
            </Button>
            <Button onClick={() => router.push("/", { scroll: false })}>
              Back
            </Button>
          </footer>
        </div>
      </>
    );
}

export default ListClients
