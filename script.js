const api={
    key:'db41a3f9a102cb6ee224a355f429f544',
    base: "https://api.openweathermap.org/data/2.5/"
}



const searchbox = document.querySelector('.search-box') 
searchbox.addEventListener('keypress',setquery)

function setquery(ev){
    if (ev.keyCode==13){
       getResult(searchbox.value)
    }
}

function getResult(query){
 fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
     .then(weather=>{
         return weather.json();
     }).then(displayResults);
}

function displayResults(weather){
     
       let city=document.querySelector('.location .city')
       city.innerHTML= `${weather.name},${weather.sys.country}`
       let now= new Date();
       let date=document.querySelector('.location .date')
       date.innerHTML=dateBuilder(now);
       let temp = document.querySelector('.current .temp')
       temp.innerHTML= `${Math.round(weather.main.temp)}<span>°c</span>`
       let weath= document.querySelector('.current .weather');
       weath.innerHTML=`${weather.weather[0].main}`
       let hilow= document.querySelector('.current .hi-low')
       hilow.innerHTML=`${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`
       

}



function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()] 
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year= d.getFullYear()

    return `${day} ${date} ${month} ${year}`;
}


