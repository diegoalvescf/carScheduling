import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';
import theme from '../../styles/theme';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

interface BackButtonProps extends BorderlessButtonProps{
  color?: string;
}

export function BackButton({ color, ...rest }: BackButtonProps) {
  return (
    <Container {...rest}>
      <MaterialIcons 
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text} //se foi informado a cor usa ela, se não usa a padrão do tema
      />
      
    </Container>
  );
};



