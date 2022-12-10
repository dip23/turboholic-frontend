import * as yup from 'yup';

export const kendaraanSchema = yup.object().shape({
  plateNum: yup.string().required('Plat nomor wajib diisi'),
  vehicleBrand: yup.string().required('Tipe wajib diisi'),
  tankCapacity: yup.string().required('Wajib diisi'),
  barTotal: yup.string().required('Wajib diisi'),
  initialBar: yup.string().required('Wajib diisi'),
  initialOdo: yup.string().required('Wajib diisi'),
})