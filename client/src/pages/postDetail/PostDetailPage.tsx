import { useParams } from 'react-router-dom';

import { PostItem } from '~/components/Common';
import { PostImageSkeleton } from '~/components/Common/Variants';
import { usePostById } from '~/RQhooks';

export const PostDetailPage = () => {
  const { postId } = useParams();
  const { data, isLoading } = usePostById({ postId }, { enabled: !!postId });

  if (isLoading || !data) return <PostImageSkeleton />;

  return (
    <>
      <PostItem post={data} isOpenComment={true} />
    </>
  );
};
