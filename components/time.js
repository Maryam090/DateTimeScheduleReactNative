import React, {useState, useEffect} from 'react';
import { Text, View, Dimensions, FlatList, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';
import moment from 'moment';

const { width } = Dimensions.get('window');
const previewCount = 3;
const itemWidth = width/(previewCount + .5);
const startScroll = (itemWidth * 3/4);


export default function TimeComponent(props) {
  const [hours, setHours]= useState([]);
  const [isShow, setIsShow]= useState(false);
  const [finalDateTime, setDateTime]= useState();

  const flatlistRef = React.useRef();
  useEffect(() => {
        if (flatlistRef.current) flatlistRef.current.scrollToOffset({
            offset:startScroll, animated: false
        });
      
    }, [flatlistRef]);

  useEffect(() => {
  handleHours();
}, []);
  const handleHours = ( ) =>{
      const getHours = [];
 for(let hour = 0; hour < 24; hour++) {
    getHours.push(moment({ hour }).format('HH:mm'));
    getHours.push(
        moment({
            hour,
            minute: 30
        }).format('HH:mm')
    );
    }
    setHours(getHours)
  }
  const snapToOffsets = hours && hours.map((x, i) => {
        return ((i * (itemWidth) * previewCount) + startScroll)
  })
  const selectHour = (hour) => {
  console.log(hour, props);
  
  setDateTime(props.selectDay.date + ' ' + hour)
  }
  const submitTime = () =>{
  setIsShow(true)

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
            data={hours}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback onPress={ () => selectHour(item)} disabled={moment(item, 'h:mm').isBefore(new Date().toLocaleTimeString())} >
                <View style={styles.view} >
                    <Text style={styles.text}>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}/>
      <Button onPress={submitTime} title="Submit" />   

        <View>
    {isShow && finalDateTime &&  <Text> {finalDateTime} </Text>  }
      </View>
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
        height: 50,
        borderRadius: 10,
        justifyContent : 'center',
        alignItems : 'center',
    },
    text : {
        fontSize : 20,
        fontWeight : 'bold',
        color : '#000',
    },
    

});
