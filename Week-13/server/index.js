const http = require('http');
const url = require('url');
const fetch = require('node-fetch');

const key = 'b0f962dffa1c431a97225624220207';
const port = 3001;

const cities=['Kolkata','Bangalore','Pune','Ahmedabad','Chennai','Mumbai','Coimbatore',
'Indore','Bhubaneswar','Hydrabad','Jamshedpur','Delhi','Jaipur','Kochi','Chandigarh','Dehradun'];

const server = http.createServer(async(req,res)=> {
  const q= url.parse(req.url,true);
  const path = q.pathname;
  const query= q.query;
  res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})

  if(req.url === '/api/cities'){
    res.write(JSON.stringify({cities: cities}))
    res.end()
  }

  else if(path === '/api/weather'){
    if(query.city){
      const weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query.city}&days=3&aqi=no&alerts=no`);
      let response = await weather.json();
      res.write(JSON.stringify({data: response}));
      // let data = getCurrentWeather(query.city);
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