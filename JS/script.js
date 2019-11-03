window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/95cfd098435ea0a24191a5063ec376d6/${lat},${long}`
                
                fetch(api)
                .then( response => {
                    return response.json();
                })
                .then( data => {
                    console.log(data);
                    //set api
                    const { temperature, summary, icon } = data.currently;
                    let Celsius = ((temperature - 32) * 5 / 9).toFixed(1);
                    temperatureDegree.innerHTML = Number(Celsius);
                    temperatureDescription.innerHTML = summary;
                    locationTimezone.innerHTML = data.timezone;
                    // CF formula
                    Fehren = (Celsius * 9 / 5) + 32;

                    //set icon
                    setIcons(icon, document.querySelector("#icon"));
                    //switch c f
                    temperatureSection.addEventListener ("click", () =>{
                        if (temperatureSpan.innerHTML === "C") {
                          temperatureSpan.innerHTML= "F";
                          temperatureDegree.innerHTML = Fehren;
                        } else {
                            temperatureSpan.innerHTML= "C";
                            temperatureDegree.innerHTML = Number(Celsius);
                        }
                    })
                })
            });

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});