import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Alert, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import {
	Back,
	LocationBox,
	LocationText,
	LocationTimeBox,
	LocationTimeText,
	LocationTimeTextSmall
  } from "./styles";

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

Geocoder.init('AIzaSyDsS2DspdDuZTAZNXDyDqPivN7VseN53Co');

function Map() {
	const [region, setRegion] = useState(null);
	const [location, setlocation] = useState(null);
	const [destination, setDestination] = useState(null);
	const [pathDuration, setPathDuration] = useState(null);
	
	const { width, height } = Dimensions.get('window');
	
	useEffect(() => {
		async function findCoordinates() {
			Geolocation.getCurrentPosition(
				async ({ coords: { latitude, longitude }}) => {
					const response = await Geocoder.from({ latitude, longitude });
					const address = response.results[0].address_components;
					
					setlocation(`${address[1]["short_name"]}, ${address[0]["short_name"]}`);

					setRegion({
						latitude,
						longitude,
						latitudeDelta: 0.0143,
						longitudeDelta: 0.0134,
					})
			}, error => {
				Alert.alert(error.message);
			}, { enableHighAccuracy: true, timeout: 2000 });
		}
		findCoordinates();
	}, []);
	
	function handleLocationSelected(data, { geometry }) {
		const { location: { lat: latitude, lng: longitude } } = geometry;
		
		setDestination({
			latitude,
			longitude, 
			title: data.structured_formatting.main_text,
		});
	};

	function handlePathDuration(props) {
		setPathDuration(Math.floor(props));
	};

	function handleBack() {
		setDestination(null);
	};
	
	return (
		<View style={styles.container}>
			<MapView 
				style={styles.map}
				region={region}
				showsUserLocation
				loadingEnabled
				ref={element => mapView = element}
			>
				{ destination && (
					<>
						<Directions
							origin={region}
							destination={destination}
							onReady={result => {
								handlePathDuration(result.duration);
								mapView.fitToCoordinates(result.coordinates, {
									edgePadding: {
										top: (height / 3),
										left: (width / 5),
										bottom: (height / 0.95),
										right: (width / 20),
									}
								});
							}}
						/>
						<Marker 
							coordinate={destination}
							anchor={{ x: 0.5, y: 0.5 }}
							image={markerImage}
						>
							<LocationBox>
								<LocationText>
									{destination.title}
								</LocationText>
							</LocationBox>
						</Marker>

						<Marker coordinate={region} 
							anchor={{ x: 0, y: 0 }}>
							<LocationBox>
								<LocationTimeBox>
									<LocationTimeText>{pathDuration}</LocationTimeText>
									<LocationTimeTextSmall>MIN</LocationTimeTextSmall>
								</LocationTimeBox>
								<LocationText>{location}</LocationText>
							</LocationBox>
						</Marker>

					</>
				)}
			</MapView>
	{ destination ? (
		<>
			<Back onPress={handleBack}>
				<Image source={backImage} />
			</Back>
			<Details />
		</>
		) : (
		<Search onLocationSelected={handleLocationSelected}/>
		)}
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
});

export default Map;