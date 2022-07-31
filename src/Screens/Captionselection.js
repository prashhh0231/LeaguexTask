import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import accessKey from '../Constants/AccessesKey';
import {CTX} from '../Context';

const Captionselection = ({route, navigation}) => {
  const {selectedPlayer, matchId} = route.params;
  const {event_id} = useContext(CTX);
  const [captionId, setCaptionId] = useState();
  const [voicecaptionId, setVoicecaptionId] = useState();
  console.log('selectedPlayer', captionId, voicecaptionId);

  const sendSquad = async playerId => {
    try {
      const response = await fetch(`http://15.206.110.130:5001/squad`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `${accessKey}`,
        },
        body: JSON.stringify({
          squad: [playerId],
          captain_id: captionId,
          vice_captain_id: voicecaptionId,
          match_id: [matchId],
          event_id: [event_id],
        }),
      });
      const data = await response.json();
      console.log('data', data);
      Alert.alert(`${data?.squad}- lenghth is ${playerId.length}`);
    } catch (error) {
      console.log('error', error);
    }
  };

  const submitSquad = () => {
    let player = selectedPlayer.filter(item => {
      return item.id;
    });
    let playerId = [];
    player.map(val => {
      playerId.push(val.id);
    });
    sendSquad(playerId);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headTxt}>
        Please select Caption and voice caption
      </Text>
      {selectedPlayer?.map(val => {
        return (
          <View style={{marginHorizontal: 10, marginTop: 20}}>
            <View style={styles.card}>
              <Text style={styles.cardTxt}>{val?.name}</Text>
              <Text style={styles.cardTxt}>{val?.role}</Text>
              <Text style={styles.cardTxt}>{val?.event_player_credit}</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.captianContainer}>
                <Text style={styles.txt}>C</Text>
                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => {
                    !(voicecaptionId === val.id) && setCaptionId(val?.id);
                  }}>
                  {captionId === val?.id && (
                    <View style={styles.selectedBtn}></View>
                  )}
                </TouchableOpacity>
                <Text>VC</Text>
                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => {
                    !(captionId === val.id) && setVoicecaptionId(val?.id);
                  }}>
                  {voicecaptionId === val.id && (
                    <View style={styles.selectedBtn}></View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          submitSquad();
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Save Squad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Captionselection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headTxt: {
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  radioBtn: {
    borderWidth: 1,
    borderColor: 'black',
    width: 18,
    height: 18,
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  selectedBtn: {
    backgroundColor: 'red',
    width: 15,
    height: 15,
    borderRadius: 15,
    margin: 1,
  },
  captianContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 18,
    color: 'black',
  },
  cardTxt: {
    fontSize: 18,
    color: 'black',
  },
  saveBtn: {
    marginVertical: 50,
    backgroundColor: '#d10837',
    color: 'white',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
