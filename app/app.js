import * as MODEL from "../model/model.js";

function initListeners() {
    $("#getWeather").on("click", () => {
        const location = $("#location").val();
        if (location) {
            MODEL.getWeather(location);
        } else {
            alert("Please enter a valid city, state, or zip code!");
        }
    });
}

$(document).ready(() => {
    initListeners();
});
