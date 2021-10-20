const baseUrl=process.env.REACT_APP_API_URL

//endpoint al que quiero llamar, /events
export const fetchSinToken= ( endpoint, data, method = 'GET' ) => {
    const url= `${baseUrl}/${endpoint}`; //localhost:4000/api/login
    if(method === 'GET'){
        return fetch(url);
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}
export const fetchConToken= ( endpoint, data, method = 'GET' ) => {
    const url= `${baseUrl}/${endpoint}`; //localhost:4000/api/login
    const token = localStorage.getItem('token') || '';
    if(method === 'GET'){
        return fetch(url,{
            method,
            headers:{
                'x-token': token
            }
        });
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}