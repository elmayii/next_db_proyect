import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import brandService from "@/services/tables/brands";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Brand } from "@/interfaces/Brand";
import { brandTypesAdapter } from "@/interfaces/adapters/BrandAdapter";

const BrandModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Brand]: string }, "key">
  >({
    brand_code: "",
    brand_name: "",
    amo_seats: "",
    fuel_code: "",
    spending: "",
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await brandService.update(editing, brandTypesAdapter(data));
          } else {
            await brandService.add(brandTypesAdapter(data));
          }
        } catch (error) {
          notification.error({ message: error as string });
        } finally {
          dispatch(hideCurrentModal());
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (editing) {
      brandService.get(editing).then((data) => {
        setData(data);
      });
    }
  }, [editing]);

  return (
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Brand</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="brand_name"
            rules={[{ required: true, message: "Brand name required" }]}
          >
            <InputText
              label="Brand"
              id="brand_name"
              maxLength={50}
              currentValue={data.brand_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, brand_name: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="amo_seats"
            rules={[{ required: true, message: "Seats required" }]}
          >
            <InputText
              label="Seats"
              id="amo_seats"
              type="number"
              min={1}
              max={200}
              currentValue={data.amo_seats}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, amo_seats: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="spending"
            rules={[{ required: true, message: "Spending required" }]}
          >
            <InputNum
              label="Spending"
              id="spending"
              maxLength={6}
              currentValue={data.spending}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, spending: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="fuel_code"
            rules={[{ required: true, message: "Fuel required" }]}
          >
            <InputSelect
              id="fuel_code"
              label="Gasoline"
              options={[{ label: "Gasoline", value: "gasoline" }]}
              currentValue={data.fuel_code}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, fuel_code: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default BrandModal;
