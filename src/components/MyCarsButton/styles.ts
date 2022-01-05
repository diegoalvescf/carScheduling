
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Ionicons} from '@expo/vector-icons/';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    border-radius: 30px;
    
    width: 60px;
    height: 60px;

    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.main};
`;

export const Icon = styled(Ionicons)``;

