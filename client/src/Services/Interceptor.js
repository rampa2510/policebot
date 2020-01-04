const intereptor =async (url,method="GET",body={})=>{
  let token = localStorage.getItem("Token");

  if(token) token = JSON.parse(token)

  const options = {
    method,
    headers:{
      'authorization':`Bearer ${token}`,
      'content-type':'application/json'
    },
    body:JSON.stringify(body)
  }

  if(!Object.keys(body).length) delete options.body

  if(!token) delete options.headers.authorization

  try {
    const response = await fetch(`http://localhost:4000${url}`,options).then(res=>res.json())

    if(response.error) throw new Error(response.error)

    return response;

  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}

export default intereptor;