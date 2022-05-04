import { ActionButton } from './ActionButton';

type Props = {
  onClick: () => void;
};

export const ReplyCommentButton = ({ onClick }: Props) => {
  return <ActionButton onClick={onClick}>Phản hồi</ActionButton>;
};
