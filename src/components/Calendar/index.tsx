import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
    Calendar as CustomCalendar, DateData
} from 'react-native-calendars';

import * as LocaleConfig from './LocaleConfig';

interface MarketDateProps {
    [data: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disabledTouchEvent?: boolean;
    }
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
}

interface CalendarProps {
    marketDates: MarketDateProps;
    onDayPress: DateData;
}

function Calendar({
    marketDates,
    onDayPress
}: CalendarProps) {
    const theme = useTheme();

    return (
        <CustomCalendar
            renderArrow={(direction) => (
                <Feather
                    size={24}
                    color={theme.colors.text}
                    name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                />
            )}
            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom: 10,
            }}
            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 10,
                textMonthFontFamily: theme.fonts.secondary_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15,
                }
            }}
            firstDay={1}
            minDate={new Date().toISOString()}
            markingType={'period'}
            markedDates={marketDates}
            onDayPress={onDayPress}
        />
    );
}

export {
    Calendar,
    MarketDateProps,
    DayProps,
}