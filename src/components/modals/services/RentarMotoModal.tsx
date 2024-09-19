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
import { modeloOptionsAdapter } from "@/interfaces/adapters/ModeloAdapter";
import { marcaOptionsAdapter } from "@/interfaces/adapters/MarcaAdapter";
import { EditContract } from "@/interfaces/Contract";
import { CRUD_ModalsType } from "..";

const RentarMotoModal: React.FC<CRUD_ModalsType> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const {t} = useTranslation(['Cars'])
  const editing = useSelector((state: RootState) => state.modal.editing as EditMoto|undefined);
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditContract>>(
    {
      fecha_ini: "",
      fecha_fin: "",
      dias_prorro: "",
      seguro:"",
      id_moto: "",
      id_usuario:""
    }
  );

  const marcasData = useGetMarcas()
  const modelosData = useGetModelos(data.id_marca || "")
  
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = motoTypesAdapter(data);
      if (editing) {
        await motoService.update(data.id_moto?.toString(), adaptedTypesData);
      } else {
        await motoService.add(motoCreateAdapter(adaptedTypesData));
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
      setData(motoFormAdapter(editing));
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
              label="matricula"
              id="matricula"
              maxLength={8}
              currentValue={data.matricula}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, matricula: e.target.value };
                })
              }
            />
          </Form.Item>

          <Form.Item
            name="color"
            rules={[{ required: true, message: "Color requerido" }]}
          >
            <InputText
              label="Color"
              id="color"
              maxLength={6}
              currentValue={data.color}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, color: e.target.value };
                })
              }
            />
          </Form.Item>

          <Form.Item
            name="marca"
            rules={[{ required: true, message: "Marca is required" }]}
          >
            <InputSelect
              label="Marca"
              id="marca"
              currentValue={data.id_marca}
              options={marcaOptionsAdapter(marcasData.list)}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, id_marca: e.target.value };
                })
              }
            />
          </Form.Item>

          <Form.Item
            name="Modelo"
            rules={[{ required: true, message: "Select the Modelo" }]}
          >
            <InputSelect
              label="Modelo"
              id="modelo"
              currentValue={data.id_modelo}
              options={modeloOptionsAdapter(modelosData.list)}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, id_modelo: e.target.value };
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

export default RentarMotoModal;
