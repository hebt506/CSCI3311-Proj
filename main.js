// import {AffordabilityChart} from './Affordability.js';

d3.csv("howboutdis.csv", d3.autoType).then(data => {

    console.log("loading")

    const year = document.getElementById('result-year').innerHTML;
    var count = 0;

    var baseHome = 0;
    var baseGas = 0;
    var baseBeef = 0;
    var basePork = 0;

    const lastHome = 352800;
    const lastGas = 3.38;
    const lastBeef = 790.1;
    const lastPork = 481.6;

    data.forEach(e => {
        if (year === e.Date.substring(0, 4) && count < 1) {
            count += 1;
            baseHome = e.Home;
            baseGas = e.Gas;
            baseBeef = e.Beef;
            basePork = e.Pork;
        }
    });

    var homeInc = (lastHome - baseHome)/baseHome * 100
    var gasInc = (lastGas - baseGas)/baseGas * 100
    var beefInc = (lastBeef - baseBeef)/baseBeef * 100
    var porkInc = (lastPork - basePork)/basePork * 100

    d3.select("a1").text(homeInc.toFixed(2))
    d3.select("a2").text(gasInc.toFixed(2))
    d3.select("a3").text(beefInc.toFixed(2))
    d3.select("a4").text(porkInc.toFixed(2))

})
