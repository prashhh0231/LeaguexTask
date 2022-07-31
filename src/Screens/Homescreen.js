import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Matchcard from '../Components/Matchcard';
import accessKey from '../Constants/AccessesKey';
import {CTX} from '../Context';

const Homescreen = ({navigation}) => {
  const [matches, setMatches] = useState();
  const {_setEventId} = useContext(CTX);
  const getData = async () => {
    try {
      const response = await fetch(
        `http://15.206.110.130:5001/matches/upcoming-matches`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `${accessKey}`,
          },
        },
      );
      const data = await response.json();
      setMatches(data?.matches);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getData();
  },[]);

  const matchCardHandler = data => {
    console.log('id', data?.id, data?.event_id);
    _setEventId(data?.event_id);
    navigation.navigate('Createsqad', {
      matchId: data?.id,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleTxt}>Welcome to LeagueX</Text>
      <Text style={styles.umTitleTxt}>All Matches</Text>
      {matches?.cricket.map(val => {
        return (
          <TouchableOpacity
            onPress={() => {
              matchCardHandler(val);
            }}>
            <Matchcard val={val} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1D204D',
    textDecorationLine: 'underline',
  },
  umTitleTxt: {
    fontSize: 16,
    color: 'black',
    marginTop: 30,
  },
});
