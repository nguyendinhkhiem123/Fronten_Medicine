import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const schemaLogin = yup.object().shape({
  username: yup.string().required("Không được bỏ trống . Vui lòng nhập đầy đủ"),
  password: yup.string().required("Không được bỏ trống . Vui lòng nhập đầy đủ"),
});

export const schemaPerson = yup.object().shape({
  manv: yup.string(),
  email: yup
    .string()
    .email("Phải có dấu tên và đến @")
    .required("Không được bỏ trống"),
  ho: yup.string().required("Không được bỏ trống"),
  ten: yup.string().required("Không được bỏ trống"),
  diachi: yup.string().required("Không được bỏ trống"),
  sdt : yup.string().required('Không được bỏ trống').matches(phoneRegExp ,'Số điện thoại không đúng định dạng'),
  gioitinh : yup.number("Đây phải là số").typeError("Không được bỏ trống"),
  password : yup.string().required("Không được bỏ trống")
});

export const schemaEmployee = yup.object().shape({
  manv: yup.string(),
  email: yup
    .string()
    .email("Phải có dấu tên và đến @")
    .required("Không được bỏ trống"),
  ho: yup.string().required("Không được bỏ trống"),
  ten: yup.string().required("Không được bỏ trống"),
  diachi: yup.string().required("Không được bỏ trống"),
  sdt : yup.string().required('Không được bỏ trống').matches(phoneRegExp ,'Số điện thoại không đúng định dạng'),
  gioitinh : yup.number("Đây phải là số").typeError("Không được bỏ trống"),
  username : yup.string().required('Không được bỏ trống'),
  password : yup.string().required("Không được bỏ trống")
});


export const schemaMedicine = yup.object().shape({
  manhathuoc: yup.string(),
  email: yup
    .string()
    .email("Phải có dấu tên và đến @")
    .required("Không được bỏ trống"),
  tennhathuoc: yup.string().required("Không được bỏ trống"),
  diachi: yup.string().required("Không được bỏ trống"),
  sdt : yup.string().required('Không được bỏ trống').matches(phoneRegExp ,'Số điện thoại không đúng định dạng'),
  username : yup.string().required('Không được bỏ trống'),
  password : yup.string().required("Không được bỏ trống")
});

export const schemaCategory = yup.object().shape({
  tendm: yup.string().required('Không được bỏ trống'),
  madm : yup.string().required('Không được bỏ trống')
});


export const schemaProduct = yup.object().shape({
    masp :  yup.string(),
    tensp :  yup.string().required('Không được bỏ trống'),
    photo  :  yup.mixed().required("Không được bỏ trống"),
    mota_ngan : yup.string().required('Không được bỏ trống'),
    mota_chitiet : yup.string().required('Không được bỏ trống'),
    danhmuc : yup.string().required('Không được bỏ trống'),
    dongia : yup.number("Đây phải là số").typeError("Không được bỏ trống").positive("Phải là số dương").integer("Tuổi phải là số nguyên").min(1000, "Nhỏ nhất là 1.000" ),
    soluong : yup.number('Đây phải là số').typeError("Không được bỏ trống")
})