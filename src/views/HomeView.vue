<script setup>
import { ref } from 'vue'
const currentYear = ref(new Date().getFullYear());

import { onMounted } from 'vue'; // Import necessary Vue features
import Chart from 'chart.js/auto'; // Import Chart.js



onMounted(() => {
    // Get the canvas element by its ID
    const ctx = document.getElementById('lineChart').getContext('2d');

    // Define labels for the x-axis
    const labels = [-10, -5, 0, , 5, 10, 15, 20, 25];

    // Define the data for the line chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: ' weather',
                data: [7, 15, 8, 23, -7, 20, 25, 18, 30],
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





// const currentDateTime = ref('');
// onMounted(() => {
//   setInterval(() => {
//     const now = new Date();
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
//     currentDateTime.value = now.toLocaleDateString('en-US', options);
//   }, 1000);
// });

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
            style="background-image: url('/clouds.jpg');background-size: cover; background-position: center; ">

            <div class="row border rounded ">
                <!-- first column -->
                <div class="col-3 border-end rounded p-2 mb-2 ">

                    <div class="row  mb-2">
                        <div class="col">
                            <div class="container ">
                                <!-- Single-Line Search Bar -->
                                 <div class="search-bar">
                                    <i class="fa-solid fa-user"></i>

                                    <input
                                    class=" my-search form-control border-0 border-bottom border-white text-white rounded-0 "
                                    type="search" placeholder="Search here..." aria-label="Search" />
                                <!-- <i class="fa-solid fa-magnifying-glass "></i> -->
                                <i class="fa-brands fa-searchengin"></i>
                                 </div>
                            </div>
                        </div>
                    </div>
                    <!-- Nested Row 2 -->
                    <div class="row  p-2 mb-2">
                        <div class="col">


                            <div class="row mt-2 my-temp ">
                                <div class="col-3 mr-3 ">20</div>
                                <div class="col-3 ml-3">-3</div>
                            </div>

                        </div>
                    </div>
                    <!-- Nested Row 3 -->
                    <div class="row mb-2 ">
                        <div class="col ">
                            <p class="ml-5">0.08%</p>

                            <div class="row mt-2">
                                <div class="col-5  ">
                                    <p class=" ms-4 mb-2 ">Safe</p>
                                    <ul>

                                        <li class="m-0">o.oo%-0.9%</li>
                                        <li>o.9%-11%</li>
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
                        <div class="col mb-0 mt-4">
                            <h4> Oklohoma City</h4>
                            <p>Lorem ipsum . Voluptatem, aspernatur obcaecati! Voluptas deleniti sunt quo quaerat ut?
                                Blanditiis, rem ullam magnam architecto non esse et saepe? Obcaecati ullam distinctio
                                sapiente.</p>
                        </div>
                    </div>





                </div>
                <!-- second column -->
                <div class="col-9 mt-2">
                    <h6 class="text-bold ">National <br>Weather</h6>
                    <div class="row  text-white p-2 mb-2">
                        <div class="col">
                            <p class="mt-5"> Weather Forecast </p>
                            <h1 class="display-3 fw-semibold fade-text  ">Storm <br>with Heavy Rain</h1>

                        </div>
                    </div>
                    <!-- Nested Row 2 -->
                    <div class="row  text-white  mb-2">
                        <div class="col">
                            <p class="year text-light">{{ currentYear }} </p>
                        </div>
                    </div>
                    <!-- Nested Row 3 -->
                    <div class="row text-white  mb-2">
                        <div class="col">
                            <p class="mb-0"> Variable clouds with snow showers. High 11F, winds</p>
                            <p class="d-flex align-items-start "> <span class="fs-1 lh-1 fst-italic me-2">17°</span> E
                                at 10 to 20 mph. Chance of snow 50%.<br> Snow accumulation less than one inch.</p>
                        </div>
                    </div>

                    <!-- Nested Row 4 -->
                    <div class="row ">
                        <div class="col">
                            <button class=" see-details rounded-pill bg-secondary  border-0 text-white ">SEE
                                DETAILS</button>

                            <div class="row mt-2">
                                <div class="col mb-0">
                                    <p>high 23°C</p>
                                    <p>Low 18°C</p>
                                </div>
                                <div class="col ">
                                    <p>high 23°C</p>
                                    <p>Low 18°C</p>
                                </div>
                                <div class="col">
                                    <p>high 23°C</p>
                                    <p>Low 18°C</p>
                                </div>
                                <div class="col">
                                    <p>high 23°C</p>
                                    <p>Low 18°C</p>
                                </div>
                                <div class="col">
                                    <p>high 23°C</p>
                                    <p>Low 18°C</p>
                                </div>
                                <div class="col">
                                    <p>high 23°C</p>
                                    <p>Low 18°C</p>
                                </div>
                                <div class="col">
                                    <p>high 23°C</p>
                                    <p>Low 18°C</p>
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
                                    <h2>20°</h2>
                                    <p class="city">Washington D.C</p>
                                </div>
                                <div class="col">
                                    <h2>20°</h2>
                                    <p class="city">Oklohama city</p>
                                </div>
                                <div class="col">
                                    <h2>20°</h2>
                                    <p class="city">Philadelphia</p>
                                </div>
                                <div class="col">
                                    <h2>20°</h2>
                                    <p class="city">San Franscisco</p>
                                </div>
                                <div class="col ">
                                    <h2>20°</h2>
                                    <p class="city">New York City</p>
                                </div>
                                <div class="col ">
                                    <h2>20°</h2>
                                    <p class="city">South Dakota</p>
                                </div>
                                <div class="col ">
                                    <h2>20°</h2>
                                    <p class="city">North Dakota</p>
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
                <h4>17</h4>
            </div>
            <div class="col-auto ml-auto">
                <h4>location</h4>
            </div>
        </div>
    </div>


</template>
<style scoped>
.search-bar{
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


</style>