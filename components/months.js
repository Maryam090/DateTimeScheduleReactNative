import React, {useState} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';
import DaysComponent from './days';
const countries = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export default function Months() {
  const [selectedMonth, setSelectedMonth]= useState('');
  const [days, setDays]= useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [monthDays, setMonthDays]= useState();
  const [year, setYear]= useState(new Date().getFullYear()); // current year


  const selectMonth = (month, index) => {
    let selectedMonth =  index + 1;
    setSelectedMonth(selectedMonth);
    setMonthDays(getDayNames(selectedMonth));
  }
  const getDayNames = (month) => {
  const daysInMonth = moment(`${month}-01-${year}`, 'MM-DD-YYYY').daysInMonth()
  const names = []
  for (let i = 1; i <= daysInMonth; i++) {
    let date = moment(`${month}-${i}-${year}`, 'MM-DD-YYYY')
    let dayName = date.format('ddd')
    names.push({date:date.format('MM-DD-YYYY'), dayName: dayName, dayNo: i, disabled: new Date(date).getTime() < new Date() })
  }
  
  return names
 }
 const monthPicker = (
         <SelectDropdown
	data={countries}
	onSelect={(selectedItem, index) => {
    selectMonth(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
/>
 )
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.paragraph}>
        Schedule
        </Text>
        {monthPicker}
     </View>
     {selectedMonth && <DaysComponent monthDays={monthDays}/>}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    flexDirection: 'row',
    backgroundColor: '#eee'

  },
  paragraph: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
 });
