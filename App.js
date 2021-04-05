import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BGLOC_TASK_NAME } from "./bgloc";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationAccuracy, LocationActivityType } from 'expo-location';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {done: false};
  }

  async componentDidMount() {
    var perms = await Permissions.askAsync(Permissions.LOCATION);
    if (perms.granted) {
      try { // Stop previous Location task
        await Location.stopLocationUpdatesAsync(BGLOC_TASK_NAME);
      } catch (_) {}
      await Location.startLocationUpdatesAsync(BGLOC_TASK_NAME, {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 0,
        distanceInterval: 0,
        deferredUpdatesInterval: 0,
        deferredUpdatesDistance: 0,
        showsBackgroundLocationIndicator: false,
        activityType: LocationActivityType.Other
      });
    } else {
      console.warn("[App] Location permissions denied: can't initialize BGLOC.");
    }

    this.setState({
      done: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>BGLOC: {this.state.done ? "Initialized" : "In progress"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
