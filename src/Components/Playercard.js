import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Playercard = props => {
  return (
    <View
      style={[
        styles.container,
        props.isSelected && {backgroundColor: '#f72a5a'},
      ]}>
      <Text style={[styles.nameTxt, props.isSelected && {color: 'white'}]}>
        {props?.data?.name}
      </Text>
      <Text style={[styles.nameTxt, props.isSelected && {color: 'white'}]}>
        {props?.data?.role}
      </Text>
      <Text style={[styles.nameTxt, props.isSelected && {color: 'white'}]}>
        {props?.data?.event_player_credit}
      </Text>
      <Text style={[styles.nameTxt, props.isSelected && {color: 'white'}]}>
        {props?.data?.country}
      </Text>
    </View>
  );
};

export default Playercard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  nameTxt: {
    fontSiz: 19,
    color: 'black',
    marginRight: 6,
  },
});
