import { Option } from "@/components/commons/forms/InputSelect";
import { Role } from "../Role";

export const roleOptionsAdapter = (roles: Role[]): Option[] =>
  roles.map((role) => ({
    label: role.description,
    value: role.role_code.toString(),
  }));
