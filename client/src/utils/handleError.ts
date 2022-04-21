import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const handlerError = (error: Error | AxiosError) => {
  const errorMsg =
    axios.isAxiosError(error) && error?.response
      ? convertErrors(error?.response?.data.error)
      : error.message;
  toast.error(errorMsg);
};
const convertErrors = (error: [string] | string) =>
  Array.isArray(error) ? error.join(',') : error;
