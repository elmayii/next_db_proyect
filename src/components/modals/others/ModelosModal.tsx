import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { EditCar } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import useGetCouples from "@/services/hooks/useGetCouples";
import { coupleOptionsAdapter } from "@/interfaces/adapters/CoupleAdapter";
import { carCreateAdapter, carFormAdapter, carTypesAdapter } from "@/interfaces/adapters/CarAdapter";
import useGetBrands from "@/services/hooks/useGetBrands";
import { brandOptionsAdapter } from "@/interfaces/adapters/BrandAdapter";
import { useTranslation } from "react-i18next";
import { EditMoto, Motos } from "@/interfaces/Moto";
import { motoCreateAdapter, motoFormAdapter, motoTypesAdapter } from "@/interfaces/adapters/MotoAdapter";
import motoService from "@/services/tables/moto";
import useGetMarcas from "@/services/hooks/useGetMarcas";
import useGetModelos from "@/services/hooks/useGetModelos";
import { modeloCreateAdapter, modeloFormAdapter, modeloOptionsAdapter, modeloTypesAdapter } from "@/interfaces/adapters/ModeloAdapter";
import { marcaCreateAdapter, marcaFormAdapter, marcaOptionsAdapter, marcaTypesAdapter } from "@/interfaces/adapters/MarcaAdapter";
import { Marca } from "@/interfaces/Marca";
import marcaService from "@/services/tables/marca";
import { Modelo } from "@/interfaces/Modelo";
import modeloService from "@/services/tables/modelo";

const MotoModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const {t} = useTranslation(['Cars'])
  const editing = useSelector((state: RootState) => state.modal.editing as Modelo|undefined);
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<Modelo>>(
    {
      nom_modelo: "",
      id_modelo:''
    }
  );
  
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = modeloTypesAdapter(data);
      if (editing) {
        await modeloService.update(data.id_modelo?.toString(), adaptedTypesData);
      } else {
        await modeloService.add(modeloCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Moto creada" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    } 
  };

  useEffect(() => {
    if (editing) {
      setData(modeloFormAdapter(editing));
    }
  }, [editing]);

  return (
    <>
    {contextHolder}
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
      cancelText={t("Cancel",{ns:"translation"})}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{t(editing ? "Editar Moto" : "Insertar Moto",{ns:"Cars"})}</h2>
        <div className={styles.form_container}>
        <Form.Item
            name="matricula"
            rules={[{ required: true, message: "matricula required" }]}
          >
            <InputText
              label="Marca"
              id="nom_marca"
              maxLength={20}
              currentValue={data.nom_modelo}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, nom_marca: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
    </>
  );
};

export default MotoModal;

