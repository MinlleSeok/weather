import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = '981de81e717445464457a8a94529f9bb';

export default class App extends React.Component {

  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      console.log(data);
  }

  getLocation = async () => {
    try {
      // throw Error();
      await Location.requestPermissionsAsync();
      const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync();
      // Send to API and get Weather
      this.getWeather(latitude, longitude);
      //console.log(coords);
      this.setState({ isLoading : false });
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
    
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
