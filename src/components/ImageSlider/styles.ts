import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ImageIndexProps {
    active: boolean;
}

export const Container = styled.View`
    width: 100%;
`;

export const ImageIndexes = styled.View`
    flex-direction: row;
    align-self: flex-end;
    padding-right: ${RFValue(24)}px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
    width: ${RFValue(6)}px;
    height: ${RFValue(6)}px;

    background-color: ${({ theme, active}) => 
    active ? theme.colors.title : theme.colors.shape};

    margin-left: ${RFValue(8)}px;
    border-radius: ${RFValue(3)}px;
`;

export const CarImageWrapper = styled.View`
    align-items: center;
    justify-content: center;
    width: ${Dimensions.get('window').width}px; /*//pegar a largura da tela do usuário */ 
    height: ${RFValue(132)}px;
`;

export const CarImage = styled.Image`
    width: ${RFValue(280)}px;
    height: ${RFValue(132)}px;
`;