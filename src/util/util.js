export const fetchEnd = (url,method) => {
return fetch(url,{
  method:method,
  mode:"cors",
  headers:{
           "Content-type": "application/json; charset=UTF-8"
  }
});
}
