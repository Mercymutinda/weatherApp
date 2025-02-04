<script setup>
import { ref, watch, onMounted } from 'vue';
import Chart from 'chart.js/auto'; // Import Chart.js


const currentYear = ref(new Date().getFullYear());
const currentDateTime = ref('');
const userLocation = ref('');
const searchQuery = ref('');
const city_name = ref('');

watch(searchQuery, (newValue) =>{ 
    console.log('Search query changed to:', newValue);
    city_name.value = newValue;
})


// const api_key="8398099bebb70f367d90d2ef7994b1";
const api_key = "c73622a39f2d4383a72ce87dbb5cc01e";

const weatherData = ref([]);
const isLoading = ref(false);
let error = ref(null);
// const lat = ref();
// const long = ref();


const skycondition = ref(null)

//get weather function
const getWeather = async () => {
    console.log('Getting weather...');
    isLoading.value = true;
    try {

        const location = city_name.value || userLocation.value || 'Mombasa'; //if no location detected, it'll forward to Nairobi
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`);
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }


        const data = await response.json();
        console.log(data);
        weatherData.value = data;
        console.table(data);
        console.log(weatherData.value);
        console.log("mabenda", typeof(weatherData.value.weather?.[0].main));
        skycondition.value = weatherData.value.weather?.[0].main;


    } catch (err) {
        console.error('Error fetching weather:', err);
        error.value = err.message;
    } finally {
        isLoading.value = false;
    }
};

//location function

const getLocation = async() => {
    console.log('Getting location...');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // lat.value = latitude;
                // long.value = longitude;
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
                // Use OpenWeatherMap Reverse Geocoding API to get location name
                const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

                try {
                    const response = await fetch(reverseGeocodingUrl);
                    console.log(response);
                    if (!response.ok) {
                        throw new Error('Failed to fetch location data');
                    }
                    const data = await response.json();

                    // Extract location name (city, country)
                    if (data.length > 0) {
                        const locationName = `${data[0].name}`;
                        userLocation.value = locationName;
                    } else {
                        userLocation.value = "Location not found";
                    }
                } catch (err) {
                    console.error('Error fetching location name:', err);
                    userLocation.value = "Unable to fetch location";
                }
            },
            (err) => {
                console.error('Error getting location:', err);
                userLocation.value = "Location access denied";
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        userLocation.value = "Geolocation not supported";
    }
};



//function to update current date and time
const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    currentDateTime.value = now.toLocaleDateString('en-US', options);
};




onMounted(async () => {
   await getLocation(); //wait for location to be fetched
   await getWeather(); //wait for weather to be fetched
    updateDateTime();
    setInterval(updateDateTime, 1000);
    



    // Get the canvas element by its ID
    const ctx = document.getElementById('lineChart').getContext('2d');

    // Define labels for the x-axis
    const labels = [-10, -5, 0, 5, 10, 15, 20, 25];

    // Define the data for the line chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: ' safety',
                data: [2, 7, 8, 16, 22, 29, 30, 38, 38],
                fill: false, // Disable area fill
                borderColor: 'white', // Line color
                tension: 0.6, // Line smoothness
            },
        ],
    };

    // Create a new line chart
    new Chart(ctx, {
        type: 'line', // Specify chart type
        data: data, // Chart data
        options: {
            responsive: true, // Make it responsive
            plugins: {
                legend: {
                    display: true, // Show legend
                },
            },
        },
    });
});



const backgroundimg = ref('');
watch(skycondition, (newCondition) => {
    console.log("Sky condition changed to:", newCondition);
    
    const backgrounds = {
        "Clear": "/sunny-cloud.jpg",
        "Clouds": "/clouds.jpg",
        "Rain": "/soft-rain.webp",
        "Snow": "/snow.jpeg",
        "Fog": "/fog.webp",
        "Storm": "/windy.jpg"
    };

    backgroundimg.value = backgrounds[newCondition] || "/sunny-cloud.jpg";
});
console.log("mabenda", weatherData.weather?.[0]?.main);


const descriptiontext = ref('');
watch(skycondition, (newCondition) => {
    console.log("Sky condition changed to:", newCondition);
    
    const descriptions = {
        "Clear": `Clear skies and winds of ${weatherData.value?.wind?.speed} m/s. The humidity is ${weatherData.value?.main?.humidity}%.`,
    "Clouds": `Cloudy skies with a wind speed of ${weatherData.value?.wind?.speed} m/s. Humidity is around ${weatherData.value?.main?.humidity}%.`,
    "Rain": `Expect rain showers with wind speeds of ${weatherData.value?.wind?.speed} m/s. Humidity is ${weatherData.value?.main?.humidity}%.`,
    "Snow": `Snowy conditions with wind speeds of ${weatherData.value?.wind?.speed} m/s. Humidity at ${weatherData.value?.main?.humidity}%.`,
    "Fog": `Foggy atmosphere with winds at ${weatherData.value?.wind?.speed} m/s. Humidity: ${weatherData.value?.main?.humidity}%`,
    "Storm": `Stormy weather with high winds at ${weatherData.value?.wind?.speed} m/s. Humidity at ${weatherData.value?.main?.humidity}%.`
    };

    descriptiontext.value = descriptions[newCondition] || "Clear skies";
});

const detailsButton = ref ('')
function details(){
    console.log('Details button clicked');
    alert( `${ descriptiontext.value }`);
}

</script>
<template>
    <div class="container text-light m-0 ">
        <div class="row">
            <div class="col">
                <h4>Weather dashboard</h4>
            </div>
            <div class="col-auto ml-auto">
                <h5 class="year text-light ">{{ currentYear }}</h5>
            </div>
        </div>
        <!-- content -->

        <div class="my-image container mt-3" 
       

        :style="{
      backgroundImage: 'url(' + backgroundimg + ')',
    //   height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
        >



            <div class="row border rounded filter ">
                <!-- first column -->
                <div class="col-3 border-end rounded p-2 mb-2 ">

                    <div class="row  mb-2">
                        <div class="col">
                            <div class="container ">
                                <!-- Single-Line Search Bar -->
                                <div class="search-bar">
                                    <i class="fa-solid fa-user"></i>

                                    <input
                                         v-model="searchQuery"
                                         @keyup.enter="getWeather"
                                        class=" my-search form-control border-0 border-bottom border-white text-white rounded-0 "
                                        type="search" 
                                        placeholder="Search here..." 
                                        aria-label="Search" 
                                    />
                                    <!-- <i class="fa-solid fa-magnifying-glass "></i> -->
                                    <i class="fa-brands fa-searchengin"
                                      @click="getWeather"  

                                     ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Nested Row 2 -->
                    <div class="row  p-2 mb-2">
                        <div class="col ">


                            <div class="row mt-2 my-temp ">
                                <div class="col-3 ms-3 fs-2 ">
                                    {{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;C
                                </div>
                                <div class="col-3 ms-5 fs-1">+/-3</div>
                            </div>

                        </div>
                    </div>
                    <!-- Nested Row 3 -->
                    <div class="row mb-2 ">
                        <div class="col ">
                            <p class="ms-5">0.08%</p>

                            <div class="row mt-2">
                                <div class="col-5  ">
                                    <p class=" ms-4 mb-2 ">Safe</p>
                                    <ul>

                                        <li class="m-0">0.00%-0.9%</li>
                                        <li>0.9%-11%</li>
                                    </ul>
                                </div>
                                <div class="col-5 mr-3">

                                    <p class=" ms-4 mb-2">Dangerous </p>
                                    <ul>
                                        <li class="m-0">12%-38%</li>
                                        <li>39%-90%</li>
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Nested Row 4 -->
                    <div class="row  p-2 mb-2">
                        <div class="col">
                            <canvas id="lineChart" width="200" height="150"> </canvas>



                        </div>
                    </div>

                    <!-- Nested Row 5 -->
                    <div class="row  ">
                        <div class="col mb-0 mt-5">
                            <h4 class="text-decoration-underline fs-3 ">  {{  weatherData.name }}</h4>
                            <p class=" fs-5">{{ descriptiontext }}</p>
                        </div>
                    </div>





                </div>
                <!-- second column -->
                <div class="col-9 mt-2">
                    <h6 class="text-bold ">National <br>Weather</h6>
                    <div class="row  text-white p-2 mb-2">
                        <div class="col">
                            <p class="mt-5"> Weather Forecast </p>
                            <h1 class="display-3 fw-semibold fade-text  ">{{ weatherData.weather?.[0]?.main }}  <br/> {{ weatherData.weather?.[0]?.description }}</h1>

                        </div>
                    </div>
                    <!-- Nested Row 2 -->
                    <div class="row  text-white  mb-2">
                        <div class="col">
                            <p class="year text-light"> {{ currentDateTime }}</p>

                        </div>
                    </div>
                    <!-- Nested Row 3 -->
                    <div class="row text-white  mb-2">

                        <div class="col">
                            <p class="mb-0"> {{ weatherData.weather?.[0]?.description }} . Wind direction: {{ weatherData.wind?.deg }}&deg;, winds of </p>
                            <p class="d-flex align-items-start "> <span class="fs-1 lh-1 fst-italic me-2">{{ weatherData.wind?.speed }}</span> m/s
                                <br> </p>
                        </div>
                    </div>

                    <!-- Nested Row 4 -->
                    <div class="row ">
                        <div class="col">
                            <button class=" see-details rounded-pill bg-secondary  border-0 text-white  " @click="details ">SEE
                                DETAILS</button>

                            <div class="row mt-2">
                                <div class="col mb-0">
                                    <p>high {{ weatherData.main?.temp_max.toFixed(1) || "loading..." }} °C</p>
                                    <p>low {{ weatherData.main?.temp_min.toFixed(1) || "loading..." }} °C</p>
                                </div>
                                <div class="col ">
                                    <p>high {{ weatherData.main?.temp_max.toFixed(1) || "loading..." }} °C</p>
                                    <p>low {{ weatherData.main?.temp_min.toFixed(1) || "loading..." }} °C</p>
                                </div>
                                <div class="col">
                                    <p>high {{ weatherData.main?.temp_max.toFixed(1) || "loading..." }} °C</p>
                                    <p>low {{ weatherData.main?.temp_min.toFixed(1) || "loading..." }} °C</p>
                                </div>
                                <div class="col">
                                    <p>high {{ weatherData.main?.temp_max.toFixed(1) || "loading..." }} °C</p>
                                    <p>low {{ weatherData.main?.temp_min.toFixed(1) || "loading..." }} °C</p>
                                </div>
                                <div class="col">
                                    <p>high {{ weatherData.main?.temp_max.toFixed(1) || "loading..." }} °C</p>
                                    <p>low {{ weatherData.main?.temp_min.toFixed(1) || "loading..." }} °C</p>
                                </div>
                                <div class="col">
                                    <p>high {{ weatherData.main?.temp_max.toFixed(1) || "loading..." }} °C</p>
                                    <p>low {{ weatherData.main?.temp_min.toFixed(1) || "loading..." }} °C</p>
                                </div>
                                <div class="col">
                                    <p>high {{ weatherData.main?.temp_max.toFixed(1) || "loading..." }} °C</p>
                                    <p>low {{ weatherData.main?.temp_min.toFixed(1) || "loading..." }} °C</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="wavy-line mb-4"> </div>

                    <!-- Nested Row 5 -->
                    <div class="row ">
                        <div class="col">

                            <div class="row mt-2">
                                <div class="col">

                                    <h2>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;</h2>
                                    <p class="city">{{ weatherData.name }}</p>
                                </div>
                                <div class="col">

                                    <h2>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;</h2>
                                    <p class="city">{{ weatherData.name }}</p>
                                </div>
                                <div class="col">
                                    <h2>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;</h2>

                                    <p class="city">{{ weatherData.name }}</p>
                                </div>
                                <div class="col">
                                    <h2>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;</h2>
                                    <p class="city">{{ weatherData.name }}</p>
                                </div>
                                <div class="col ">
                                    <h2>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;</h2>
                                    <p class="city">{{ weatherData.name }}</p>
                                </div>
                                <div class="col ">
                                    <h2>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;</h2>
                                    <p class="city">{{ weatherData.name }}</p>
                                </div>
                                <div class="col ">
                                    <h2>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg;</h2>
                                    <p class="city">{{ weatherData.name }}</p>
                                </div>

                            </div>



                        </div>
                    </div>







                </div>
            </div>
        </div>


        <!-- footer row -->
        <div class="row mt-3">
            <div class="col">

                <h4>{{ weatherData.main?.temp.toFixed(1) || "loading..." }}&deg; </h4>
            </div>
            <div class="col-auto ml-auto">
                <h4>{{ weatherData.name }} weather </h4>
            </div>
        </div>
    </div>


</template>
<style scoped>
.search-bar {
    display: flex;
    align-items: center;
    padding: 5px;
}

.my-image {
    background-color: #56575B;
}

/* Optional: Customize focus styles */
input:focus {
    outline: none;
    /* Remove default outline */
    box-shadow: none;
    /* Remove Bootstrap's shadow on focus */

}

input::placeholder {
    color: white;
}

.my-search {
    background-color: transparent;
}

.my-temp {
    font-size: 50px;

}

.large-text {
    font-size: 2.5em;
}

.city {
    text-decoration-line: underline;
    text-decoration-style: double;
    text-decoration-color: goldenrod;
    text-decoration-thickness: 2px;

}

.see-details {
    font-size: 11px;
    padding-right: 18px;
    padding-left: 18px;
    padding-top: 8px;
    padding-bottom: 8px;

}

.wavy-line {
    --s: 65px;
    /* size of the wave */
    --b: 3px;
    /* thickness of the line */
    --m: 0.9;
    /* curvature of the wave [0 2] */

    background: linear-gradient(to right, white, gold);
    --R: calc(var(--s)*sqrt(var(--m)*var(--m) + 1) + var(--b)/2);
    height: calc(1*var(--R));
    width: 100%;
    --_g: #0000 calc(99% - var(--b)), #000 calc(101% - var(--b)) 99%, #0000 101%;
    mask:
        radial-gradient(var(--R) at left 50% bottom calc(-1*var(--m)*var(--s)), var(--_g)) calc(50% - 2*var(--s)) calc(50% - var(--s)/2 - var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x,
        radial-gradient(var(--R) at left 50% top calc(-1*var(--m)*var(--s)), var(--_g)) 50% calc(50% + var(--s)/2 + var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x;
}

.fade-text {
    background: linear-gradient(to right, white, rgba(0, 0, 0, 0));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}

.filter{
    backdrop-filter: blur(1px);
    /* background-color: rgba(0, 0, 0, 0.5); */
}


</style>