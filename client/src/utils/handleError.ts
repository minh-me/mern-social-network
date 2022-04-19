import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const handlerError = (error: Error | AxiosError) => {
  const errorMsg =
    axios.isAxiosError(error) && error?.response ? error?.response?.data.error : error.message;
  toast.error(errorMsg);
};
