

/* ====================================
    GLOBAL VARIABLES
==================================== */

// DATA VARIABLES
var reactData;
var angularData;
var allData = []; // define new array. array needed if we will use ng-repeat to enable filtering and sorting

// UPDATE VARIABLES
var FREQ = 7560000; // update frequency: just over 2 hours as only 6 calls/hour without Oauth.
var repeat = true; // turn updates on or off

// API URLS
var emberURL = 'https://api.github.com/repos/emberjs/ember.js';
var vueURL = 'https://api.github.com/repos/vuejs/vue';
var angularURL = 'https://api.github.com/repos/angular/angular.js';
var reactURL = 'https://api.github.com/repos/facebook/react';




/* ====================================
    ON DOC READY
    make initial calls to get data
    call function to make delayed calls and repeate every 2.1 hours
==================================== */
$(document).ready(function() {
    getData(angularURL);
    getData(reactURL);
    getData(emberURL);
    getData(vueURL);


});



/* ====================================
    GET DATA OBJECT FOR REPO PASSED AS API URL ARGUMENT
    and call helper function which combines data with
    data from other repos
==================================== */
function getData(apiURL){
    $.ajax({
        url: apiURL,
        cache: false,
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            combineData(data);
        }
    });
}



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
    COMBINE DATA INTO SINGLE ARRAY
    this saves request data onto main data array
    conditionals used: if react save at index 1, etc.
==================================== */
function combineData(data){
    if (data.name == 'angular.js'){
        allData[0] = data;
    } else if ( data.name == 'react'){
        allData[1] = data;
    } else if ( data.name == 'ember.js'){
        allData[2] = data;
    } else if ( data.name == 'vue'){
        allData[3] = data;
    }
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

    // empty dynamically updated cells so if they don't update with new data we'll notice a problem
    $('td:first-child').empty();
    $('td:nth-child(2)').empty();
    $('td:nth-child(3)').empty();

    // update stargazers
    $('#angular-stargazers').text(allData[0].stargazers_count);
    $('#react-stargazers').text(allData[1].stargazers_count);
    $('#ember-stargazers').text(allData[2].stargazers_count);
    $('#vue-stargazers').text(allData[3].stargazers_count);

    



}




// init function containing
// initial calls to ajax functions
// call to repeat function

// update frequency variable definition




// show frequency maybe function
// show last update function






/* ====================================

    REMOVED OR REFACTORED CODE DISCARDS

==================================== */
// function getReactData(){
//     $.ajax({
//         url: 'https://api.github.com/repos/facebook/react',
//         cache: false,
//         dataType: 'JSON',
//         success: function(data){
//             reactData = data;
//             console.log('here is reactData:');
//             console.log(reactData);
//
//             combineData(reactData);
//         }
//     });
// }



/* ====================================
    GET REACT DATA OBJECT &
    PUSH IT ONTO MAIN DATA ARRAY
==================================== */
// function getAngularData(){
//     $.ajax({
//         url: 'https://api.github.com/repos/angular/angular.js',
//         cache: false,
//         dataType: 'JSON',
//         success: function(data){
//             angularData = data;
//             console.log('here is angularData:');
//             console.log(angularData);
//
//             combineData(angularData);
//         }
//     });
// }
