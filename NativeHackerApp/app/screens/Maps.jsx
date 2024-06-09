import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";


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
     setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
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
     mapRef.current.animateToRegion(newRegion, 500); // Adjust the duration as needed
     fetchSupermarkets(newRegion.latitude, newRegion.longitude);
   }
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
           >
             <Callout style={styles.callout}>
               <Text style={styles.calloutTitle}>{supermarket.name}</Text>
               <Text>{supermarket.vicinity}</Text>
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
         <Text style={styles.navigationButtonText}>Up</Text>
       </TouchableOpacity>
       <View style={styles.horizontalNavigationButtonsContainer}>
         <TouchableOpacity style={styles.navigationButton} onPress={() => handleNavigation('left')}>
           <Text style={styles.navigationButtonText}>Left</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navigationButton} onPress={() => handleNavigation('right')}>
           <Text style={styles.navigationButtonText}>Right</Text>
         </TouchableOpacity>
       </View>
       <TouchableOpacity style={styles.navigationButton} onPress={() => handleNavigation('down')}>
         <Text style={styles.navigationButtonText}>Down</Text>
       </TouchableOpacity>
     </View>
   </View>
 );
};


const styles = StyleSheet.create({
 navigationButtonsContainer: {
   position: 'absolute',
   bottom: 0.125 * height,
   left: 0.05 * width,
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
 },
 horizontalNavigationButtonsContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
 },
 navigationButton: {
   backgroundColor: 'rgba(0, 0, 0, 0.7)',
   padding: 10,
   marginVertical: 5,
   borderRadius: 5,
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
