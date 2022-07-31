import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';

import accessKey from '../Constants/AccessesKey';

const Createsqad = ({route, navigation}) => {
  const {matchId} = route.params;
  const [Squad, setSquad] = useState([]);

  const getSquad = async () => {
    try {
      const response = await fetch(
        `http://15.206.110.130:5001/squad?match_id=${matchId}`,
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
      setSquad(data);
    } catch (error) {
      console.log('error squad', error);
    }
  };

  useEffect(() => {
    getSquad();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headTxt}>Your squads</Text>
      {Squad.length === 0 && (
        <Text style={styles.errTxt}>
          Opp! Your squad is empty please create squad
        </Text>
      )}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Makesquad', {
            matchId: matchId,
          });
        }}>
        <Text style={styles.btnTxt}>Create New squad</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Createsqad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headTxt: {
    fontSize: 26,
    color: 'black',
  },
  btn: {
    backgroundColor: '#d10837',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  btnTxt: {
    color: 'white',
    fontSize: 20,
  },
  errTxt: {
    fontSize: 20,
    color: 'red',
    marginTop: 80,
  },
});
