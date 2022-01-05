import React from 'react';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { 
  Container,
  Content,
  Title,
  Message, 
  ConfirmButtonContainer,
} from './styles';
import { StatusBar, useWindowDimensions } from 'react-native';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';

export function SchedulingCompleted() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation(); 

  function handleConfirm() {
    navigation.navigate('Home')
  }

  return (
    <Container>
      <StatusBar 
	        barStyle="light-content" 
	        backgroundColor="transparent"
		      translucent
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title> Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionaria da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>

        <ConfirmButtonContainer>
          <ConfirmButton 
            title={'OK'}
            onPress={handleConfirm}
          />
        </ConfirmButtonContainer>
      </Content>
    </Container>
  );
};

