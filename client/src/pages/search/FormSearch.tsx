import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormInputSearch } from 'components/Common';

const searchSchema = yup.object({
  text: yup.string().required().trim().label('Search'),
});

type Props = { queryKey: 'name' | 'text' };
type InputProps = { text: string };

export const FormSearch: FC<Props> = ({ queryKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get(queryKey) || '';

  const { control, handleSubmit } = useForm<InputProps>({
    defaultValues: { text: queryValue },
    resolver: yupResolver(searchSchema),
  });

  const onSearch: SubmitHandler<InputProps> = (data) => {
    setSearchParams({ [queryKey]: data.text });
  };

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <FormInputSearch autoFocus={true} control={control} name="text" />
    </form>
  );
};
