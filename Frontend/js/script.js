console.log("test");


let weekday = {
    work: false,
    home: false
}

let mon = Object.assign({}, weekday)
let tue = Object.assign({}, weekday)
let wed = Object.assign({}, weekday)
let thu = Object.assign({}, weekday)
let fri = Object.assign({}, weekday)
let sat = Object.assign({}, weekday)
let sun = Object.assign({}, weekday)

week_schedule = [mon, tue, wed, thu, fri, sat, sun]

let vehicle = {
    car: true,
    train: false,
    tram: false,
    bus: false
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

const weeksperyear = 52

const HHV_natural_gas = 0.001026
const HHV_gasoline = 0.125
const HHV_diesel = 0.148

const EF2_natural_gas = 53.06
const EF2_gasoline = 70.22
const EF2_diesel = 74.92

const fuel_usage_bus = 38.7


var car_elem = document.getElementById("week-schedule");

document.getElementById("week-schedule-info").addEventListener("click", () => {
    document.getElementById("week-schedule-info-popup").classList.toggle("hidden");
});

document.getElementById("usage-info").addEventListener("click", () => {
    document.getElementById("usage-info-popup").classList.toggle("hidden");
});

var calculate = function() {

    let distance = 0 // km
    let fuel_usage = 0 // l per 100 km
    let HHV = 0 // kg CO2 per liter
    let EF2 = 0 // mmBtu per scf

    homeoffice_days = 0
    let costs = 0;
    let CO2 = 0

    week_schedule.forEach(day => {
        if(day.home) {
            homeoffice_days++;
        }
    })

    if(vehicle.car) {
        //todo
        let car_route_elem = document.getElementById("car-motorcycle-route");
        let car_usage_elem = document.getElementById("car-motorcycle-usage");

        let diesel_radio = document.getElementById("diesel");
        let petrol_radio = document.getElementById("petrol");
        let natural_gas_radio = document.getElementById("natural-gas");


        if(diesel_radio.checked) {
            HHV = HHV_diesel
            EF2 = EF2_diesel
        }
        if(petrol_radio.checked) {
            HHV = HHV_gasoline
            EF2 = EF2_gasoline
        }
        if(natural_gas_radio.checked) {
            HHV = HHV_natural_gas
            EF2 = EF2_natural_gas
        }
        let route = car_route_elem.value
        distance = route * homeoffice_days * 2
        fuel_usage = car_usage_elem.value

        console.log("distance " + distance)
        console.log("fuel_usage " + fuel_usage)
        console.log("HHV " + HHV)
        console.log("EF2 " + EF2)


        let fuel = (fuel_usage / 100) * distance * 0.264172
        CO2 = fuel * HHV * EF2
        console.log("fuel " + fuel)
        console.log("CO2 " + CO2)

        //todo: discuss costs per km for a car
        //71 Rappen per km
        costs += distance * 0.71
    }

    if(vehicle.train) {
        let train_route_elem = document.getElementById("train-route");
        let train_price_elem = document.getElementById("train-price");
        let route = train_route_elem.value
        let price = train_price_elem.value
        costs += price * homeoffice_days * 2
        CO2 += 0
    }

    if(vehicle.tram) {
        let tram_route_elem = document.getElementById("tram-route");
        let tram_price_elem = document.getElementById("tram-price");
        let route = tram_route_elem.value
        let price = tram_price_elem.value
        costs += price * homeoffice_days * 2
        CO2 += 0
    }

    if(vehicle.bus) {
        let bus_route_elem = document.getElementById("bus-route");
        let bus_price_elem = document.getElementById("bus-price");
        let route = bus_route_elem.value
        let price = bus_price_elem.value

        costs += price * homeoffice_days * 2

        distance = route * homeoffice_days * 2
        let fuel = (fuel_usage_bus / 100) * distance
        CO2 += fuel * HHV_diesel * EF2_diesel
    }

    let CO2_txt = document.getElementById("CO2-txt");
    let savings_txt = document.getElementById("savings-txt");

    CO2_txt.innerText = 'You save ' + CO2.toFixed(2) + 'kg of CO2 per week!'
    savings_txt.innerText = "You save CHF " + costs.toFixed(2) + " .- per week!"
}



buttons = document.getElementsByTagName("button")

var update_week_schedule = function() {

    for (let i in week_schedule) {
        work_elem = document.getElementById("work-btn" + i);
        home_elem = document.getElementById("home-btn" + i);
        if(week_schedule[i].work === true) {
            work_elem.style.background="CadetBlue"
        } else {
            work_elem.style.background="Gainsboro"
        }
        if(week_schedule[i].home === true) {
            home_elem.style.background="CadetBlue"
        } else {
            home_elem.style.background="Gainsboro"
        }
    }

    console.log(week_schedule)
}

var update_vehicle = function() {

    let car_form_elem = document.getElementById("car-motorcycle-form")
    let train_form_elem = document.getElementById("train-form")
    let tram_form_elem = document.getElementById("tram-form")
    let bus_form_elem = document.getElementById("bus-form")

    let car_elem = document.getElementById("car-selection")
    let train_elem = document.getElementById("train-selection")
    let tram_elem = document.getElementById("tram-selection")
    let bus_elem = document.getElementById("bus-selection")

    if(vehicle.car) {
        car_elem.style.background="CadetBlue"
        car_form_elem.style.display = "block"
    } else if(!vehicle.car) {
        car_elem.style.background="Gainsboro"
        car_form_elem.style.display = "none"
    }

    if(vehicle.train) {
        train_elem.style.background="CadetBlue"
        train_form_elem.style.display = "block"
    } else if(!vehicle.train) {
        train_elem.style.background="Gainsboro"
        train_form_elem.style.display = "none"
    }

    if(vehicle.tram) {
        tram_form_elem.style.display = "block"
        tram_elem.style.background="CadetBlue"
    } else if(!vehicle.tram) {
        tram_form_elem.style.display = "none"
        tram_elem.style.background="Gainsboro"
    }

    if(vehicle.bus) {
        bus_form_elem.style.display = "block"
        bus_elem.style.background="CadetBlue"
    } else if(!vehicle.bus) {
        bus_form_elem.style.display = "none"
        bus_elem.style.background="Gainsboro"
    }

    console.log(vehicle)
}


Array.from(buttons).forEach(button =>
    button.addEventListener("click", btn_selection));

function btn_selection(event) { // Listener can access its triggering event
    const button = event.currentTarget; // event's `target` property is useful
    console.log("event: " + button.id);
    if (button.id === "work-btn0") {
        week_schedule[0].work = !week_schedule[0].work
        week_schedule[0].home = false
    } if (button.id === "home-btn0") {
        week_schedule[0].work = false
        week_schedule[0].home = !week_schedule[0].home
    }
    if (button.id === "work-btn1") {
        week_schedule[1].work = !week_schedule[1].work
        week_schedule[1].home = false
    } if (button.id === "home-btn1") {
        week_schedule[1].work = false
        week_schedule[1].home = !week_schedule[1].home
    }
    if (button.id === "work-btn2") {
        week_schedule[2].work = !week_schedule[2].work
        week_schedule[2].home = false
    } if (button.id === "home-btn2") {
        week_schedule[2].work = false
        week_schedule[2].home = !week_schedule[2].home
    }
    if (button.id === "work-btn3") {
        week_schedule[3].work = !week_schedule[3].work
        week_schedule[3].home = false
    } if (button.id === "home-btn3") {
        week_schedule[3].work = false
        week_schedule[3].home = !week_schedule[3].home
    }
    if (button.id === "work-btn4") {
        week_schedule[4].work = !week_schedule[4].work
        week_schedule[4].home = false
    } if (button.id === "home-btn4") {
        week_schedule[4].work = false
        week_schedule[4].home = !week_schedule[4].home
    }
    if (button.id === "work-btn5") {
        week_schedule[5].work = !week_schedule[5].work
        week_schedule[5].home = false
    } if (button.id === "home-btn5") {
        week_schedule[5].work = false
        week_schedule[5].home = !week_schedule[5].home
    }
    if (button.id === "work-btn6") {
        week_schedule[6].work = !week_schedule[6].work
        week_schedule[6].home = false
    } if (button.id === "home-btn6") {
        week_schedule[6].work = false
        week_schedule[6].home = !week_schedule[6].home
    }

    if (button.id === "car-selection") {
        vehicle.car = !vehicle.car
    }
    if (button.id === "train-selection") {
        vehicle.train = !vehicle.train
    }
    if (button.id === "tram-selection") {
        vehicle.tram = !vehicle.tram
    }
    if (button.id === "bus-selection") {
        vehicle.bus = !vehicle.bus
    }

    if(button.id === "calc-btn") {
        calculate()
    }

    update_vehicle()
    update_week_schedule()
}

var setup = function () {
    update_vehicle()
    update_week_schedule()
    calculate()
}