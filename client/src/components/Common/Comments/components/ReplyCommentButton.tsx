import { CommentActionButton } from './CommentActionButton';

type Props = {
  onClick: () => void;
};

export const ReplyCommentButton = ({ onClick }: Props) => {
  return <CommentActionButton onClick={onClick}>Phản hồi</CommentActionButton>;
};
