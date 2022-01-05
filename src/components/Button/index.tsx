import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps{
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({ 
  title, 
  color, 
  enabled=true,
  loading,
  ...rest 
}: ButtonProps) {
  return (
    <Container 
      color={color}
      enabled={enabled}
      style={{
        opacity: (enabled === false || loading === true) ? 0.5 : 1
      }}
      {...rest} 
    >
      {
        loading 
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title>{title}</Title>
      }
    </Container>
  );
};
