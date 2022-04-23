import { useEffect, useRef, useState } from 'react';

export const useInView = () => {
  const [inView, setInview] = useState(false);
  const ref = useRef<any>();

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver((entries) => {
      setInview(entries[0].isIntersecting);
    });

    !!el && observer.observe(el);

    return () => {
      !!el && observer.unobserve(el);
    };
  }, []);

  return { inView, ref };
};
