import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import accessKey from '../Constants/AccessesKey';
import Playercard from '../Components/Playercard';

const Makesquad = ({route, navigation}) => {
  const {matchId} = route.params;

  const [allPlayer, setAllplayer] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState([]);

  const [bowlerCount, setBowlerCount] = useState(0);
  const [batsmanCount, setBatsmanCOunt] = useState(0);
  const [alCount, setAl] = useState(0);
  const [wcCount, setWc] = useState(0);
  const [points, setPoint] = useState(100);

  const getAllPlayer = async () => {
    try {
      const response = await fetch(
        `http://15.206.110.130:5001/squad/players?match_id=${matchId}`,
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
      setAllplayer(data);
    } catch (error) {
      console.log('all player error', error);
    }
  };
  useEffect(() => {
    getAllPlayer();
  }, []);

  const addPlayer = playerInfo => {
    console.log('role', playerInfo.role);
    setPoint(points - playerInfo.event_player_credit);

    if (playerInfo.role === 'Bowler' && bowlerCount <= 7) {
      setBowlerCount(bowlerCount + 1);
      setSelectedPlayer([...selectedPlayer, playerInfo]);
    } else if (playerInfo.role === 'Batsman' && batsmanCount <= 7) {
      setBatsmanCOunt(batsmanCount + 1);
      setSelectedPlayer([...selectedPlayer, playerInfo]);
    } else if (playerInfo.role === 'All-Rounder' && alCount <= 4) {
      setAl(alCount + 1);
      setSelectedPlayer([...selectedPlayer, playerInfo]);
    } else if (playerInfo.role === 'Wicket-Keeper' && wcCount <= 5) {
      setWc(wcCount + 1);
      setSelectedPlayer([...selectedPlayer, playerInfo]);
    }
  };

  const removePlayer = playerInfo => {
    setPoint(points + playerInfo.event_player_credit);
    let arr = selectedPlayer.filter(item => item.id !== playerInfo.id);
    setSelectedPlayer(arr);
    if (playerInfo.role === 'Bowler') {
      setBowlerCount(bowlerCount - 1);
    } else if (playerInfo.role === 'Batsman') {
      setBatsmanCOunt(batsmanCount - 1);
    } else if (playerInfo.role === 'All-Rounder') {
      setAl(alCount - 1);
    } else if (playerInfo.role === 'Wicket-Keeper') {
      setWc(wcCount - 1);
    }
  };
  console.log('len', selectedPlayer.length);

  useEffect(() => {
    if (selectedPlayer.length === 11) {
      Alert.alert('You have selected 11 player');
    }
  }, [selectedPlayer]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headTxt}>Please select players </Text>
        <Text style={styles.pointTxt1}>Remaining Points {points}</Text>
        <View style={styles.selectedInfo}>
          <Text style={styles.pointTxt}>Bowler - {bowlerCount}</Text>
          <Text style={styles.pointTxt}>Batsman - {batsmanCount}</Text>
        </View>
        <View style={styles.selectedInfo}>
          <Text style={styles.pointTxt}>All rounder - {alCount}</Text>
          <Text style={styles.pointTxt}>Wicket Keeper - {wcCount}</Text>
        </View>
        <View style={styles.border1}></View>
        {allPlayer?.map(val => {
          let isSelected = false;
          selectedPlayer.map(val2 => {
            if (val.id === val2.id) {
              isSelected = true;
            }
          });
          return (
            <TouchableOpacity
              onPress={() =>
                selectedPlayer.length < 11
                  ? isSelected
                    ? removePlayer(val)
                    : addPlayer(val)
                  : isSelected && removePlayer(val)
              }>
              <Playercard data={val} isSelected={isSelected} />
            </TouchableOpacity>
          );
        })}
        <Text></Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (selectedPlayer.length === 11) {
            navigation.navigate('Captionselection', {
              selectedPlayer: selectedPlayer,
              matchId: matchId,
            });
          } else {
            Alert.alert('Please select 11 players');
          }
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Makesquad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  headTxt: {
    fontSize: 28,
    color: 'black',
    marginBottom: 10,
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
  pointTxt: {
    marginBottom: 20,
    color: 'black',
  },
  selectedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointTxt1: {
    marginBottom: 20,
    color: '#d10837',
  },
  border1: {
    borderBottomWidth: 1,
    borderColor: '#a6a4a4',
  },
});
