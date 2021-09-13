console.log("test");


let weekday = {
    work: false,
    home: false
}

let mon = weekday;
let tue = weekday;
let wed = weekday;
let thu = weekday;
let fri = weekday;
let sat = weekday;
let sun = weekday;

week_schedule = [mon, tue, wed, thu, fri, sat, sun]

let vehicle_to_travel = {
    car: false,
    bus: false,
    tram: false,
    train: false
}

let car = {
    distance: 40,
    fuel_usage: 10,
    diesel: false,
    gasoline: true,
    natural_gasoline: false
}

let bus = {
    distance: 40,
    fuel_usage: 10
}

let tram = {
    distance: 40,
    ticket_price: 20
}

let train = {
    distance: 40,
    ticket_price: 20
}

let CO2 = 0
let distance = 0 // km
let fuel_usage = 0 // l per 100 km
let emission = 0 // kg CO2 per liter
let heating = 0 // mmBtu per scf

const weeksperyear = 52

const bbtu_to_m3 = 28.263682 // m3 of natural gas at defined temperature and pressure.

const heating_diesel = 0.139 * bbtu_to_m3
const heating_gasoline = 0.135 * bbtu_to_m3
const heating_natural_gas = 0.001026 * bbtu_to_m3

const emission_diesel = 46.3692
const emission_gasoline = 37.7772
const emission_natural_gas = 0.2477

const fuel_usage_bus = 38.7


let calculate = function() {
    CO2 = distance * fuel_usage * emission * heating * 1000;

    //display result

    //every week

    //every year
}

let example_calculation = function() {
    distance = 100
    fuel_usage = 6
    emission = emission_diesel
    heating = heating_diesel

    CO2 = distance * fuel_usage * emission * heating * 1000 //in kg

    console.log("distance: " + distance)
    console.log("fuel_usage: " + fuel_usage)
    console.log("emission: " + emission)
    console.log("heating: " + heating)
    console.log("test calc with a diesel car : " + CO2)
}

example_calculation()