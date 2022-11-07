import React, {useState, useEffect} from 'react';
import { Text, View, Dimensions, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import Time from './time'
const { width } = Dimensions.get('window');
const previewCount = 3;
const itemWidth = width/(previewCount + .5);
const startScroll = (itemWidth * 3/4);


export default function DaysComponent(props) {
  const [selectedDay, setSelectedDay]= useState({});
  const [isDaySelected, setIsDaySelected]= useState(false);

  const flatlistRef = React.useRef();
  const data = props.monthDays;
  useEffect(() => {
        if (flatlistRef.current) flatlistRef.current.scrollToOffset({
            offset:startScroll, animated: false
        });
    }, [flatlistRef]);
  const snapToOffsets = data.map((x, i) => {
        return ((i * (itemWidth) * previewCount) + startScroll)
  })
  const selectDay = (day) => {
    setSelectedDay(day)
    setIsDaySelected(true);
    console.log("day", day)
  }
  return (
    <View>
     <FlatList
            ref={flatlistRef}
            style={styles.container}
            pagingEnabled={true}
            horizontal= {true}
            decelerationRate={0}
            snapToOffsets={snapToOffsets}
            snapToAlignment={"center"}
            data={props.monthDays}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback onPress={ () => selectDay(item)} disabled={item.disabled}>
                <View style={styles.view} >
                    <Text style={styles.text}>{item.dayName}</Text>
                    <Text style={styles.day} style={{color: item.disabled ? '#aaa' : "#000"}}> {item.dayNo} </Text>
                </View>
              </TouchableWithoutFeedback>
            )}/>
      {isDaySelected && !selectedDay.disabled && <Time  selectDay= {selectedDay}/>}
      </View>
      
  );
}


const styles = StyleSheet.create({
    container: {
    backgroundColor: '#eee'
    },
    view: {
        marginTop: 30,
        backgroundColor: '#fff',
        width: itemWidth - 20, //20 is margin left and right
        margin: 10,
        height: 90,
        borderRadius: 10,
        justifyContent : 'center',
        alignItems : 'center',
    },
    text : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#aaa',
    },
    day : {
        fontSize : 20,
        fontWeight : 'bold',
        color : '#000',
    },

});
