document.getElementById('Book').addEventListener('click',addUser);


function showData(res){
  var element = document.getElementById('users');
    element.innerHTML += `<li>${res.Name}-${res.Email}-${res.Address}</li>
    <button>Update</button>
    <button>Cancel</buttom>`
}

function addUser(){
  let name = document.getElementById('Name').value;
  let email = document.getElementById('Email').value;
  let address =document.getElementById('Address').value;
  const data ={
    Name:name,
    Email:email,
    Address:address
  }

  axios.post('https://crudcrud.com/api/94b66272c89a47668d5b21ab7e79952b/bookings',data)
   .then((res)=>{
    showData(res.data)
    console.log(res.data);
   })
   .catch((err)=>{
    console.log(err);
   })
}