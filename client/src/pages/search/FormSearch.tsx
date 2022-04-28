import { FC, memo, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import { FormInputSearch } from 'components/Common';

const searchSchema = yup.object({
  text: yup.string().required().trim().label('Search'),
});

type InputProps = { text: string };
type Props = { name: string };

export const FormSearch: FC<Props> = memo(({ name }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get(name) || '';

  const { control, handleSubmit, reset } = useForm<InputProps>({
    defaultValues: { text: queryValue },
    resolver: yupResolver(searchSchema),
  });

  const onSearch: SubmitHandler<InputProps> = (data) => {
    setSearchParams({ [name]: data.text });
  };

  useEffect(() => {
    reset({ text: queryValue });
  }, [queryValue, reset]);

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <FormInputSearch autoFocus={true} control={control} name="text" />
    </form>
  );
});
