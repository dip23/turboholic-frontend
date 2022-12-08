import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registerSchema = yup.object().shape({
  name: yup.string().required('Nama wajib diisi'),
  email: yup.string().email().required('Email wajib diisi'),
  phone: yup.string().required('Nomor Wajib diisi').matches(phoneRegExp, 'Format Nomor salah'),
  password: yup.string().required('Password wajib diisi'),
  secpass: yup.string().required('Password Wajib diisi').oneOf([yup.ref('password'), null], 'Password berbeda')
})