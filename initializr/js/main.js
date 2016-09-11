

/* ====================================
    GLOBAL VARIABLES
==================================== */

// DATA VARIABLES
var reactData;
var angularData;
var allData = []; // define new array. array needed if we will use ng-repeat to enable filtering and sorting

// UPDATE VARIABLES
var FREQ = 3600000; // update frequency: 1 hour as only 60 calls/hour allowed by api.gihub without Oauth.
var repeat = true; // turn updates on or off

// MAIN API URLS
var emberURL = 'https://api.github.com/repos/emberjs/ember.js';
var vueURL = 'https://api.github.com/repos/vuejs/vue';
var angularURL = 'https://api.github.com/repos/angular/angular.js';
var reactURL = 'https://api.github.com/repos/facebook/react';

// ISSUES API URLS
var emberIssuesURL = 'https://api.github.com/repos/emberjs/ember.js/issues';
var vueIssuesURL = 'https://api.github.com/repos/vuejs/vue/issues';
var angularIssuesURL = 'https://api.github.com/repos/angular/angular.js/issues';
var reactIssuesURL = 'https://api.github.com/repos/facebook/react/issues';



/* ====================================
    ON DOC READY
    make initial calls to get data
    call function to make delayed calls and repeate every 2.1 hours
==================================== */
$(document).ready(function() {

    // CALL MAIN API'S FIRST
    getData(angularURL);
    getData(reactURL);
    getData(emberURL);
    getData(vueURL);

    // CALL "ISSUES" API'S SECOND (TO ADD SINGLE ITEM TO MAIN API DATA)
    getData(angularIssuesURL);
    getData(reactIssuesURL);
    getData(emberIssuesURL);
    getData(vueIssuesURL);


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

    // if data has name field (issues api data does not), add as main data array object
    if (data.name){
        if (data.name == 'angular.js'){
            allData[0] = data;
        } else if ( data.name == 'react'){
            allData[1] = data;
        } else if ( data.name == 'ember.js'){
            allData[2] = data;
        } else if ( data.name == 'vue'){
            allData[3] = data;
        }
    }
    // if data is an array (issues data IS an array), add to existing main data object as an additional field "total_issues"
    else if ( Array.isArray(data) ){

        console.log('hello from passed sec conditional');
        console.log(data[0].number); // 15122

        // check the repo so data added to correct object
        if (data[0].repository_url == angularURL){
            // allData[0].total_issues = data.number;
            // console.log(allData[0].total_issues);
            console.log('hello from a issues conditional block');
        }


        // } else if (data.repository_url == reactURL){
        //     allData[1].total_issues = data.number;
        // } else if (data.repository_url == emberURL){
        //     allData[2].total_issues = data.number;
        // } else if (data.repository_url == vueURL){
        //     allData[3].total_issues = data.number;
        // }
        //
        // console.log('total_issues angular:' + allData[0].total_issues);
    }


    console.log('here is allData:');
    console.log(allData);
    renderDataToPage(allData);
}



/* ====================================
    CALCULATE PERCENTAGE OF ISSUES THAT HAVE BEEN closed
    (a metric for project support)
    use # total_issues - # open_issues = # closed_issues.
    # closed / # total = fraction ie .8
    remove decimals from fraction + '%' for percentage
==================================== */



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

    // update stargazers column
    $('#angular-stargazers').text(allData[0].stargazers_count);
    $('#react-stargazers').text(allData[1].stargazers_count);
    $('#ember-stargazers').text(allData[2].stargazers_count);
    $('#vue-stargazers').text(allData[3].stargazers_count);

    // update forks column
    $('#angular-forks').text(allData[0].forks_count);
    $('#react-forks').text(allData[1].forks_count);
    $('#ember-forks').text(allData[2].forks_count);
    $('#vue-forks').text(allData[3].forks_count);



    showLastUpdateTime();


}


// show 'last update' using current time
function showLastUpdateTime(){
    var currentDate = new Date();
    var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	var hours = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	if (minutes < 10) {
        minutes = "0" + minutes;
    }
	var suffix = "AM";
	if (hours >= 12) {
        suffix = "PM";
	    hours = hours - 12;
	} else if (hours === 0) {
        hours = 12;
	}
	$('#last-update').text(day + "/" + month + "/" + year + " at " + hours + ":" + minutes + " " + suffix);
}

showLastUpdateTime();

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
