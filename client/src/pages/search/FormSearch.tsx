import { FC, memo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FormInputSearch } from '~/components/Common';

const searchSchema = yup.object({
  text: yup.string().required().trim().label('Search'),
});

type InputProps = { text: string };
type Props = { name: string; to?: string };

export const FormSearch: FC<Props> = memo(({ name, to }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryValue = searchParams.get(name) || '';

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<InputProps>({
    defaultValues: { text: queryValue },
    resolver: yupResolver(searchSchema),
  });

  const onSearch: SubmitHandler<InputProps> = (data) => {
    setSearchParams({ [name]: data.text });

    if (to) return navigate(`${to}?${name}=${data.text}`);
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
