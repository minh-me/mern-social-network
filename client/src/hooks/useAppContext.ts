import { useContext } from 'react';
import { AppContext } from '../context/context';

export const useAppContext = () => useContext(AppContext);
