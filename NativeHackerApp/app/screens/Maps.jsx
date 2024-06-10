import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import COLORS from "../constants/colors";

const GOOGLE_PLACES_API_KEY = 'AIzaSyBbcOqj7cnjA-3E_VRsCFyzKjUygMGAQnU';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const mapJson = [
 {
   "featureType": "poi",
   "elementType": "labels.text",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "poi.business",
   "stylers": [
     {
       "visibility": "on"
     }
   ]
 },
 {
   "featureType": "road",
   "elementType": "labels.icon",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "road.highway",
   "elementType": "geometry.stroke",
   "stylers": [
     {
       "color": "#855a05"
     },
     {
       "weight": 1.5
     }
   ]
 },
 {
   "featureType": "transit",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 }
]

const MapScreen = () => {
 const [supermarkets, setSupermarkets] = useState([]);
 const [region, setRegion] = useState(null);
 const mapRef = useRef(null);
 const navigation = useNavigation();


 useEffect(() => {
   const fetchSupermarkets = async (latitude, longitude) => {
     try {
       const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=supermarket&key=${GOOGLE_PLACES_API_KEY}`);
       const data = await response.json();
       if (data.status === 'OK') {
         setSupermarkets(data.results);
       } else {
         console.error('Error fetching supermarkets:', data.status, data.error_message);
       }
     } catch (error) {
       console.error('Network error:', error);
     }
   };


   const getLocation = async () => {
     let { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== 'granted') {
       console.log('Permission to access location was denied');
       return;
     }


     let location = await Location.getCurrentPositionAsync({});
     const { latitude, longitude } = location.coords;
     setRegion({ latitude, longitude, latitudeDelta: calculateDelta(latitude, 150), longitudeDelta: calculateDelta(longitude, 150) });
     fetchSupermarkets(latitude, longitude);
   };


   getLocation();
 }, []);


 const handleNavigation = (direction) => {
   if (mapRef.current) {
     const { latitudeDelta, longitudeDelta } = region;
     const distance = 0.002; // Adjust this value to change the distance moved
     let newRegion = { ...region };
     switch (direction) {
       case 'up':
         newRegion.latitude += distance;
         break;
       case 'down':
         newRegion.latitude -= distance;
         break;
       case 'left':
         newRegion.longitude -= distance;
         break;
       case 'right':
         newRegion.longitude += distance;
         break;
       default:
         break;
     }
     setRegion(newRegion);
     mapRef.current.animateToRegion(newRegion, 4000); // Adjust the duration as needed
     fetchSupermarkets(newRegion.latitude, newRegion.longitude);
   }
 };

 const handleMarkerPress = (supermarket) => {
  const { lat, lng } = supermarket.geometry.location;
  const padding = 150; 

  mapRef.current.animateToRegion({
    latitude: lat,
    longitude: lng,
    latitudeDelta: calculateDelta(lat, padding),
    longitudeDelta: calculateDelta(lng, padding),
  });
};

const calculateDelta = (coordinate, padding) => {
  const scale = padding / height;
  const delta = scale * 0.1; // 0.1 is a zoom level, adjust as needed
  return delta;
};

 const fetchSupermarkets = async (latitude, longitude) => {
   try {
     const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=supermarket&key=${GOOGLE_PLACES_API_KEY}`);
     const data = await response.json();
     if (data.status === 'OK') {
       setSupermarkets(data.results);
     } else {
       console.error('Error fetching supermarkets:', data.status, data.error_message);
     }
   } catch (error) {
     console.error('Network error:', error);
   }
 };


 return (
   <View style={{ flex: 1 }}>
     {region ? (
       <MapView
         style={{ flex: 1 }}
         ref={mapRef}
         region={region}
         customMapStyle={mapJson}
         onRegionChangeComplete={(region) => setRegion(region)}
         scrollEnabled={false} // Disable scroll gesture
       >
         {supermarkets.map((supermarket) => (
           <Marker
             key={supermarket.place_id}
             coordinate={{
               latitude: supermarket.geometry.location.lat,
               longitude: supermarket.geometry.location.lng,
             }}
             title={supermarket.name}
             description={supermarket.vicinity}
             onPress={() => handleMarkerPress(supermarket)}
          >
            <Entypo name="shopping-basket" size={0.12 * width} color = {COLORS.green} />
             <Callout style={styles.callout} anchor={{ x: 0.5, y: 1 }}>
               <Text style={styles.calloutTitle}>{supermarket.name}</Text>
               <Text style = {{textAlign: "center"}}>{supermarket.vicinity}</Text>
               <Button title = "Check Out Items Here" onPress = {() => navigation.navigate('Search')}/>
             </Callout>
           </Marker>
         ))}
       </MapView>
     ) : (
       <Text>Loading...</Text>
     )}
     <View style={styles.navigationButtonsContainer}>
       <TouchableOpacity style={styles.navigationButton} onPress={() => handleNavigation('up')}>
       <Entypo name="arrow-bold-up" size={0.08 * width} color="white" />
       </TouchableOpacity>
       <View style={styles.horizontalNavigationButtonsContainer}>
         <TouchableOpacity style={styles.horizontalNavigationButton} onPress={() => handleNavigation('left')}>
         <Entypo name="arrow-bold-left" size={0.08 * width} color="white" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.horizontalNavigationButton} onPress={() => handleNavigation('right')}>
         <Entypo name="arrow-bold-right" size={0.08 * width} color="white" />
         </TouchableOpacity>
       </View>
       <TouchableOpacity style={styles.navigationButton} onPress={() => handleNavigation('down')}>
       <Entypo name="arrow-bold-down" size={0.08 * width} color="white" />
       </TouchableOpacity>
     </View>
   </View>
 );
};

const styles = StyleSheet.create({
 navigationButtonsContainer: {
   position: 'absolute',
   bottom: 0.125 * height,
   left: 0.01 * width,
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
 },
 horizontalNavigationButtonsContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
 },
 horizontalNavigationButton: {
   backgroundColor: '#619f75',
   padding: 10,
   marginHorizontal: 0.05 * width,
   borderRadius: 100,
 },
 navigationButton: {
   backgroundColor: '#619f75',
   padding: 10,
   borderRadius: 100,
 },
 navigationButtonText: {
   color: 'white',
   fontSize: 16,
   fontWeight: 'bold',
 },
 callout: {
   width: 0.5 * width, // Adjust the width of the callout as needed
   justifyContent: "center",
   alignItems: "center"
 },
 calloutTitle: {
   fontSize: 16,
   fontWeight: 'bold',
 },
});


export default MapScreen;


/*import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
AIzaSyBbcOqj7cnjA-3E_VRsCFyzKjUygMGAQnU


let locationsOfInterest = [
 {
   title: "First",
   location: {
     latitude: 1.4,
     longitude: 103,
   },
   description: "My First Marker"
 },
 {
   title: "Second",
   location: {
     latitude: 1.5,
     longitude: 104,
   },
   description: "My Second Marker"
 }
]


const showLocationsOfInterest = () => {
 return locationsOfInterest.map((item, index) => {
     return (
       <Marker
       key = {index}
       coordinate = {item.location}
       title = {item.title}
       description = {item.description}
       />
     )
   });
};


const mapJson = [
 {
   "featureType": "poi",
   "elementType": "labels.text",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "poi.business",
   "stylers": [
     {
       "visibility": "on"
     }
   ]
 },
 {
   "featureType": "road",
   "elementType": "labels.icon",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "road.highway",
   "elementType": "geometry.stroke",
   "stylers": [
     {
       "color": "#855a05"
     },
     {
       "weight": 1.5
     }
   ]
 },
 {
   "featureType": "transit",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 }
]


export default function Maps() {
 const onRegionChange = (region) => {
   console.log(region);
 };


 const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
   latitude: 1.4, longitude: 103.75
 })


 return (
   <View style={styles.container}>
     <MapView
     style={styles.map}
     onRegionChange={onRegionChange}
     initialRegion = {{
       "latitude": 1.3846821902614217, "latitudeDelta": 1.951891082377017, "longitude": 103.78811212476198, "longitudeDelta": 1.0007138350425606
     }}
     customMapStyle={mapJson}>
       {showLocationsOfInterest()}
       <Marker
       draggable
       coordinate={draggableMarkerCoord}
       onDragEnd = {(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
       />
     </MapView>
   </View>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center"
 },
 map: {
   width: '100%',
   height: '100%',
 },
});
*/
