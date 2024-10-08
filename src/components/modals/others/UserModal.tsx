import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import userService from "@/services/tables/users";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { User, EditUser } from "@/interfaces/User";
import {
  userCreateAdapter,
  userFormAdapter,
  userTypesAdapter,
} from "@/interfaces/adapters/UserAdapter";
import { Role } from "@/interfaces/Role";
import roleService from "@/services/tables/roles";
import { roleOptionsAdapter } from "@/interfaces/adapters/RoleAdapter";

const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as User | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditUser>>({
    id_usuario: "",
    nom_usuario: "",
    password: "",
    num_tel: "",
    edad: "",
    id_rol: "",
    id_mun: "",
    sexo: "",
  });

  const [roles, setFuels] = useState<Role[]>([]);
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = userTypesAdapter(data);
      if (editing) {
        await userService.update(data.id_usuario.toString(), adaptedTypesData);
      } else {
        await userService.add(userCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "User created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  const updateRole = async () => {
    const roles = await roleService.get();
    setFuels(roles);
  };

  useEffect(() => {
    if (editing) {
      setData(userFormAdapter(editing));
    }
  }, [editing]);

  useEffect(() => {
    updateRole();
  }, []);

  return (
    <>
      {contextHolder}
      <Modal
        centered
        open
        onCancel={() => dispatch(hideCurrentModal())}
        onOk={handleOk}
      >
        <Form className="form" ref={form} method="post">
          <h2 className="form_title">{editing ? "Edit" : "Insert"} User</h2>
          <div className={styles.form_container}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Username required" }]}
            >
              <InputText
                label="Username"
                id="username"
                maxLength={50}
                currentValue={data.nom_usuario}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, username: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password required" }]}
            >
              <InputText
                label="Password"
                id="password"
                maxLength={50}
                currentValue={data.password}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, password: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Name required" }]}
            >
              <InputText
                label="Name"
                id="name"
                maxLength={50}
                currentValue={data.nom_usuario}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, name: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="id_rol"
              rules={[{ required: true, message: "Role required" }]}
            >
              <InputSelect
                id="role_code"
                label="Role"
                options={roleOptionsAdapter(roles)}
                currentValue={data.id_rol}
                onChange={(e) =>
                  setData((data) => {
                    return {
                      ...data,
                      id_rol: e.target.value,
                    };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email required" }]}
            >
              <InputText
                label="Municipio"
                id="municipio"
                maxLength={50}
                currentValue={data.id_mun}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, id_mun: e.target.value };
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

export default UserModal;
