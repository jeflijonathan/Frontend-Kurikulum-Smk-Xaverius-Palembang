import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateClassCoordinatorModel } from "@api/classcoordinator/model";

export const classcoordinatorreqDefaultValues: UpdateClassCoordinatorModel = {
  nisn: "",
  name: "",
  email: "",
  password: "",
  id_ruang_kelas: 0,
  no_telp: "",
  status: false,
};

export const classCoordinatorValidations = yupResolver(
  yup.object().shape({
    nisn: yup.string().max(10).required("NISN is required"),
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string(),
    id_ruang_kelas: yup
      .number()
      .typeError("Classroom must be selected")
      .moreThan(0, "Classroom must be selected")
      .required("Classroom is required"),
    no_telp: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
    status: yup.boolean().required("Status is required"),
  })
);

export const classCoordinatorDetailsFormatter = (
  data: UpdateClassCoordinatorModel
): UpdateClassCoordinatorModel => {
  return {
    nisn: data.nisn,
    name: data.name,
    email: data.email,
    password: data.password,
    id_ruang_kelas: data.id_ruang_kelas,
    no_telp: data.no_telp,
    status: false,
  };
};
