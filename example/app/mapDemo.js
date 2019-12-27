/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, Platform} from 'react-native';
import MapView from './js/MapView';
import Marker from './js/Marker';
import Polyline from './js/Polyline';

const isIos = Platform.OS === 'ios';

export default class App extends Component {
  state = {
    location: {
      latitude: 39.913607,
      longitude: 116.404844,
    },
    zoom: 18,
    isShow: true,
    titleText: '你好',
    markerIcon1: 'start_mark',
    markerIcon2: 'end_mark',
    lineColor: '#F88334',
    lineWidth: 2,
  };

  static navigationOptions = {
    title: '百度地图Demo',
  };

  isSetZoomToSpanMarkers = false;

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        location: {
          latitude: 39.935,
          longitude: 116.424,
        },
        zoom: 14,
        isShow: false,
        titleText: '你好2',
        markerIcon1: 'end_mark',
        markerIcon2: 'start_mark',
        lineColor: '#000000',
        lineWidth: 4,
      });
    }, 5000);
  }

  setCenter = () => {
    const {location} = this.state;
    this.mapView.setCenter(location);
  };

  setZoom = () => {
    this.mapView.setZoom(16);
  };

  setZoomToSpanMarkers = () => {
    const {location} = this.state;
    this.isSetZoomToSpanMarkers = true;
    this.mapView.setZoomToSpanMarkers([
      location,
      {
        latitude: 39.925,
        longitude: 116.414,
      },
    ]);
  };

  setMapView = view => {
    this.mapView = view;
  };

  render() {
    const {
      location,
      titleText,
      markerIcon1,
      markerIcon2,
      lineColor,
      lineWidth,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.buttonCon}>
          <Button
            style={styles.btn}
            title={'设置地图中心'}
            onPress={this.setCenter}
          />
          <Button
            style={styles.btn}
            title={'地图缩放'}
            onPress={this.setZoom}
          />
          <Button
            style={styles.btn}
            title={'显示所有Marker点'}
            onPress={this.setZoomToSpanMarkers}
          />
        </View>
        <MapView
          ref={this.setMapView}
          style={styles.map}
          baiduMapType={1}
          zoom={18}
          trafficEnabled={false}
          zoomControlsVisible={true}
          baiduHeatMapEnabled={false}
          centerLatLng={location}
          onMapClick={ev => {
            console.log('onMapClick:', ev.nativeEvent);
          }}
          onMapLongClick={ev => {
            console.log('onMapLongClick:', ev.nativeEvent);
          }}
          onMapPoiClick={ev => {
            console.log('onMapPoiClick:', ev.nativeEvent);
          }}
          onMapStatusChangeStart={ev => {
            console.log('onMapStatusChangeStart:', ev.nativeEvent);
          }}
          onMapStatusChange={ev => {
            console.log('onMapStatusChange:', ev.nativeEvent);
          }}
          onMapStatusChangeFinish={ev => {
            const {zoomLevel} = ev.nativeEvent;
            //改变缩放值，以此来改变marker与屏幕边的距离
            if (isIos && this.isSetZoomToSpanMarkers) {
              this.isSetZoomToSpanMarkers = false;
              this.mapView.setZoom(zoomLevel - 0.5);
            }
            console.log('onMapStatusChangeFinish:', ev.nativeEvent);
          }}
          onMapLoaded={ev => {
            console.log('onMapLoaded:', ev.nativeEvent);
          }}>
          <Marker title={titleText} icon={markerIcon1} location={location} />
          <Marker
            title={titleText}
            icon={markerIcon2}
            location={{
              latitude: 39.925,
              longitude: 116.414,
            }}
          />
          <Polyline
            width={lineWidth}
            color={lineColor}
            points={[
              location,
              {
                latitude: 39.925,
                longitude: 116.414,
              },
            ]}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonCon: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  btn: {
    marginHorizontal: 10,
  },
  map: {
    flex: 1,
  },
});
