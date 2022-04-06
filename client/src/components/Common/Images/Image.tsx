import { CSSProperties, FC, memo, useEffect } from 'react';

type Props = {
  url: string;
  sx?: CSSProperties;
};

export const Image: FC<Props> = memo(({ url, sx }) => {
  useEffect(() => {
    return () => {
      url && URL.revokeObjectURL(url);
    };
  }, [url]);

  return <img style={{ width: '100%', height: '100%', objectFit: 'cover', ...sx }} src={url} />;
});
