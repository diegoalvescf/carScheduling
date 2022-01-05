import React from "react";
import { Container, Icon } from "./styles";
import theme from "../../styles/theme";
import { RectButtonProps } from "react-native-gesture-handler";

interface MyCarsButtonProps extends RectButtonProps {
  name: string;
  onPress: () => void;
}

export function MyCarsButton({ name, onPress, ...rest }: MyCarsButtonProps) {
  return (
    <Container onPress={onPress}>
      <Icon name={name} size={32} color={theme.colors.shape} />
    </Container>
  );
}
