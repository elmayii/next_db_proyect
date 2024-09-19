"use client";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { DriverWorkedTourGroup } from "@/interfaces/DriverWorkedTourGroup";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table, Checkbox } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
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
import { authorizeModifyData } from "@/services/utils/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentModal } from "@/components/core/stores/modalSlice";
import { CRUD_ModalsType } from "@/components/modals";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { Moto, Motos } from "@/interfaces/Moto";
import RentarMotoModal from "@/components/modals/services/RentarMotoModal";

interface RentMotosProps {
    title: string;
  columns: ColumnsType<Moto>;
  data: TableDataType<Moto>[];
  checkBoxColumns?: string[];
  modal: CRUD_ModalsType;
}

const RentMotos: React.FC<RentMotosProps> = ({
  columns,
  title,
  data,
  checkBoxColumns,
  modal
}) => {

    const Filter = () =>{
        if(data?.length>0){
            return (
                data.filter((mo)=>mo.situacion == 3)
            )
        }
    }

    const {t} = useTranslation([title])
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [dataToShow, setDataToShow] = useState(Filter());
    const session = useSession()

    
  
    // const updateDataToShow = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await clientService.getBy(
    //         selectedMun.toString()
    //     );
    //     const booleanToString = data.map((item: Client )=>({
    //       key: item.id_usuario,
    //       liquidez: item.precio?.toString(),
    //       ...item,
    //     }));
    //     setDataToShow(booleanToString);
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   setLoading(false);
    // };
  
    // useEffect(() => {
    //   updateDataToShow();
    // }, [selectedMun]);

    const translateColumns = (adaptedCheckBox:ColumnsType<any>) =>{
        return adaptedCheckBox.map((item:any) =>{return {...item, title:item.title}})
      }

      const adaptedCheckBox = (): ColumnsType<any> => {
        if (checkBoxColumns && checkBoxColumns.length > 0) {
          return columns.map((column) => {
            if (column.key && checkBoxColumns.includes(column.key.toString())) {
              const { key } = column;
              return {
                ...column,
                render: (_, record) => {
                  return <Checkbox checked={record[key.toString()]} />;
                },
              } as ColumnType<any>;
            }
            return column;
          });
        }
        return columns;
      };

    const columnsAdapted: ColumnsType<any> = [
        ...translateColumns(adaptedCheckBox()),
        {
          fixed: "right",
          width: "64px",
          render: (value) => {
            return (
              <div className="flex items-center justify-end gap-2">
                <Button
                    onClick={() => dispatch(setCurrentModal(<RentarMotoModal/>))}
                    type="primary"
                    disabled={!authorizeModifyData(session.data?.id_rol,title)}
                >
                    Rentar
                </Button>
              </div>
            );
          },
        },
      ];
  
    return (
      <>
        <div className="flex flex-col">
          <Title>{"Rentar Motos"}</Title>
          <Table loading={loading} columns={columnsAdapted} dataSource={dataToShow} />
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

export default RentMotos
