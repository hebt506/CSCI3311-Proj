window.addEventListener('load', () => {

    // console.log("Loading!")

    const params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    const age = params.get('age');

    let year = 2021 - age;

    document.getElementById('result-name').innerHTML = name;
    document.getElementById('result-age').innerHTML = age;
    document.getElementById('result-year').innerHTML = year;
})

