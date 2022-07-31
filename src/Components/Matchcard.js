import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';

const Matchcard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.sportName}>{props?.val?.sport_type}</Text>
      <Text style={styles.matchName}>
        {props?.val?.match_name} {'  '}({props?.val?.match_status})
      </Text>
      <Text style={styles.matchTypeTxt}>
        Match Type - {props?.val?.match_type}
      </Text>
    </View>
  );
};

export default memo(Matchcard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    marginTop: 20,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 0,
    paddingVertical: 10,
  },
  matchName: {
    fontSize: 16,
    color: 'black',
  },
  matchTypeTxt: {
    fontSize: 16,
    color: 'black',
  },
  sportName: {
    fontSize: 16,
    color: '#d10837',
    marginBottom: 5,
  },
});
