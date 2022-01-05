import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { 
  Container, 
  Header, 
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { translate } from '../../locales';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation(); 
  const route = useRoute();
  const {car} = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling',{ car }) 
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      
      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>
              {car.brand}
            </Brand>
            
            <Name>
              {car.name}
            </Name>
          </Description>

          <Rent>
            <Period>
              {car.rent.period}
            </Period>

            <Price>
              R${car.rent.price}
            </Price>
          </Rent>
        </Details>
      
        <Accessories>
          {
            car.accessories.map(item => (
              <Accessory 
                key={item.type}
                name={item.name}
                icon={getAccessoryIcon(item.type)}
              />  
            ))
          }
        </Accessories>
      
        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button 
          title={translate('choose_rental_period')} 
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};