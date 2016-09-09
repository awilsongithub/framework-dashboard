

/* ====================================
    GLOBAL VARIABLES
==================================== */
var reactData;
var angularData;
var allData = []; // define new array. array needed if we will use ng-repeat to enable filtering and sorting
var FREQ = 7560000; // update frequency: just over 2 hours as only 6 calls/hour without Oauth.
var repeat = true; // turn updates on or off




/* ====================================
    ON DOC READY
    make initial calls to get data
    call function to make delayed calls and repeate every 2.1 hours
==================================== */
$(document).ready(function() {
    getReactData();
	getAngularData();





});



/* ====================================
    UPDATE FUNCTION TO REPEAT CALLS
    self referencing to prevent buildups
    calls ajax call functions
    then calls itself on setTimeout
==================================== */
function makeDelayedCallsAndRepeat(){
    if (repeat) {
        setTimeout(
            function(){
                getReactData();
                getAngularData();
                makeCallsAndRepeat();
            },
            FREQ
        );
    }
}




/* ====================================
    GET REACT DATA OBJECT &
    PUSH IT ONTO MAIN DATA ARRAY
==================================== */
function getReactData(){
    $.ajax({
        url: 'https://api.github.com/repos/facebook/react',
        cache: false,
        dataType: 'JSON',
        success: function(data){
            reactData = data;
            console.log('here is reactData:');
            console.log(reactData);

            combineData(reactData);
        }
    });
}



/* ====================================
    GET REACT DATA OBJECT &
    PUSH IT ONTO MAIN DATA ARRAY
==================================== */
function getAngularData(){
    $.ajax({
        url: 'https://api.github.com/repos/angular/angular.js',
        cache: false,
        dataType: 'JSON',
        success: function(data){
            angularData = data;
            console.log('here is angularData:');
            console.log(angularData);

            combineData(angularData);
        }
    });
}

/* ====================================
    COMBINE DATA FROM AJAX FUNCTIONS
    they call this helper function once they have their data
    this saves it onto main data array
    conditionals used: if react save at index 1, etc.
==================================== */
function combineData(data){
    if (data.name == 'angular.js'){
        allData[0] = data;
    } else if ( data.name == 'react'){
        allData[1] = data;
    }


    // allData.push(reactData);
    console.log('here is allData:');
    console.log(allData);

    renderDataToPage(allData);
}



/* ====================================
    RENDER DATA TO PAGE
    after building the allData array with ajax call functions
    let's put the data into the DOM
==================================== */

function renderDataToPage(allData){
    console.log('here is allData within renderDataToPage');
    console.log(allData);
    console.log(allData[0].stargazers_count);

    $('#angular-stargazers').empty();
    $('#angular-stargazers').append(allData[0].stargazers_count);



}




// init function containing
// initial calls to ajax functions
// call to repeat function

// update frequency variable definition




// show frequency maybe function
// show last update function
