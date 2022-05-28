import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
// import Product from './product'

// 49.017039, 104.021593

const center = { lat: 49.017039, lng: 104.021593 };

function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [busRoute, setBusRoute] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  console.log("busRoute", busRoute);

  const google = window.google;

  //  const flightPlanCoordinates = [
  //     { lat: 37.772, lng: -122.214 },
  //     { lat: 21.291, lng: -157.821 },
  //     { lat: -18.142, lng: 178.431 },
  //     { lat: -27.467, lng: 153.027 },
  //   ];

  // console.log("asd", dummyData[2].shape.vertices)

  const BusPath = new google.maps.Polyline({
    path: dummyData[busRoute].shape.vertices,
    geodesic: true,
    strokeColor: dummyData[busRoute].color,
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  BusPath.setMap(map);

  const handleBusRoute = (idx) => {
    BusPath.setMap(null);
    setBusRoute(idx);
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {/* <Marker position={center} /> */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Эхлэх Цэг" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Дуусах цэг"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Тооцоолох
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Зай: {distance} </Text>
          <Text>Үргэлжлэх хугацаа: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
      <div
        style={{
          zIndex: "10",
          position: "absolute",
          right: "10px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          top: "40%",
          flexDirection: "column",
        }}
        className=""
      >
        {/* <Product /> */}
        {Data.map((item, idx) => {
          return (
            <>
              <h1
                onClick={(e) => handleBusRoute(idx)}
                style={{ cursor: "pointer", zIndex: "100" }}
              >
                {item.name}
              </h1>
            </>
          );
        })}
      </div>
    </Flex>
  );
}

const Data = [
  //  {
  //     applicationId:6,
  //     usersIds:[
  //        37,
  //        39,
  //        40,
  //        41,
  //        44,
  //        47,
  //        48,
  //        49,
  //        52,
  //        54,
  //        55,
  //        56,
  //        57,
  //        58,
  //        59,
  //        60,
  //        62,
  //        63,
  //        65,
  //        66,
  //        67,
  //        68,
  //        75,
  //        76,
  //        77,
  //        78,
  //        479,
  //        480,
  //        481,
  //        491,
  //        492,
  //        494,
  //        495,
  //        502,
  //        503,
  //        531,
  //        582,
  //        612,
  //        619,
  //        811,
  //        814,
  //        815,
  //        816,
  //        829,
  //        870,
  //        915,
  //        916,
  //        929,
  //        930,
  //        931,
  //        1086
  //     ],
  //     name:"Бүх Автобус",
  //     description:"Бүх Автобус",
  //     id:47
  //  },
  {
    applicationId: 6,
    usersIds: [49, 54, 63, 76, 492, 495, 502, 814, 815, 503, 582],
    name: "Тосгон пирамид зээл",
    description: "",
    id: 63,
  },
  {
    applicationId: 6,
    usersIds: [58, 59, 60, 62, 78, 479, 480, 481, 491, 494],
    name: "Шандын Эх",
    description: "",
    id: 64,
  },
  {
    applicationId: 6,
    usersIds: [37, 40, 48, 56, 57, 811, 816, 870, 915],
    name: "Их Залуу",
    description: "",
    id: 65,
  },
  {
    applicationId: 6,
    usersIds: [41, 55, 66, 67, 829],
    name: "Говил",
    description: "",
    id: 66,
  },
  //  {
  //     applicationId:6,
  //     usersIds:[
  //        77,
  //        612,
  //        619,
  //        930,
  //        931
  //     ],
  //     name:"Ч:6 ТОСГОН-ПИРАМИД-ЗЭЭЛ",
  //     description:"",
  //     id:2793
  //  },
  //  {
  //     applicationId:6,
  //     usersIds:[
  //        75,
  //        1135
  //     ],
  //     name:"Ч:7 ВОКЗАЛ",
  //     description:"Ч:7 ВОКЗАЛ",
  //     id:4287
  //  }
];

const dummyData = [
  //   {
  //     id:16,
  //     name:"Зээл",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":104.02337,
  //        "maxX":104.02885,
  //        "minY":49.03511,
  //        "maxY":49.03869,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":104.02611,
  //           "lat":49.0369,
  //           "alt":0
  //        },
  //        "radius":199.295903486935
  //     },
  //     "tags":[
  //        47,
  //        2793
  //     ],
  //     "allowedInGeocoding":true
  //  },
  //  {
  //     id:14,
  //     name:"Тосгон",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":104.08631,
  //        "maxX":104.09181,
  //        "minY":49.04244,
  //        "maxY":49.04604,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":104.08906,
  //           "lat":49.04424,
  //           "alt":0
  //        },
  //        "radius":200
  //     },
  //     "tags":[
  //        47,
  //        2793
  //     ],
  //     "allowedInGeocoding":true
  //  },
  {
    id: 15,
    name: "Тосгон пирамид зээл ",
    color: "#ff0000",
    description: "",
    boundingBox: {
      minX: 104.02649,
      maxX: 104.09338,
      minY: 49.02485,
      maxY: 49.04486,
      minZ: 0,
      maxZ: 0,
    },
    type: "GpsGate.Online.Geofence.RouteGeofence",
    shape: {
      vertices: [
        {
          lng: 104.08492,
          lat: 49.03378,
          alt: 0,
        },
        {
          lng: 104.08494,
          lat: 49.03386,
          alt: 0,
        },
        {
          lng: 104.08499,
          lat: 49.03384,
          alt: 0,
        },
        {
          lng: 104.08498,
          lat: 49.03377,
          alt: 0,
        },
        {
          lng: 104.09235,
          lat: 49.03676,
          alt: 0,
        },
        {
          lng: 104.08984,
          lat: 49.03949,
          alt: 0,
        },
        {
          lng: 104.08917,
          lat: 49.04015,
          alt: 0,
        },
        {
          lng: 104.08853,
          lat: 49.04071,
          alt: 0,
        },
        {
          lng: 104.08861,
          lat: 49.04129,
          alt: 0,
        },
        {
          lng: 104.08915,
          lat: 49.04138,
          alt: 0,
        },
        {
          lng: 104.08982,
          lat: 49.04175,
          alt: 0,
        },
        {
          lng: 104.09039,
          lat: 49.04205,
          alt: 0,
        },
        {
          lng: 104.09042,
          lat: 49.0421,
          alt: 0,
        },
        {
          lng: 104.09044,
          lat: 49.04218,
          alt: 0,
        },
        {
          lng: 104.09031,
          lat: 49.04228,
          alt: 0,
        },
        {
          lng: 104.08962,
          lat: 49.0432,
          alt: 0,
        },
        {
          lng: 104.08956,
          lat: 49.04363,
          alt: 0,
        },
        {
          lng: 104.0894,
          lat: 49.04403,
          alt: 0,
        },
        {
          lng: 104.08913,
          lat: 49.04418,
          alt: 0,
        },
        {
          lng: 104.08885,
          lat: 49.04403,
          alt: 0,
        },
        {
          lng: 104.08838,
          lat: 49.04376,
          alt: 0,
        },
        {
          lng: 104.08771,
          lat: 49.0434,
          alt: 0,
        },
        {
          lng: 104.08677,
          lat: 49.04288,
          alt: 0,
        },
        {
          lng: 104.08608,
          lat: 49.04258,
          alt: 0,
        },
        {
          lng: 104.08548,
          lat: 49.04228,
          alt: 0,
        },
        {
          lng: 104.08501,
          lat: 49.04206,
          alt: 0,
        },
        {
          lng: 104.08409,
          lat: 49.04169,
          alt: 0,
        },
        {
          lng: 104.08366,
          lat: 49.0415,
          alt: 0,
        },
        {
          lng: 104.08293,
          lat: 49.04112,
          alt: 0,
        },
        {
          lng: 104.08357,
          lat: 49.04029,
          alt: 0,
        },
        {
          lng: 104.0849,
          lat: 49.03867,
          alt: 0,
        },
        {
          lng: 104.08492,
          lat: 49.03867,
          alt: 0,
        },
        {
          lng: 104.08501,
          lat: 49.03379,
          alt: 0,
        },
        {
          lng: 104.08283,
          lat: 49.03299,
          alt: 0,
        },
        {
          lng: 104.06317,
          lat: 49.03271,
          alt: 0,
        },
        {
          lng: 104.04511,
          lat: 49.02749,
          alt: 0,
        },
        {
          lng: 104.04295,
          lat: 49.03045,
          alt: 0,
        },
        {
          lng: 104.04023,
          lat: 49.03128,
          alt: 0,
        },
        {
          lng: 104.03741,
          lat: 49.03045,
          alt: 0,
        },
        {
          lng: 104.03599,
          lat: 49.02955,
          alt: 0,
        },
        {
          lng: 104.03587,
          lat: 49.02905,
          alt: 0,
        },
        {
          lng: 104.0383,
          lat: 49.02552,
          alt: 0,
        },
        {
          lng: 104.04515,
          lat: 49.02744,
          alt: 0,
        },
        {
          lng: 104.04293,
          lat: 49.03044,
          alt: 0,
        },
        {
          lng: 104.04025,
          lat: 49.03126,
          alt: 0,
        },
        {
          lng: 104.03737,
          lat: 49.03043,
          alt: 0,
        },
        {
          lng: 104.03596,
          lat: 49.02954,
          alt: 0,
        },
        {
          lng: 104.03485,
          lat: 49.03014,
          alt: 0,
        },
        {
          lng: 104.03377,
          lat: 49.03125,
          alt: 0,
        },
        {
          lng: 104.03307,
          lat: 49.03188,
          alt: 0,
        },
        {
          lng: 104.03255,
          lat: 49.03195,
          alt: 0,
        },
        {
          lng: 104.02992,
          lat: 49.03132,
          alt: 0,
        },
        {
          lng: 104.02976,
          lat: 49.0314,
          alt: 0,
        },
        {
          lng: 104.02952,
          lat: 49.03187,
          alt: 0,
        },
        {
          lng: 104.02871,
          lat: 49.0342,
          alt: 0,
        },
        {
          lng: 104.02752,
          lat: 49.03586,
          alt: 0,
        },
      ],
      radius: 75,
    },
    tags: [47, 2793],
    allowedInGeocoding: true,
  },
  //  {
  //     id:1,
  //     name:"Их залуу эцсийн буудал",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":103.98283,
  //        "maxX":103.98833,
  //        "minY":49.02489,
  //        "maxY":49.02849,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":103.98558,
  //           "lat":49.02669,
  //           "alt":0
  //        },
  //        "radius":200.118474077639
  //     },
  //     "tags":[
  //        47,
  //        62
  //     ],
  //     "allowedInGeocoding":true
  //  },
  //  {
  //     id:2,
  //     name:"Есөн эрдэнэ эцсийн буудал",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":104.05972,
  //        "maxX":104.06522,
  //        "minY":49.02641,
  //        "maxY":49.03001,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":104.06247,
  //           "lat":49.02821,
  //           "alt":0
  //        },
  //        "radius":200.112394948441
  //     },
  //     "tags":[
  //        47
  //     ],
  //     "allowedInGeocoding":true
  //  },
  //  {
  //     id:3,
  //     name:"Шандын эх эцсийн буудал",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":103.9894,
  //        "maxX":103.99488,
  //        "minY":49.02591,
  //        "maxY":49.02951,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":103.99214,
  //           "lat":49.02771,
  //           "alt":0
  //        },
  //        "radius":200
  //     },
  //     "tags":[
  //        47,
  //        63
  //     ],
  //     "allowedInGeocoding":true
  //  },
  //  {
  //     id:4,
  //     name:"Баян тал эх эцсийн буудал",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":104.02848,
  //        "maxX":104.03534,
  //        "minY":48.9829,
  //        "maxY":48.9874,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":104.03191,
  //           "lat":48.98515,
  //           "alt":0
  //        },
  //        "radius":250.355774124007
  //     },
  //     "tags":[
  //        47,
  //        64
  //     ],
  //     "allowedInGeocoding":true
  //  },
  //  {
  //     id:5,
  //     name:"Говилийн эцсийн буудал",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":104.10427,
  //        "maxX":104.10977,
  //        "minY":49.06318,
  //        "maxY":49.06678,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":104.10702,
  //           "lat":49.06498,
  //           "alt":0
  //        },
  //        "radius":200
  //     },
  //     "tags":[
  //        47,
  //        66
  //     ],
  //     "allowedInGeocoding":true
  //  },
  //  {
  //     id:6,
  //     name:"Хүлэг зах",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":104.04453,
  //        "maxX":104.04865,
  //        "minY":49.02445,
  //        "maxY":49.02715,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":104.04659,
  //           "lat":49.0258,
  //           "alt":0
  //        },
  //        "radius":150
  //     },
  //     "tags":[
  //        47,
  //        66
  //     ],
  //     "allowedInGeocoding":true
  //  },
  {
    id: 7,
    name: "Баян Тал Эх",
    color: "#00ffff",
    description: "",
    boundingBox: {
      minX: 104.03072,
      maxX: 104.06372,
      minY: 48.98354,
      maxY: 49.03772,
      minZ: 0,
      maxZ: 0,
    },
    type: "GpsGate.Online.Geofence.RouteGeofence",
    shape: {
      vertices: [
        {
          lng: 104.05529,
          lat: 49.03054,
          alt: 0,
        },
        {
          lng: 104.05528,
          lat: 49.03057,
          alt: 0,
        },
        {
          lng: 104.05528,
          lat: 49.0306,
          alt: 0,
        },
        {
          lng: 104.05561,
          lat: 49.03037,
          alt: 0,
        },
        {
          lng: 104.05584,
          lat: 49.03016,
          alt: 0,
        },
        {
          lng: 104.05608,
          lat: 49.02991,
          alt: 0,
        },
        {
          lng: 104.05624,
          lat: 49.02971,
          alt: 0,
        },
        {
          lng: 104.05706,
          lat: 49.02878,
          alt: 0,
        },
        {
          lng: 104.05801,
          lat: 49.02776,
          alt: 0,
        },
        {
          lng: 104.05908,
          lat: 49.0266,
          alt: 0,
        },
        {
          lng: 104.05914,
          lat: 49.02656,
          alt: 0,
        },
        {
          lng: 104.05922,
          lat: 49.02655,
          alt: 0,
        },
        {
          lng: 104.05931,
          lat: 49.02655,
          alt: 0,
        },
        {
          lng: 104.05936,
          lat: 49.02656,
          alt: 0,
        },
        {
          lng: 104.0595,
          lat: 49.02662,
          alt: 0,
        },
        {
          lng: 104.06009,
          lat: 49.02683,
          alt: 0,
        },
        {
          lng: 104.06029,
          lat: 49.02692,
          alt: 0,
        },
        {
          lng: 104.06061,
          lat: 49.02701,
          alt: 0,
        },
        {
          lng: 104.06128,
          lat: 49.0273,
          alt: 0,
        },
        {
          lng: 104.06258,
          lat: 49.02775,
          alt: 0,
        },
        {
          lng: 104.06269,
          lat: 49.02779,
          alt: 0,
        },
        {
          lng: 104.06256,
          lat: 49.02799,
          alt: 0,
        },
        {
          lng: 104.0592,
          lat: 49.03394,
          alt: 0,
        },
        {
          lng: 104.05906,
          lat: 49.03418,
          alt: 0,
        },
        {
          lng: 104.0587,
          lat: 49.03472,
          alt: 0,
        },
        {
          lng: 104.05839,
          lat: 49.03504,
          alt: 0,
        },
        {
          lng: 104.05775,
          lat: 49.03571,
          alt: 0,
        },
        {
          lng: 104.05685,
          lat: 49.03669,
          alt: 0,
        },
        {
          lng: 104.05665,
          lat: 49.03691,
          alt: 0,
        },
        {
          lng: 104.05656,
          lat: 49.03697,
          alt: 0,
        },
        {
          lng: 104.05633,
          lat: 49.03705,
          alt: 0,
        },
        {
          lng: 104.05608,
          lat: 49.03702,
          alt: 0,
        },
        {
          lng: 104.05582,
          lat: 49.03695,
          alt: 0,
        },
        {
          lng: 104.05525,
          lat: 49.03668,
          alt: 0,
        },
        {
          lng: 104.05354,
          lat: 49.03599,
          alt: 0,
        },
        {
          lng: 104.05329,
          lat: 49.03591,
          alt: 0,
        },
        {
          lng: 104.05314,
          lat: 49.03585,
          alt: 0,
        },
        {
          lng: 104.05234,
          lat: 49.03585,
          alt: 0,
        },
        {
          lng: 104.05215,
          lat: 49.03586,
          alt: 0,
        },
        {
          lng: 104.05194,
          lat: 49.03587,
          alt: 0,
        },
        {
          lng: 104.05176,
          lat: 49.03589,
          alt: 0,
        },
        {
          lng: 104.05163,
          lat: 49.03588,
          alt: 0,
        },
        {
          lng: 104.05153,
          lat: 49.03587,
          alt: 0,
        },
        {
          lng: 104.05146,
          lat: 49.03582,
          alt: 0,
        },
        {
          lng: 104.05144,
          lat: 49.03566,
          alt: 0,
        },
        {
          lng: 104.05145,
          lat: 49.03554,
          alt: 0,
        },
        {
          lng: 104.05168,
          lat: 49.03482,
          alt: 0,
        },
        {
          lng: 104.05216,
          lat: 49.03424,
          alt: 0,
        },
        {
          lng: 104.0524,
          lat: 49.03396,
          alt: 0,
        },
        {
          lng: 104.05264,
          lat: 49.03364,
          alt: 0,
        },
        {
          lng: 104.05318,
          lat: 49.03305,
          alt: 0,
        },
        {
          lng: 104.05336,
          lat: 49.03288,
          alt: 0,
        },
        {
          lng: 104.05368,
          lat: 49.03254,
          alt: 0,
        },
        {
          lng: 104.05391,
          lat: 49.03228,
          alt: 0,
        },
        {
          lng: 104.0542,
          lat: 49.03194,
          alt: 0,
        },
        {
          lng: 104.05459,
          lat: 49.03155,
          alt: 0,
        },
        {
          lng: 104.05478,
          lat: 49.03134,
          alt: 0,
        },
        {
          lng: 104.0551,
          lat: 49.03095,
          alt: 0,
        },
        {
          lng: 104.05531,
          lat: 49.03057,
          alt: 0,
        },
        {
          lng: 104.05453,
          lat: 49.03021,
          alt: 0,
        },
        {
          lng: 104.0536,
          lat: 49.02989,
          alt: 0,
        },
        {
          lng: 104.05159,
          lat: 49.02934,
          alt: 0,
        },
        {
          lng: 104.04943,
          lat: 49.02871,
          alt: 0,
        },
        {
          lng: 104.04881,
          lat: 49.02853,
          alt: 0,
        },
        {
          lng: 104.0481,
          lat: 49.02835,
          alt: 0,
        },
        {
          lng: 104.04672,
          lat: 49.02797,
          alt: 0,
        },
        {
          lng: 104.04601,
          lat: 49.02778,
          alt: 0,
        },
        {
          lng: 104.04518,
          lat: 49.02731,
          alt: 0,
        },
        {
          lng: 104.04538,
          lat: 49.02698,
          alt: 0,
        },
        {
          lng: 104.04556,
          lat: 49.02669,
          alt: 0,
        },
        {
          lng: 104.04631,
          lat: 49.02563,
          alt: 0,
        },
        {
          lng: 104.04648,
          lat: 49.02536,
          alt: 0,
        },
        {
          lng: 104.04693,
          lat: 49.02466,
          alt: 0,
        },
        {
          lng: 104.04707,
          lat: 49.02446,
          alt: 0,
        },
        {
          lng: 104.04719,
          lat: 49.02427,
          alt: 0,
        },
        {
          lng: 104.04744,
          lat: 49.02407,
          alt: 0,
        },
        {
          lng: 104.04758,
          lat: 49.0239,
          alt: 0,
        },
        {
          lng: 104.04758,
          lat: 49.02383,
          alt: 0,
        },
        {
          lng: 104.04756,
          lat: 49.02375,
          alt: 0,
        },
        {
          lng: 104.0474,
          lat: 49.02365,
          alt: 0,
        },
        {
          lng: 104.04703,
          lat: 49.02363,
          alt: 0,
        },
        {
          lng: 104.04686,
          lat: 49.02363,
          alt: 0,
        },
        {
          lng: 104.04674,
          lat: 49.0236,
          alt: 0,
        },
        {
          lng: 104.04659,
          lat: 49.02347,
          alt: 0,
        },
        {
          lng: 104.04535,
          lat: 49.022,
          alt: 0,
        },
        {
          lng: 104.04477,
          lat: 49.02129,
          alt: 0,
        },
        {
          lng: 104.04411,
          lat: 49.02049,
          alt: 0,
        },
        {
          lng: 104.04397,
          lat: 49.02031,
          alt: 0,
        },
        {
          lng: 104.04338,
          lat: 49.0197,
          alt: 0,
        },
        {
          lng: 104.04324,
          lat: 49.01952,
          alt: 0,
        },
        {
          lng: 104.04272,
          lat: 49.01893,
          alt: 0,
        },
        {
          lng: 104.04232,
          lat: 49.01845,
          alt: 0,
        },
        {
          lng: 104.04215,
          lat: 49.01826,
          alt: 0,
        },
        {
          lng: 104.04145,
          lat: 49.01742,
          alt: 0,
        },
        {
          lng: 104.04113,
          lat: 49.01701,
          alt: 0,
        },
        {
          lng: 104.04042,
          lat: 49.01624,
          alt: 0,
        },
        {
          lng: 104.04026,
          lat: 49.016,
          alt: 0,
        },
        {
          lng: 104.04018,
          lat: 49.01579,
          alt: 0,
        },
        {
          lng: 104.04014,
          lat: 49.01501,
          alt: 0,
        },
        {
          lng: 104.04017,
          lat: 49.01481,
          alt: 0,
        },
        {
          lng: 104.04018,
          lat: 49.01424,
          alt: 0,
        },
        {
          lng: 104.0402,
          lat: 49.01419,
          alt: 0,
        },
        {
          lng: 104.0402,
          lat: 49.01373,
          alt: 0,
        },
        {
          lng: 104.04017,
          lat: 49.01241,
          alt: 0,
        },
        {
          lng: 104.04018,
          lat: 49.01209,
          alt: 0,
        },
        {
          lng: 104.04017,
          lat: 49.01175,
          alt: 0,
        },
        {
          lng: 104.04017,
          lat: 49.01067,
          alt: 0,
        },
        {
          lng: 104.04012,
          lat: 49.0103,
          alt: 0,
        },
        {
          lng: 104.04003,
          lat: 49.00985,
          alt: 0,
        },
        {
          lng: 104.03985,
          lat: 49.00936,
          alt: 0,
        },
        {
          lng: 104.03979,
          lat: 49.00928,
          alt: 0,
        },
        {
          lng: 104.03961,
          lat: 49.00848,
          alt: 0,
        },
        {
          lng: 104.03945,
          lat: 49.00801,
          alt: 0,
        },
        {
          lng: 104.03897,
          lat: 49.00773,
          alt: 0,
        },
        {
          lng: 104.03879,
          lat: 49.00761,
          alt: 0,
        },
        {
          lng: 104.03828,
          lat: 49.00716,
          alt: 0,
        },
        {
          lng: 104.03793,
          lat: 49.00693,
          alt: 0,
        },
        {
          lng: 104.03777,
          lat: 49.00681,
          alt: 0,
        },
        {
          lng: 104.03726,
          lat: 49.00629,
          alt: 0,
        },
        {
          lng: 104.03715,
          lat: 49.00595,
          alt: 0,
        },
        {
          lng: 104.03702,
          lat: 49.00532,
          alt: 0,
        },
        {
          lng: 104.03685,
          lat: 49.00491,
          alt: 0,
        },
        {
          lng: 104.03651,
          lat: 49.00412,
          alt: 0,
        },
        {
          lng: 104.03639,
          lat: 49.00396,
          alt: 0,
        },
        {
          lng: 104.03607,
          lat: 49.00313,
          alt: 0,
        },
        {
          lng: 104.0356,
          lat: 49.00201,
          alt: 0,
        },
        {
          lng: 104.03526,
          lat: 49.00125,
          alt: 0,
        },
        {
          lng: 104.03485,
          lat: 49.0004,
          alt: 0,
        },
        {
          lng: 104.03445,
          lat: 48.99958,
          alt: 0,
        },
        {
          lng: 104.03409,
          lat: 48.99885,
          alt: 0,
        },
        {
          lng: 104.0329,
          lat: 48.9976,
          alt: 0,
        },
        {
          lng: 104.03266,
          lat: 48.99741,
          alt: 0,
        },
        {
          lng: 104.03248,
          lat: 48.99721,
          alt: 0,
        },
        {
          lng: 104.03245,
          lat: 48.99689,
          alt: 0,
        },
        {
          lng: 104.03252,
          lat: 48.99667,
          alt: 0,
        },
        {
          lng: 104.03263,
          lat: 48.99599,
          alt: 0,
        },
        {
          lng: 104.03271,
          lat: 48.99527,
          alt: 0,
        },
        {
          lng: 104.03283,
          lat: 48.99456,
          alt: 0,
        },
        {
          lng: 104.03293,
          lat: 48.99395,
          alt: 0,
        },
        {
          lng: 104.03292,
          lat: 48.99374,
          alt: 0,
        },
        {
          lng: 104.0327,
          lat: 48.99334,
          alt: 0,
        },
        {
          lng: 104.03254,
          lat: 48.99314,
          alt: 0,
        },
        {
          lng: 104.03247,
          lat: 48.99284,
          alt: 0,
        },
        {
          lng: 104.03254,
          lat: 48.99246,
          alt: 0,
        },
        {
          lng: 104.03247,
          lat: 48.99217,
          alt: 0,
        },
        {
          lng: 104.03241,
          lat: 48.99193,
          alt: 0,
        },
        {
          lng: 104.03233,
          lat: 48.99112,
          alt: 0,
        },
        {
          lng: 104.03244,
          lat: 48.99042,
          alt: 0,
        },
        {
          lng: 104.03248,
          lat: 48.9902,
          alt: 0,
        },
        {
          lng: 104.03239,
          lat: 48.98989,
          alt: 0,
        },
        {
          lng: 104.03208,
          lat: 48.98871,
          alt: 0,
        },
        {
          lng: 104.03179,
          lat: 48.98771,
          alt: 0,
        },
        {
          lng: 104.03175,
          lat: 48.98744,
          alt: 0,
        },
        {
          lng: 104.03195,
          lat: 48.98664,
          alt: 0,
        },
        {
          lng: 104.03185,
          lat: 48.98529,
          alt: 0,
        },
        {
          lng: 104.03186,
          lat: 48.98477,
          alt: 0,
        },
        {
          lng: 104.03238,
          lat: 48.98421,
          alt: 0,
        },
      ],
      radius: 75,
    },
    tags: [47, 64],
    allowedInGeocoding: true,
  },
  {
    id: 8,
    name: "Шандын Эх",
    color: "#ff00ff",
    description: "",
    boundingBox: {
      minX: 103.98973,
      maxX: 104.06376,
      minY: 49.01207,
      maxY: 49.03769,
      minZ: 0,
      maxZ: 0,
    },
    type: "GpsGate.Online.Geofence.RouteGeofence",
    shape: {
      vertices: [
        {
          lng: 104.05676,
          lat: 49.02906,
          alt: 0,
        },
        {
          lng: 104.05611,
          lat: 49.03038,
          alt: 0,
        },
        {
          lng: 104.05589,
          lat: 49.03015,
          alt: 0,
        },
        {
          lng: 104.0565,
          lat: 49.02934,
          alt: 0,
        },
        {
          lng: 104.05737,
          lat: 49.02846,
          alt: 0,
        },
        {
          lng: 104.05828,
          lat: 49.02746,
          alt: 0,
        },
        {
          lng: 104.0591,
          lat: 49.02645,
          alt: 0,
        },
        {
          lng: 104.06084,
          lat: 49.02711,
          alt: 0,
        },
        {
          lng: 104.06213,
          lat: 49.02759,
          alt: 0,
        },
        {
          lng: 104.06273,
          lat: 49.02776,
          alt: 0,
        },
        {
          lng: 104.06235,
          lat: 49.02836,
          alt: 0,
        },
        {
          lng: 104.06207,
          lat: 49.02886,
          alt: 0,
        },
        {
          lng: 104.06191,
          lat: 49.02917,
          alt: 0,
        },
        {
          lng: 104.06163,
          lat: 49.02964,
          alt: 0,
        },
        {
          lng: 104.06149,
          lat: 49.02985,
          alt: 0,
        },
        {
          lng: 104.0612,
          lat: 49.03036,
          alt: 0,
        },
        {
          lng: 104.06084,
          lat: 49.03087,
          alt: 0,
        },
        {
          lng: 104.06042,
          lat: 49.03181,
          alt: 0,
        },
        {
          lng: 104.06025,
          lat: 49.03202,
          alt: 0,
        },
        {
          lng: 104.06019,
          lat: 49.03204,
          alt: 0,
        },
        {
          lng: 104.06013,
          lat: 49.03201,
          alt: 0,
        },
        {
          lng: 104.05999,
          lat: 49.03196,
          alt: 0,
        },
        {
          lng: 104.05984,
          lat: 49.03193,
          alt: 0,
        },
        {
          lng: 104.05964,
          lat: 49.03186,
          alt: 0,
        },
        {
          lng: 104.05945,
          lat: 49.0318,
          alt: 0,
        },
        {
          lng: 104.05911,
          lat: 49.03169,
          alt: 0,
        },
        {
          lng: 104.0587,
          lat: 49.03159,
          alt: 0,
        },
        {
          lng: 104.05765,
          lat: 49.03124,
          alt: 0,
        },
        {
          lng: 104.05733,
          lat: 49.03114,
          alt: 0,
        },
        {
          lng: 104.05692,
          lat: 49.03099,
          alt: 0,
        },
        {
          lng: 104.05649,
          lat: 49.0309,
          alt: 0,
        },
        {
          lng: 104.05623,
          lat: 49.03078,
          alt: 0,
        },
        {
          lng: 104.056,
          lat: 49.03071,
          alt: 0,
        },
        {
          lng: 104.05583,
          lat: 49.03062,
          alt: 0,
        },
        {
          lng: 104.05567,
          lat: 49.03059,
          alt: 0,
        },
        {
          lng: 104.05557,
          lat: 49.03058,
          alt: 0,
        },
        {
          lng: 104.05552,
          lat: 49.03057,
          alt: 0,
        },
        {
          lng: 104.05542,
          lat: 49.03054,
          alt: 0,
        },
        {
          lng: 104.05515,
          lat: 49.03042,
          alt: 0,
        },
        {
          lng: 104.05496,
          lat: 49.03037,
          alt: 0,
        },
        {
          lng: 104.05478,
          lat: 49.03032,
          alt: 0,
        },
        {
          lng: 104.0515,
          lat: 49.02932,
          alt: 0,
        },
        {
          lng: 104.04614,
          lat: 49.02781,
          alt: 0,
        },
        {
          lng: 104.0451,
          lat: 49.02744,
          alt: 0,
        },
        {
          lng: 104.0451,
          lat: 49.02738,
          alt: 0,
        },
        {
          lng: 104.04545,
          lat: 49.02686,
          alt: 0,
        },
        {
          lng: 104.04626,
          lat: 49.02568,
          alt: 0,
        },
        {
          lng: 104.04671,
          lat: 49.02497,
          alt: 0,
        },
        {
          lng: 104.04696,
          lat: 49.02458,
          alt: 0,
        },
        {
          lng: 104.04756,
          lat: 49.02404,
          alt: 0,
        },
        {
          lng: 104.04751,
          lat: 49.02367,
          alt: 0,
        },
        {
          lng: 104.04721,
          lat: 49.02356,
          alt: 0,
        },
        {
          lng: 104.04666,
          lat: 49.02373,
          alt: 0,
        },
        {
          lng: 104.04652,
          lat: 49.02389,
          alt: 0,
        },
        {
          lng: 104.0466,
          lat: 49.02407,
          alt: 0,
        },
        {
          lng: 104.04712,
          lat: 49.02426,
          alt: 0,
        },
        {
          lng: 104.04727,
          lat: 49.02422,
          alt: 0,
        },
        {
          lng: 104.04757,
          lat: 49.02404,
          alt: 0,
        },
        {
          lng: 104.04764,
          lat: 49.02384,
          alt: 0,
        },
        {
          lng: 104.04747,
          lat: 49.02359,
          alt: 0,
        },
        {
          lng: 104.04731,
          lat: 49.02356,
          alt: 0,
        },
        {
          lng: 104.04688,
          lat: 49.02359,
          alt: 0,
        },
        {
          lng: 104.04665,
          lat: 49.02378,
          alt: 0,
        },
        {
          lng: 104.04655,
          lat: 49.02392,
          alt: 0,
        },
        {
          lng: 104.04638,
          lat: 49.02387,
          alt: 0,
        },
        {
          lng: 104.04518,
          lat: 49.02349,
          alt: 0,
        },
        {
          lng: 104.03873,
          lat: 49.02153,
          alt: 0,
        },
        {
          lng: 104.03673,
          lat: 49.02092,
          alt: 0,
        },
        {
          lng: 104.03485,
          lat: 49.02033,
          alt: 0,
        },
        {
          lng: 104.02954,
          lat: 49.01854,
          alt: 0,
        },
        {
          lng: 104.0255,
          lat: 49.01674,
          alt: 0,
        },
        {
          lng: 104.0224,
          lat: 49.01501,
          alt: 0,
        },
        {
          lng: 104.01903,
          lat: 49.01288,
          alt: 0,
        },
        {
          lng: 104.01879,
          lat: 49.01281,
          alt: 0,
        },
        {
          lng: 104.01867,
          lat: 49.01288,
          alt: 0,
        },
        {
          lng: 104.01851,
          lat: 49.01301,
          alt: 0,
        },
        {
          lng: 104.01725,
          lat: 49.01389,
          alt: 0,
        },
        {
          lng: 104.01683,
          lat: 49.0142,
          alt: 0,
        },
        {
          lng: 104.01616,
          lat: 49.01483,
          alt: 0,
        },
        {
          lng: 104.01605,
          lat: 49.01486,
          alt: 0,
        },
        {
          lng: 104.01414,
          lat: 49.01441,
          alt: 0,
        },
        {
          lng: 104.01121,
          lat: 49.01367,
          alt: 0,
        },
        {
          lng: 104.01044,
          lat: 49.01351,
          alt: 0,
        },
        {
          lng: 104.00682,
          lat: 49.01274,
          alt: 0,
        },
        {
          lng: 104.00652,
          lat: 49.01294,
          alt: 0,
        },
        {
          lng: 104.00613,
          lat: 49.01344,
          alt: 0,
        },
        {
          lng: 104.00598,
          lat: 49.01371,
          alt: 0,
        },
        {
          lng: 104.00561,
          lat: 49.01421,
          alt: 0,
        },
        {
          lng: 104.0053,
          lat: 49.01468,
          alt: 0,
        },
        {
          lng: 104.00415,
          lat: 49.01698,
          alt: 0,
        },
        {
          lng: 104.00335,
          lat: 49.01846,
          alt: 0,
        },
        {
          lng: 104.003,
          lat: 49.01898,
          alt: 0,
        },
        {
          lng: 104.00276,
          lat: 49.01938,
          alt: 0,
        },
        {
          lng: 104.00247,
          lat: 49.01978,
          alt: 0,
        },
        {
          lng: 104.00205,
          lat: 49.02058,
          alt: 0,
        },
        {
          lng: 104.00154,
          lat: 49.0219,
          alt: 0,
        },
        {
          lng: 104.00156,
          lat: 49.02264,
          alt: 0,
        },
        {
          lng: 104.00157,
          lat: 49.02285,
          alt: 0,
        },
        {
          lng: 104.00149,
          lat: 49.02305,
          alt: 0,
        },
        {
          lng: 104.0014,
          lat: 49.02322,
          alt: 0,
        },
        {
          lng: 103.99991,
          lat: 49.02326,
          alt: 0,
        },
        {
          lng: 103.99921,
          lat: 49.02425,
          alt: 0,
        },
        {
          lng: 103.99795,
          lat: 49.02636,
          alt: 0,
        },
        {
          lng: 103.99781,
          lat: 49.02736,
          alt: 0,
        },
        {
          lng: 103.99779,
          lat: 49.02768,
          alt: 0,
        },
        {
          lng: 103.99611,
          lat: 49.02771,
          alt: 0,
        },
        {
          lng: 103.99581,
          lat: 49.02769,
          alt: 0,
        },
        {
          lng: 103.99489,
          lat: 49.02769,
          alt: 0,
        },
        {
          lng: 103.99442,
          lat: 49.02772,
          alt: 0,
        },
        {
          lng: 103.99201,
          lat: 49.0277,
          alt: 0,
        },
        {
          lng: 103.99076,
          lat: 49.02769,
          alt: 0,
        },
      ],
      radius: 75,
    },
    tags: [47, 63],
    allowedInGeocoding: true,
  },
  {
    id: 10,
    name: "Их Залуу",
    color: "#ffff00",
    description: "",
    boundingBox: {
      minX: 103.98452,
      maxX: 104.06375,
      minY: 49.00076,
      maxY: 49.03772,
      minZ: 0,
      maxZ: 0,
    },
    type: "GpsGate.Online.Geofence.RouteGeofence",
    shape: {
      vertices: [
        {
          lng: 104.05547,
          lat: 49.03053,
          alt: 0,
        },
        {
          lng: 104.05752,
          lat: 49.02829,
          alt: 0,
        },
        {
          lng: 104.0593,
          lat: 49.0265,
          alt: 0,
        },
        {
          lng: 104.05992,
          lat: 49.02673,
          alt: 0,
        },
        {
          lng: 104.06051,
          lat: 49.02695,
          alt: 0,
        },
        {
          lng: 104.06272,
          lat: 49.02779,
          alt: 0,
        },
        {
          lng: 104.06245,
          lat: 49.02831,
          alt: 0,
        },
        {
          lng: 104.06198,
          lat: 49.02923,
          alt: 0,
        },
        {
          lng: 104.06166,
          lat: 49.02966,
          alt: 0,
        },
        {
          lng: 104.06111,
          lat: 49.03061,
          alt: 0,
        },
        {
          lng: 104.06082,
          lat: 49.03097,
          alt: 0,
        },
        {
          lng: 104.06072,
          lat: 49.03135,
          alt: 0,
        },
        {
          lng: 104.06065,
          lat: 49.03204,
          alt: 0,
        },
        {
          lng: 104.06056,
          lat: 49.03214,
          alt: 0,
        },
        {
          lng: 104.06028,
          lat: 49.03216,
          alt: 0,
        },
        {
          lng: 104.06006,
          lat: 49.03212,
          alt: 0,
        },
        {
          lng: 104.05993,
          lat: 49.03208,
          alt: 0,
        },
        {
          lng: 104.05981,
          lat: 49.03204,
          alt: 0,
        },
        {
          lng: 104.05969,
          lat: 49.03199,
          alt: 0,
        },
        {
          lng: 104.05959,
          lat: 49.03195,
          alt: 0,
        },
        {
          lng: 104.05935,
          lat: 49.03189,
          alt: 0,
        },
        {
          lng: 104.05909,
          lat: 49.03179,
          alt: 0,
        },
        {
          lng: 104.05895,
          lat: 49.03176,
          alt: 0,
        },
        {
          lng: 104.05881,
          lat: 49.03169,
          alt: 0,
        },
        {
          lng: 104.05866,
          lat: 49.03164,
          alt: 0,
        },
        {
          lng: 104.05812,
          lat: 49.03145,
          alt: 0,
        },
        {
          lng: 104.05787,
          lat: 49.03138,
          alt: 0,
        },
        {
          lng: 104.05748,
          lat: 49.03124,
          alt: 0,
        },
        {
          lng: 104.05723,
          lat: 49.03115,
          alt: 0,
        },
        {
          lng: 104.05703,
          lat: 49.0311,
          alt: 0,
        },
        {
          lng: 104.05688,
          lat: 49.03102,
          alt: 0,
        },
        {
          lng: 104.05663,
          lat: 49.03096,
          alt: 0,
        },
        {
          lng: 104.05619,
          lat: 49.03082,
          alt: 0,
        },
        {
          lng: 104.05587,
          lat: 49.03071,
          alt: 0,
        },
        {
          lng: 104.05581,
          lat: 49.03071,
          alt: 0,
        },
        {
          lng: 104.05573,
          lat: 49.03068,
          alt: 0,
        },
        {
          lng: 104.0557,
          lat: 49.03059,
          alt: 0,
        },
        {
          lng: 104.05559,
          lat: 49.03064,
          alt: 0,
        },
        {
          lng: 104.05553,
          lat: 49.03061,
          alt: 0,
        },
        {
          lng: 104.0554,
          lat: 49.03059,
          alt: 0,
        },
        {
          lng: 104.0551,
          lat: 49.03043,
          alt: 0,
        },
        {
          lng: 104.04504,
          lat: 49.0275,
          alt: 0,
        },
        {
          lng: 104.0452,
          lat: 49.02728,
          alt: 0,
        },
        {
          lng: 104.04566,
          lat: 49.02658,
          alt: 0,
        },
        {
          lng: 104.0461,
          lat: 49.0259,
          alt: 0,
        },
        {
          lng: 104.04628,
          lat: 49.02565,
          alt: 0,
        },
        {
          lng: 104.04646,
          lat: 49.02539,
          alt: 0,
        },
        {
          lng: 104.04673,
          lat: 49.02503,
          alt: 0,
        },
        {
          lng: 104.0475,
          lat: 49.02405,
          alt: 0,
        },
        {
          lng: 104.04734,
          lat: 49.02417,
          alt: 0,
        },
        {
          lng: 104.04717,
          lat: 49.02418,
          alt: 0,
        },
        {
          lng: 104.04681,
          lat: 49.02415,
          alt: 0,
        },
        {
          lng: 104.04663,
          lat: 49.02397,
          alt: 0,
        },
        {
          lng: 104.04679,
          lat: 49.0241,
          alt: 0,
        },
        {
          lng: 104.04704,
          lat: 49.02417,
          alt: 0,
        },
        {
          lng: 104.0473,
          lat: 49.02417,
          alt: 0,
        },
        {
          lng: 104.0475,
          lat: 49.02401,
          alt: 0,
        },
        {
          lng: 104.04754,
          lat: 49.02383,
          alt: 0,
        },
        {
          lng: 104.04737,
          lat: 49.02367,
          alt: 0,
        },
        {
          lng: 104.04676,
          lat: 49.02369,
          alt: 0,
        },
        {
          lng: 104.04664,
          lat: 49.02394,
          alt: 0,
        },
        {
          lng: 104.04094,
          lat: 49.02222,
          alt: 0,
        },
        {
          lng: 104.03819,
          lat: 49.02137,
          alt: 0,
        },
        {
          lng: 104.03658,
          lat: 49.02089,
          alt: 0,
        },
        {
          lng: 104.03506,
          lat: 49.02042,
          alt: 0,
        },
        {
          lng: 104.03394,
          lat: 49.02006,
          alt: 0,
        },
        {
          lng: 104.03083,
          lat: 49.01895,
          alt: 0,
        },
        {
          lng: 104.03003,
          lat: 49.01866,
          alt: 0,
        },
        {
          lng: 104.0274,
          lat: 49.01766,
          alt: 0,
        },
        {
          lng: 104.02662,
          lat: 49.01729,
          alt: 0,
        },
        {
          lng: 104.02148,
          lat: 49.01436,
          alt: 0,
        },
        {
          lng: 104.01862,
          lat: 49.01261,
          alt: 0,
        },
        {
          lng: 104.01595,
          lat: 49.01099,
          alt: 0,
        },
        {
          lng: 104.01416,
          lat: 49.00996,
          alt: 0,
        },
        {
          lng: 104.01332,
          lat: 49.00944,
          alt: 0,
        },
        {
          lng: 104.01293,
          lat: 49.00918,
          alt: 0,
        },
        {
          lng: 104.01188,
          lat: 49.00839,
          alt: 0,
        },
        {
          lng: 104.01142,
          lat: 49.00799,
          alt: 0,
        },
        {
          lng: 104.01126,
          lat: 49.00782,
          alt: 0,
        },
        {
          lng: 104.00817,
          lat: 49.00453,
          alt: 0,
        },
        {
          lng: 104.00736,
          lat: 49.0037,
          alt: 0,
        },
        {
          lng: 104.00691,
          lat: 49.0032,
          alt: 0,
        },
        {
          lng: 104.00639,
          lat: 49.00249,
          alt: 0,
        },
        {
          lng: 104.00623,
          lat: 49.00221,
          alt: 0,
        },
        {
          lng: 104.00588,
          lat: 49.00143,
          alt: 0,
        },
        {
          lng: 104.0057,
          lat: 49.00143,
          alt: 0,
        },
        {
          lng: 104.00543,
          lat: 49.00151,
          alt: 0,
        },
        {
          lng: 104.00504,
          lat: 49.0016,
          alt: 0,
        },
        {
          lng: 104.00471,
          lat: 49.00174,
          alt: 0,
        },
        {
          lng: 104.00457,
          lat: 49.00186,
          alt: 0,
        },
        {
          lng: 104.00409,
          lat: 49.00233,
          alt: 0,
        },
        {
          lng: 104.00368,
          lat: 49.00277,
          alt: 0,
        },
        {
          lng: 104.00247,
          lat: 49.004,
          alt: 0,
        },
        {
          lng: 104.00195,
          lat: 49.00458,
          alt: 0,
        },
        {
          lng: 104.00013,
          lat: 49.00642,
          alt: 0,
        },
        {
          lng: 103.99919,
          lat: 49.00736,
          alt: 0,
        },
        {
          lng: 103.99692,
          lat: 49.00938,
          alt: 0,
        },
        {
          lng: 103.99569,
          lat: 49.01045,
          alt: 0,
        },
        {
          lng: 103.99374,
          lat: 49.01248,
          alt: 0,
        },
        {
          lng: 103.99253,
          lat: 49.01377,
          alt: 0,
        },
        {
          lng: 103.99135,
          lat: 49.0153,
          alt: 0,
        },
        {
          lng: 103.99109,
          lat: 49.01575,
          alt: 0,
        },
        {
          lng: 103.99086,
          lat: 49.01625,
          alt: 0,
        },
        {
          lng: 103.99046,
          lat: 49.01718,
          alt: 0,
        },
        {
          lng: 103.98962,
          lat: 49.0192,
          alt: 0,
        },
        {
          lng: 103.9891,
          lat: 49.02035,
          alt: 0,
        },
        {
          lng: 103.98888,
          lat: 49.02063,
          alt: 0,
        },
        {
          lng: 103.98783,
          lat: 49.0223,
          alt: 0,
        },
        {
          lng: 103.98638,
          lat: 49.02449,
          alt: 0,
        },
        {
          lng: 103.9862,
          lat: 49.02492,
          alt: 0,
        },
        {
          lng: 103.98583,
          lat: 49.02602,
          alt: 0,
        },
        {
          lng: 103.98578,
          lat: 49.02624,
          alt: 0,
        },
        {
          lng: 103.98566,
          lat: 49.02655,
          alt: 0,
        },
        {
          lng: 103.98558,
          lat: 49.02672,
          alt: 0,
        },
        {
          lng: 103.98555,
          lat: 49.02763,
          alt: 0,
        },
      ],
      radius: 75,
    },
    tags: [47, 62],
    allowedInGeocoding: true,
  },
  {
    id: 11,
    name: "Сагсай Эх",
    color: "#ff0000",
    description: "",
    boundingBox: {
      minX: 103.99645,
      maxX: 104.06376,
      minY: 49.02066,
      maxY: 49.03772,
      minZ: 0,
      maxZ: 0,
    },
    type: "GpsGate.Online.Geofence.RouteGeofence",
    shape: {
      vertices: [
        {
          lng: 104.05531,
          lat: 49.03056,
          alt: 0,
        },
        {
          lng: 104.05535,
          lat: 49.03061,
          alt: 0,
        },
        {
          lng: 104.0581,
          lat: 49.02767,
          alt: 0,
        },
        {
          lng: 104.05931,
          lat: 49.02651,
          alt: 0,
        },
        {
          lng: 104.06273,
          lat: 49.02777,
          alt: 0,
        },
        {
          lng: 104.06267,
          lat: 49.02794,
          alt: 0,
        },
        {
          lng: 104.06234,
          lat: 49.02852,
          alt: 0,
        },
        {
          lng: 104.0617,
          lat: 49.02957,
          alt: 0,
        },
        {
          lng: 104.06109,
          lat: 49.03044,
          alt: 0,
        },
        {
          lng: 104.06064,
          lat: 49.03112,
          alt: 0,
        },
        {
          lng: 104.05982,
          lat: 49.03256,
          alt: 0,
        },
        {
          lng: 104.05897,
          lat: 49.0343,
          alt: 0,
        },
        {
          lng: 104.05664,
          lat: 49.03702,
          alt: 0,
        },
        {
          lng: 104.0562,
          lat: 49.03705,
          alt: 0,
        },
        {
          lng: 104.05389,
          lat: 49.03615,
          alt: 0,
        },
        {
          lng: 104.05288,
          lat: 49.03583,
          alt: 0,
        },
        {
          lng: 104.05223,
          lat: 49.03589,
          alt: 0,
        },
        {
          lng: 104.05148,
          lat: 49.03593,
          alt: 0,
        },
        {
          lng: 104.05145,
          lat: 49.03519,
          alt: 0,
        },
        {
          lng: 104.05183,
          lat: 49.03454,
          alt: 0,
        },
        {
          lng: 104.05266,
          lat: 49.03365,
          alt: 0,
        },
        {
          lng: 104.054,
          lat: 49.03219,
          alt: 0,
        },
        {
          lng: 104.05503,
          lat: 49.03103,
          alt: 0,
        },
        {
          lng: 104.05541,
          lat: 49.03057,
          alt: 0,
        },
        {
          lng: 104.05494,
          lat: 49.03038,
          alt: 0,
        },
        {
          lng: 104.05191,
          lat: 49.0295,
          alt: 0,
        },
        {
          lng: 104.04985,
          lat: 49.0289,
          alt: 0,
        },
        {
          lng: 104.04883,
          lat: 49.02862,
          alt: 0,
        },
        {
          lng: 104.04511,
          lat: 49.02752,
          alt: 0,
        },
        {
          lng: 104.04427,
          lat: 49.02727,
          alt: 0,
        },
        {
          lng: 104.0422,
          lat: 49.02662,
          alt: 0,
        },
        {
          lng: 104.03737,
          lat: 49.02529,
          alt: 0,
        },
        {
          lng: 104.03565,
          lat: 49.02471,
          alt: 0,
        },
        {
          lng: 104.03237,
          lat: 49.02379,
          alt: 0,
        },
        {
          lng: 104.03153,
          lat: 49.02353,
          alt: 0,
        },
        {
          lng: 104.03045,
          lat: 49.02377,
          alt: 0,
        },
        {
          lng: 104.03017,
          lat: 49.02384,
          alt: 0,
        },
        {
          lng: 104.02913,
          lat: 49.02435,
          alt: 0,
        },
        {
          lng: 104.02866,
          lat: 49.02487,
          alt: 0,
        },
        {
          lng: 104.02834,
          lat: 49.02524,
          alt: 0,
        },
        {
          lng: 104.02769,
          lat: 49.02588,
          alt: 0,
        },
        {
          lng: 104.02744,
          lat: 49.02598,
          alt: 0,
        },
        {
          lng: 104.02696,
          lat: 49.02595,
          alt: 0,
        },
        {
          lng: 104.02627,
          lat: 49.02581,
          alt: 0,
        },
        {
          lng: 104.0234,
          lat: 49.02511,
          alt: 0,
        },
        {
          lng: 104.01968,
          lat: 49.02417,
          alt: 0,
        },
        {
          lng: 104.01958,
          lat: 49.02424,
          alt: 0,
        },
        {
          lng: 104.0191,
          lat: 49.02511,
          alt: 0,
        },
        {
          lng: 104.01851,
          lat: 49.02626,
          alt: 0,
        },
        {
          lng: 104.01802,
          lat: 49.02695,
          alt: 0,
        },
        {
          lng: 104.01759,
          lat: 49.02765,
          alt: 0,
        },
        {
          lng: 104.01698,
          lat: 49.02857,
          alt: 0,
        },
        {
          lng: 104.01624,
          lat: 49.02948,
          alt: 0,
        },
        {
          lng: 104.01416,
          lat: 49.03188,
          alt: 0,
        },
        {
          lng: 104.01305,
          lat: 49.03322,
          alt: 0,
        },
        {
          lng: 104.01241,
          lat: 49.03411,
          alt: 0,
        },
        {
          lng: 104.0116,
          lat: 49.03515,
          alt: 0,
        },
        {
          lng: 104.01111,
          lat: 49.03565,
          alt: 0,
        },
        {
          lng: 104.01082,
          lat: 49.03598,
          alt: 0,
        },
        {
          lng: 104.01031,
          lat: 49.0365,
          alt: 0,
        },
        {
          lng: 104.01018,
          lat: 49.03665,
          alt: 0,
        },
        {
          lng: 104.00993,
          lat: 49.0369,
          alt: 0,
        },
        {
          lng: 104.00952,
          lat: 49.03687,
          alt: 0,
        },
        {
          lng: 104.00781,
          lat: 49.0367,
          alt: 0,
        },
        {
          lng: 104.005,
          lat: 49.03641,
          alt: 0,
        },
        {
          lng: 104.00338,
          lat: 49.03679,
          alt: 0,
        },
        {
          lng: 104.00245,
          lat: 49.03689,
          alt: 0,
        },
        {
          lng: 104.00214,
          lat: 49.03679,
          alt: 0,
        },
        {
          lng: 104.00191,
          lat: 49.03669,
          alt: 0,
        },
        {
          lng: 104.00159,
          lat: 49.03653,
          alt: 0,
        },
        {
          lng: 104.0011,
          lat: 49.0361,
          alt: 0,
        },
        {
          lng: 104.00024,
          lat: 49.03497,
          alt: 0,
        },
        {
          lng: 104.00009,
          lat: 49.03454,
          alt: 0,
        },
        {
          lng: 103.99947,
          lat: 49.03321,
          alt: 0,
        },
        {
          lng: 103.99909,
          lat: 49.03258,
          alt: 0,
        },
        {
          lng: 103.999,
          lat: 49.03241,
          alt: 0,
        },
        {
          lng: 103.99882,
          lat: 49.03213,
          alt: 0,
        },
        {
          lng: 103.99815,
          lat: 49.03117,
          alt: 0,
        },
        {
          lng: 103.99781,
          lat: 49.03035,
          alt: 0,
        },
        {
          lng: 103.99767,
          lat: 49.03003,
          alt: 0,
        },
        {
          lng: 103.99748,
          lat: 49.0292,
          alt: 0,
        },
        {
          lng: 103.99756,
          lat: 49.02843,
          alt: 0,
        },
        {
          lng: 103.99756,
          lat: 49.0283,
          alt: 0,
        },
        {
          lng: 103.99769,
          lat: 49.02822,
          alt: 0,
        },
        {
          lng: 103.99823,
          lat: 49.02829,
          alt: 0,
        },
        {
          lng: 103.99908,
          lat: 49.02837,
          alt: 0,
        },
        {
          lng: 104.00064,
          lat: 49.02848,
          alt: 0,
        },
        {
          lng: 104.00167,
          lat: 49.02858,
          alt: 0,
        },
        {
          lng: 104.00272,
          lat: 49.02865,
          alt: 0,
        },
        {
          lng: 104.0041,
          lat: 49.02875,
          alt: 0,
        },
        {
          lng: 104.00481,
          lat: 49.0288,
          alt: 0,
        },
        {
          lng: 104.00558,
          lat: 49.02887,
          alt: 0,
        },
        {
          lng: 104.00825,
          lat: 49.0291,
          alt: 0,
        },
        {
          lng: 104.0092,
          lat: 49.02928,
          alt: 0,
        },
        {
          lng: 104.01003,
          lat: 49.02937,
          alt: 0,
        },
        {
          lng: 104.01005,
          lat: 49.02918,
          alt: 0,
        },
        {
          lng: 104.01013,
          lat: 49.02843,
          alt: 0,
        },
        {
          lng: 104.01017,
          lat: 49.02751,
          alt: 0,
        },
        {
          lng: 104.01006,
          lat: 49.02601,
          alt: 0,
        },
        {
          lng: 104.01005,
          lat: 49.02551,
          alt: 0,
        },
        {
          lng: 104.01003,
          lat: 49.02529,
          alt: 0,
        },
        {
          lng: 104.0102,
          lat: 49.02466,
          alt: 0,
        },
        {
          lng: 104.01036,
          lat: 49.02428,
          alt: 0,
        },
        {
          lng: 104.01058,
          lat: 49.02386,
          alt: 0,
        },
        {
          lng: 104.01073,
          lat: 49.02349,
          alt: 0,
        },
        {
          lng: 104.01099,
          lat: 49.02302,
          alt: 0,
        },
        {
          lng: 104.01117,
          lat: 49.02262,
          alt: 0,
        },
        {
          lng: 104.01151,
          lat: 49.02188,
          alt: 0,
        },
        {
          lng: 104.01173,
          lat: 49.02147,
          alt: 0,
        },
        {
          lng: 104.01182,
          lat: 49.02136,
          alt: 0,
        },
        {
          lng: 104.01198,
          lat: 49.02133,
          alt: 0,
        },
        {
          lng: 104.01242,
          lat: 49.02149,
          alt: 0,
        },
        {
          lng: 104.01249,
          lat: 49.02155,
          alt: 0,
        },
        {
          lng: 104.01258,
          lat: 49.02176,
          alt: 0,
        },
        {
          lng: 104.01274,
          lat: 49.02212,
          alt: 0,
        },
        {
          lng: 104.01398,
          lat: 49.02271,
          alt: 0,
        },
        {
          lng: 104.01442,
          lat: 49.02287,
          alt: 0,
        },
        {
          lng: 104.0173,
          lat: 49.02359,
          alt: 0,
        },
        {
          lng: 104.0204,
          lat: 49.02434,
          alt: 0,
        },
      ],
      radius: 75,
    },
    tags: [47, 65],
    allowedInGeocoding: true,
  },
  {
    id: 12,
    name: "Говил",
    color: "#00ff00",
    description: "",
    boundingBox: {
      minX: 104.04397,
      maxX: 104.12306,
      minY: 49.02285,
      maxY: 49.07228,
      minZ: 0,
      maxZ: 0,
    },
    type: "GpsGate.Online.Geofence.RouteGeofence",
    shape: {
      vertices: [
        {
          lng: 104.0472,
          lat: 49.02427,
          alt: 0,
        },
        {
          lng: 104.04753,
          lat: 49.02404,
          alt: 0,
        },
        {
          lng: 104.04756,
          lat: 49.02371,
          alt: 0,
        },
        {
          lng: 104.04737,
          lat: 49.02357,
          alt: 0,
        },
        {
          lng: 104.04693,
          lat: 49.02352,
          alt: 0,
        },
        {
          lng: 104.04665,
          lat: 49.02366,
          alt: 0,
        },
        {
          lng: 104.04652,
          lat: 49.02398,
          alt: 0,
        },
        {
          lng: 104.04678,
          lat: 49.0242,
          alt: 0,
        },
        {
          lng: 104.04715,
          lat: 49.02434,
          alt: 0,
        },
        {
          lng: 104.046,
          lat: 49.0261,
          alt: 0,
        },
        {
          lng: 104.045,
          lat: 49.02745,
          alt: 0,
        },
        {
          lng: 104.04995,
          lat: 49.02888,
          alt: 0,
        },
        {
          lng: 104.05415,
          lat: 49.03011,
          alt: 0,
        },
        {
          lng: 104.06247,
          lat: 49.03264,
          alt: 0,
        },
        {
          lng: 104.06333,
          lat: 49.03279,
          alt: 0,
        },
        {
          lng: 104.06421,
          lat: 49.03286,
          alt: 0,
        },
        {
          lng: 104.0797,
          lat: 49.03299,
          alt: 0,
        },
        {
          lng: 104.08289,
          lat: 49.033,
          alt: 0,
        },
        {
          lng: 104.08372,
          lat: 49.0333,
          alt: 0,
        },
        {
          lng: 104.08553,
          lat: 49.03408,
          alt: 0,
        },
        {
          lng: 104.08713,
          lat: 49.03464,
          alt: 0,
        },
        {
          lng: 104.09312,
          lat: 49.03702,
          alt: 0,
        },
        {
          lng: 104.0948,
          lat: 49.03775,
          alt: 0,
        },
        {
          lng: 104.09769,
          lat: 49.03887,
          alt: 0,
        },
        {
          lng: 104.10136,
          lat: 49.04033,
          alt: 0,
        },
        {
          lng: 104.10464,
          lat: 49.04167,
          alt: 0,
        },
        {
          lng: 104.10521,
          lat: 49.04189,
          alt: 0,
        },
        {
          lng: 104.10764,
          lat: 49.04285,
          alt: 0,
        },
        {
          lng: 104.11054,
          lat: 49.04395,
          alt: 0,
        },
        {
          lng: 104.11114,
          lat: 49.04418,
          alt: 0,
        },
        {
          lng: 104.11118,
          lat: 49.04447,
          alt: 0,
        },
        {
          lng: 104.11165,
          lat: 49.045,
          alt: 0,
        },
        {
          lng: 104.11177,
          lat: 49.04515,
          alt: 0,
        },
        {
          lng: 104.11201,
          lat: 49.04543,
          alt: 0,
        },
        {
          lng: 104.11252,
          lat: 49.04576,
          alt: 0,
        },
        {
          lng: 104.11375,
          lat: 49.0466,
          alt: 0,
        },
        {
          lng: 104.11581,
          lat: 49.04802,
          alt: 0,
        },
        {
          lng: 104.11727,
          lat: 49.04911,
          alt: 0,
        },
        {
          lng: 104.11869,
          lat: 49.05027,
          alt: 0,
        },
        {
          lng: 104.12143,
          lat: 49.05245,
          alt: 0,
        },
        {
          lng: 104.12188,
          lat: 49.05323,
          alt: 0,
        },
        {
          lng: 104.12203,
          lat: 49.05387,
          alt: 0,
        },
        {
          lng: 104.12164,
          lat: 49.05482,
          alt: 0,
        },
        {
          lng: 104.12125,
          lat: 49.05539,
          alt: 0,
        },
        {
          lng: 104.12091,
          lat: 49.05584,
          alt: 0,
        },
        {
          lng: 104.12009,
          lat: 49.05709,
          alt: 0,
        },
        {
          lng: 104.11934,
          lat: 49.05826,
          alt: 0,
        },
        {
          lng: 104.11835,
          lat: 49.05975,
          alt: 0,
        },
        {
          lng: 104.11727,
          lat: 49.06138,
          alt: 0,
        },
        {
          lng: 104.11666,
          lat: 49.06228,
          alt: 0,
        },
        {
          lng: 104.11597,
          lat: 49.06327,
          alt: 0,
        },
        {
          lng: 104.11569,
          lat: 49.06369,
          alt: 0,
        },
        {
          lng: 104.11512,
          lat: 49.06452,
          alt: 0,
        },
        {
          lng: 104.11466,
          lat: 49.06547,
          alt: 0,
        },
        {
          lng: 104.1138,
          lat: 49.06618,
          alt: 0,
        },
        {
          lng: 104.11315,
          lat: 49.06658,
          alt: 0,
        },
        {
          lng: 104.11205,
          lat: 49.06714,
          alt: 0,
        },
        {
          lng: 104.11191,
          lat: 49.06731,
          alt: 0,
        },
        {
          lng: 104.11236,
          lat: 49.06777,
          alt: 0,
        },
        {
          lng: 104.11099,
          lat: 49.06854,
          alt: 0,
        },
        {
          lng: 104.10826,
          lat: 49.07002,
          alt: 0,
        },
        {
          lng: 104.10731,
          lat: 49.07063,
          alt: 0,
        },
        {
          lng: 104.10666,
          lat: 49.07069,
          alt: 0,
        },
        {
          lng: 104.10518,
          lat: 49.07082,
          alt: 0,
        },
        {
          lng: 104.10462,
          lat: 49.0712,
          alt: 0,
        },
        {
          lng: 104.1041,
          lat: 49.07156,
          alt: 0,
        },
        {
          lng: 104.10364,
          lat: 49.07161,
          alt: 0,
        },
        {
          lng: 104.10268,
          lat: 49.07154,
          alt: 0,
        },
        {
          lng: 104.10245,
          lat: 49.0715,
          alt: 0,
        },
        {
          lng: 104.10225,
          lat: 49.07143,
          alt: 0,
        },
        {
          lng: 104.1007,
          lat: 49.07017,
          alt: 0,
        },
        {
          lng: 104.09937,
          lat: 49.06899,
          alt: 0,
        },
        {
          lng: 104.09933,
          lat: 49.06888,
          alt: 0,
        },
        {
          lng: 104.09948,
          lat: 49.06857,
          alt: 0,
        },
        {
          lng: 104.09999,
          lat: 49.06829,
          alt: 0,
        },
        {
          lng: 104.10134,
          lat: 49.06758,
          alt: 0,
        },
        {
          lng: 104.10268,
          lat: 49.06688,
          alt: 0,
        },
        {
          lng: 104.10401,
          lat: 49.06621,
          alt: 0,
        },
        {
          lng: 104.10476,
          lat: 49.06586,
          alt: 0,
        },
        {
          lng: 104.10894,
          lat: 49.06438,
          alt: 0,
        },
        {
          lng: 104.11059,
          lat: 49.06412,
          alt: 0,
        },
        {
          lng: 104.11103,
          lat: 49.06396,
          alt: 0,
        },
        {
          lng: 104.1115,
          lat: 49.06373,
          alt: 0,
        },
        {
          lng: 104.11231,
          lat: 49.06332,
          alt: 0,
        },
        {
          lng: 104.11308,
          lat: 49.06296,
          alt: 0,
        },
        {
          lng: 104.11356,
          lat: 49.06274,
          alt: 0,
        },
        {
          lng: 104.11465,
          lat: 49.06359,
          alt: 0,
        },
        {
          lng: 104.11533,
          lat: 49.06412,
          alt: 0,
        },
      ],
      radius: 75,
    },
    tags: [47, 66],
    allowedInGeocoding: true,
  },
  //  {
  //     id:13,
  //     name:"Сагсай Эх эцсийн буудал",
  //     color:"#ff0000",
  //     description:"",
  //     boundingBox:{
  //        "minX":103.99856,
  //        "maxX":104.00404,
  //        "minY":49.03452,
  //        "maxY":49.0381,
  //        "minZ":0,
  //        "maxZ":0
  //     },
  //     type:"GpsGate.Online.Geofence.CircularGeofence",
  //     shape:{
  //        "center":{
  //           "lng":104.0013,
  //           "lat":49.03631,
  //           "alt":0
  //        },
  //        "radius":199.298244630698
  //     },
  //     "tags":[
  //        47,
  //        65
  //     ],
  //     "allowedInGeocoding":true
  //  }
];

console.log(Data);

export { Home };
