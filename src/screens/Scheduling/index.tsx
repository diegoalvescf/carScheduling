import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { translate } from '../../locales';
import theme from '../../styles/theme';
import { 
  Container, 
  Header, 
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,

} from './styles';
import ArrowSvg from '../../assets/arrow.svg';
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { 
  Calendar, 
  DayProps, 
  generateInterval, 
  MarkedDateProps 
} from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { CarDTO } from '../../dtos/carDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';


interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  
  const navigation = useNavigation(); 
  const [
    lastSelectedDate, 
    setLastSelectedDate
  ] = useState<DayProps>({} as DayProps); //é inicializado sendo um objeto vazio de DayProps

  const [
    markedDates, 
    setMarkedDates
  ] = useState<MarkedDateProps>({} as MarkedDateProps);

  const [
    rentalPeriod, 
    setRentalPeriod
  ] = useState<RentalPeriod>({} as RentalPeriod);

  const route = useRoute();
  const {car} = route.params as Params;

  function handleConfirmRental() {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert('Selecione o intervalo para alugar.');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps){
    //Pega a data selecionado pelo usuário 
    let start = !lastSelectedDate.timestamp 
      ? date
      : lastSelectedDate;
    let end = date;

    // Função para verificar e jogar sempre a data maior para o end, e a menor para o start
    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
    
    const firstDate = Object.keys(interval)[0]; //pegar a primeira data
    const endDate = Object.keys(interval)[Object.keys(interval).length -1]; //pegar a ultima data
    
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }
  return (
    <Container>
      <StatusBar 
	        barStyle="light-content" 
	        backgroundColor="transparent"
		      translucent
      />
      <Header>
        <BackButton 
          onPress={handleBack} 
          color={theme.colors.shape}
          
        />

        <Title>
          {translate('header_title')}
        </Title>

        <RentalPeriod>
          <DateInfo>
        
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
    
          <ArrowSvg />
    
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      
      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title= {translate('confirm')} 
          onPress={handleConfirmRental} 
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
};



