import { useEffect } from 'react';

export const ImagePreview = ({ url }: { url: string }) => {
  useEffect(() => {
    return () => {
      url && URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <>
      <img
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '4px',
        }}
        src={url}
        alt={url}
      />
    </>
  );
};
