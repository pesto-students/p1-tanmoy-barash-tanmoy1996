const http = require('http');
const url = require('url');
const fetch = require('node-fetch');

const key = 'b0f962dffa1c431a97225624220207';
const multikey = 'a092fa747ef5b9e757bee8ca32fe677c';
const port = 3001;

const cities=[
  {
    "id": 1275004,
    "name": "Kolkata",
  },
  {
    "id": 1277333,
    "name": "Bengaluru",
  },
  {
    "id": 1259229,
    "name": "Pune",
  },
  {
    "id": 1279233,
    "name": "Ahmedabad",
  },
  {
    "id": 1264527,
    "name": "Chennai",
  },
  {
    "id": 1275339,
    "name": "Mumbai",
  },  
  {
    "id": 1269743,
    "name": "Indore",
  },
  {
    "id": 1275817,
    "name": "Bhubaneshwar",
  },
  {
    "id": 1269843,
    "name": "Hyderabad",
  },
  {
    "id": 1269300,
    "name": "Jamshedpur",
  },
  {
    "id": 1273294,
    "name": "Delhi",
  },
  {
    "id": 1269515,
    "name": "Jaipur",
  },
  {
    "id": 1859146,
    "name": "Kochi",
  },
  {
    "id": 1274744,
    "name": "Chandigarh",
  },
  {
    "id": 1273313,
    "name": "Dehra-Dun",
  }
];

const server = http.createServer(async(req,res)=> {
  const q= url.parse(req.url,true);
  const path = q.pathname;
  const query= q.query;
  res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})

  if(req.url === '/api/cities'){
    res.write(JSON.stringify({cities: cities}))
    res.end()
  }

  else if(path === '/api/cw'){
    if(query.page && query.page<5){
      var start = query.page*3-3;
      var end = query.page*3;
      var cityIds = cities.filter((c,i)=>{if(i>=start && i<end){ return true}}).map(c=>c.id)
      
      const weather = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${cityIds.toString()}&appid=${multikey}&units=metric`);
      let response = await weather.json();
      res.write(JSON.stringify({data: response.list}));
    }
    else{
      res.writeHead(404)
      res.write('Error: Page not available')
    }
    res.end()
  }
  
  else if(path === '/api/cityId'){
    if(query.id && query.id!=''){

      const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${query.id}&appid=${multikey}&units=metric`);
      let response = await weather.json();
      res.write(JSON.stringify({data: response}));
    }
    else{
      res.writeHead(404)
      res.write('Error: Page not available')
    }
    res.end()
  }

  else if(path === '/api/weather'){
    if(query.cityId && query.cityId!=''){
      var city = cities.filter((c)=>c.id==query.cityId)[0];
      const weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city.name}&days=3&aqi=no&alerts=no`);
      let response = await weather.json();
      res.write(JSON.stringify({data: response}));
    }
    else{
      res.writeHead(404)
      res.write('Error: City not found')
    }
    res.end()
  }

  else if(path === '/api/weather'){
    if(query.cityId && query.cityId!='' && query.date!=''){
      var city = cities.filter((c)=>c.id==query.cityId)[0];

      const weather = await fetch(`http://api.weatherapi.com/v1/history.json?key=${key}&q=${city.name}&dt=${query.date}`);
      let response = await weather.json();
      res.write(JSON.stringify({data: response}));
    }
    else{
      res.writeHead(404)
      res.write('Error: City not found')
    }
    res.end()
  }
  


  else {
    res.writeHead(404)
    res.write('Error: Page Not Found')
    res.end()
  }
})

server.listen(port, function(error){
  if(error){
    console.log('Something went wrong', error)
  }
  else{
    console.log('Server is listening on port', port)
  }
})