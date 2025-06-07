'use client';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

type JalaliDateValue = Date | string | DateObject | null;

type Props = {
  value: JalaliDateValue;
  onChange: (date: DateObject | null) => void;
};

export default function JalaliDatePicker({ value, onChange }: Props) {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      inputClass="w-full border rounded px-3 py-2"
      format="YYYY/MM/DD"
      style={{ width: '100%' }}
    />
  );
}