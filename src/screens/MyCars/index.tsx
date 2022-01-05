import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/carDTO';
import { api } from '../../services/api';
import theme from '../../styles/theme';
import { AntDesign } from '@expo/vector-icons'

import { 
  Appointments, 
  AppointmentsQuantity, 
  AppointmentsTitle, 
  CarFooter, 
  CarFooterDate, 
  CarFooterPeriod, 
  CarFooterTitle, 
  CarWrapper, 
  Container, 
  Content, 
  Header, 
  SubTitle, 
  Title 
} from './styles';
import { Load } from '../../components/Load';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars({navigation}) {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('schedules_byuser?user_id=1');
        setCars(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCars();
    
  },[]);

  function handleBack() {
    navigation.goBack();
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
          Seus agendamentos,{'\n'}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>
      { loading 
        ? <Load />
        : <Content>
            <Appointments>
              <AppointmentsTitle>
                Agendamentos feitos
              </AppointmentsTitle>
              <AppointmentsQuantity>
                {cars.length}
              </AppointmentsQuantity>
            </Appointments>

            <FlatList 
              data={cars}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <CarWrapper>
                  <Car data={item.car} />

                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>

                    <CarFooterPeriod> 
                      <CarFooterDate>{item.startDate}</CarFooterDate>

                      <AntDesign 
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />

                      <CarFooterDate>{item.endDate}</CarFooterDate>

                    </CarFooterPeriod>
                  </CarFooter>

                </CarWrapper>
              )}
            />
          </Content>
      
      }
    </Container>
  );
};
