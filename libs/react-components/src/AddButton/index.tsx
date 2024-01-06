import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';
import { add } from 'lodash-es';

import { useCounter } from '@/hooks/useCounter';

const CustomButton = styled(Button)`
  color: ${({ color }) => color ?? 'red'};
`;

export type AddButtonProps = ButtonProps;

export default function AddButton(props: AddButtonProps) {
  const { color } = props;
  const [value, change] = useCounter({
    init: 0,
    cb: (val) => add(val, 2)
  });

  return (
    <CustomButton onClick={() => change(value)} color={color}>
      +2:
      {value}
    </CustomButton>
  );
}
