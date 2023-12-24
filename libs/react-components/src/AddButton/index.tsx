import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';
import { add } from 'lodash-es';
import { useState } from 'react';

const CustomButton = styled(Button)`
  color: ${({ color }) => color ?? 'red'};
`;

export type AddButtonProps = ButtonProps;

export default function AddButton(props: AddButtonProps) {
  const { color } = props;
  const [number, setNumber] = useState(0);

  return (
    <CustomButton onClick={() => setNumber(add(number, 1))} color={color}>
      +1:
      {number}
    </CustomButton>
  );
}
