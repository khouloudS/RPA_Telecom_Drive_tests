const express = require("express");

const app = express();

const port = 4000;

const unirest = require("unirest");

app.get("/", (req, res) => {

    var apiCall = unirest("GET",

        "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"

    );

    apiCall.headers({

       "x-rapidapi-host": "ip-geo-location.p.rapidapi.com",
"x-rapidapi-key": "7a37b51785msh117405471cd8cabp1df0efjsn93704bacdc77"

    });

    apiCall.end(function(result) {

        if (res.error) throw new Error(result.error);

        console.log(result.body);

        res.send(result.body);

    });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
