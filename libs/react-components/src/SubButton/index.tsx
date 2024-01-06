import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';
import { subtract } from 'lodash-es';

import { useCounter } from '@/hooks/useCounter';

const CustomButton = styled(Button)`
  color: ${({ color }) => color ?? 'blue'};
`;

export type SubButtonProps = ButtonProps;

export default function SubButton(props: SubButtonProps) {
  const { color } = props;
  const [value, change] = useCounter({
    init: 0,
    cb: (val) => subtract(val, 2)
  });

  return (
    <CustomButton onClick={() => change(value)} color={color}>
      -2:
      {value}
    </CustomButton>
  );
}
