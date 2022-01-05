import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { translate } from "../../locales";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  CarsButtonContainer,
  TotalCards,
} from "./styles";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/carDTO";
import { Load } from "../../components/Load";

import { MyCarsButton } from "../../components/MyCarsButton";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCards>{`Total de ${cars.length} carros.`}</TotalCards>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <CarsButtonContainer>
        <MyCarsButton name="ios-car-sport" onPress={handleOpenMyCars} />
      </CarsButtonContainer>
    </Container>
  );
}
