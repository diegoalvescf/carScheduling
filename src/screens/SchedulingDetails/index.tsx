import React, {useEffect, useState} from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Feather } from '@expo/vector-icons';
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); 
  const route = useRoute();
  const { car, dates } = route.params as Params;
  
  const rentTotal = Number(dates.length * car.rent.price);
  
  async function handleCompleteScheduling() {
    // nesse caso nao vou tratar de validação como por exemplo se a data esta 
    // disponivel, mas caso de sequencia no projeto terá que ser feito essa tratativa.
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    setLoading(true)

    console.log('CONSOLE', schedulesByCar.data.id);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates, //receber os dados antigos
      ...dates, // passa os novos
    ];
    
    await api.post('schedules_byuser',{
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy')
    })
    
    //faz a alteração passando os novos dados
    api.put(`/schedules_bycars/${car.id}`, { 
      id: car.id, //id do carro
      unavailable_dates//movos dados
    })
    .then(() => navigation.navigate('SchedulingCompleted'))
    .catch(() => 
      {
        Alert.alert('Não foi possivel realizar o agendamento.. 😔')
        setLoading(true)
      }
    )
    //.then -> outra forma de espera o retorno da api, ao inves de usar await, 
    // podemos usar o .then e então quando tiver o retorno ele executa uma ação
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: 
        format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: 
        format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'),
    })
  }, [])

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
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map( item => (
              <Accessory 
                key={item.type}
                name={item.name}
                icon={getAccessoryIcon(item.type)}
              />
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
         
          <Feather
              name='chevron-right'
              size={RFValue(24)}
              color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          enabled={!loading}
          loading={loading}
          onPress={handleCompleteScheduling} 
        />
      </Footer>
    </Container>
  );
};