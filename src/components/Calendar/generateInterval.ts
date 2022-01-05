import { eachDayOfInterval, format } from 'date-fns';
import { DayProps, MarkedDateProps } from '.';
import theme from '../../styles/theme';
import { getPlatformDate } from '../../utils/getPlatformDate';

export function generateInterval(start: DayProps, end: DayProps){
    let interval: MarkedDateProps = {};

    eachDayOfInterval({ 
        start: new Date(start.timestamp), 
        end: new Date(end.timestamp)
    }).forEach(( item ) => { //percorre o intevalo pegando data a data 
        const date = format(getPlatformDate(item), 'yyyy-MM-dd'); //formata a data para esse modelo
        
        interval = {
            ...interval, //pega o valor antigo
            [date]: { 
                color: start.dateString === date || end.dateString === date //verifica se as datas são a data inicial OU a data final
                ? theme.colors.main // se for aplica a cor em destaque
                : theme.colors.main_light, // se não for aplica a cor mais clara para preencher o intervalo
                
                textColor: start.dateString === date || end.dateString === date //verifica se as datas são a data inicial OU a data final
                ? theme.colors.main_light // se for aplica a cor em destaque
                : theme.colors.main, // se não for aplica a cor mais clara para preencher o intervalo
                
            }
        }
    });

    return interval;
}