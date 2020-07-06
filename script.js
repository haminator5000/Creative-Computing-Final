let covidData; //declare global variable

//fetch data from URL, transform into json
  fetch("https://covidtracking.com/api/v1/us/daily.json") 
    .then(response => response.json()) 
    .then(data => {
      // Creating an array for object, then loop through array
      Object.keys(data).forEach((key, index) => {
        // Changing date to be moment compatible 
        data[key]['date'] = moment('' + data[key]['date']);
        // Calculating number of days in the past for each date
        data[key]['inPast'] = moment().diff(data[key]['date'], 'days');
      });
      // Save data to global variable
      covidData = data;
      // Call function to render data
      renderData();
    })
  
function renderData(){
  // Filter covid data for last 7 days
  let covidWeek = covidData.filter(covidDay => covidDay.inPast < 7);
  // Loop through each day
  covidWeek.forEach(day => {
    // Save current day div
    let dayContainer = document.getElementById(`day${day.inPast}`)
    // Day title
    dayContainer.querySelector('.dayTitle').innerHTML = day.date.format('dddd MMMM Do')
    // Deaths per day
    for(i = 0; i < day.deathIncrease; i++){      
      let deathDot = document.createElement("div");
      deathDot.classList.add('deathDot');
      dayContainer.appendChild(deathDot);
    }
    // Recovered patients per day
    let previousDay = covidData.find(covidDay => ( covidDay.inPast === (day.inPast + 1)))
    for(i = 0; i < Math.abs(day.recovered - previousDay.recovered); i++){      
      let recoveredDot = document.createElement("div");
      recoveredDot.classList.add('recoveredDot');
      dayContainer.appendChild(recoveredDot);
    }
  });
}

  

/*

{
  "date": 20200704,
  "states": 56,
  "positive": 2838465,
  "negative": 32019962,
  "pending": 2083,
  "hospitalizedCurrently": 38111,
  "hospitalizedCumulative": 248155,
  "inIcuCurrently": 5628,
  "inIcuCumulative": 10977,
  "onVentilatorCurrently": 1982,
  "onVentilatorCumulative": 1063,
  "recovered": 894325,
  "dateChecked": "2020-07-04T00:00:00Z",
  "death": 122464,
  "hospitalized": 248155,
  "lastModified": "2020-07-04T00:00:00Z",
  "total": 34860510,
  "totalTestResults": 34858427,
  "posNeg": 34858427,
  "deathIncrease": 306,
  "hospitalizedIncrease": 871,
  "negativeIncrease": 592524,
  "positiveIncrease": 52406,
  "totalTestResultsIncrease": 644930,
  "hash": "187f8a5aab7c1e89824dcd2e43dc68269ebeb9af"
}

*/