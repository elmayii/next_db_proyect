import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { useTranslation } from "react-i18next";
import { Municipio } from "@/interfaces/Municipio";
import { munCreateAdapter, munFormAdapter, munTypesAdapter } from "@/interfaces/adapters/MunicipioAdapter";
import municipioService from "@/services/tables/municipio";

const MotoModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const {t} = useTranslation(['Cars'])
  const editing = useSelector((state: RootState) => state.modal.editing as Municipio|undefined);
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<Municipio>>(
    {
      nom_mun: "",
      id_mun:''
    }
  );
  
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = munTypesAdapter(data);
      if (editing) {
        await municipioService.update(data.id_mun?.toString(), adaptedTypesData);
      } else {
        await municipioService.add(munCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Municipio creada" }); 
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    } 
  };

  useEffect(() => {
    if (editing) {
      setData(munFormAdapter(editing));
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
        <h2 className="form_title">{t(editing ? "Editar Municipio" : "Insertar Municipio",{ns:"Municipios"})}</h2>
        <div className={styles.form_container}>
        <Form.Item
            name="matricula"
            rules={[{ required: true, message: "matricula required" }]}
          >
            <InputText
              label="Marca"
              id="nom_marca"
              maxLength={20}
              currentValue={data.nom_mun}
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

