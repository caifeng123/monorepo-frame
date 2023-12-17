import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';
import { useState } from 'react';

const CustomButton = styled(Button)`
  color: ${({ color }) => color ?? 'blue'};
`;

export type SubButtonProps = ButtonProps;

export function SubButton(props: SubButtonProps) {
  const { color } = props;
  const [number, setNumber] = useState(0);

  return (
    <CustomButton onClick={() => setNumber(number - 1)} color={color}>
      -1:
      {number}
    </CustomButton>
  );
}
