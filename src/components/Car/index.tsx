import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg'

import { 
  Container, 
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  CarImage
} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface CarProps extends RectButtonProps{
  data: CarDTO;
}

export function Car({data, ...rest} : CarProps){
  const MotorIcon = getAccessoryIcon(data.fuel_type)
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <MotorIcon />
        </About>
      </Details>
      
      <CarImage 
        source={{ uri: data.thumbnail }} 
        resizeMode="contain"
      />
    </Container>
  );
};