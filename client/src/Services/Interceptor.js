const intereptor =async (url,method="GET",body={})=>{
  let token = localStorage.getItem("Token");
  token = JSON.parse(token)

  let options = {
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
    const response = await fetch(`http://localhost:3000${url}`,options).then(res=>res.json())

    return response;

  } catch (error) {
    throw new Error(error)
  }
}

export default intereptor;