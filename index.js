

const booking = document.getElementById('book');
const appointmentList= document.getElementById('appointment-lists');
document.addEventListener('DOMContentLoaded',fetchAppointments);



const createAppointment = async ()=>{
     console.log('')
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    const data ={
      name:name,
      email:email,
      address:address
    }
      let response = await  axios.post('https://crudcrud.com/api/94b66272c89a47668d5b21ab7e79952b/newappointments',data)
      fetchAppointments()
      console.log(response.data);
      return response;
}

booking.addEventListener('click',createAppointment)

 function deleteAppointment(e){
   console.log(e.target.id);
}
 function updateAppointment(e){
  console.log(e.target.id);
}

async function fetchAppointments(){
  try{
    const response = await axios.get('https://crudcrud.com/api/94b66272c89a47668d5b21ab7e79952b/newappointments');
    const appointments = response.data;

    appointments.forEach((appointment)=>{
      const div = document.createElement('div');
      const content = document.createElement('p');
      content.textContent=`${appointment.name}-${appointment.email}-${appointment.address}`
      div.appendChild(content);
      const updateButton = document.createElement('button');
      updateButton.textContent="Update"
      updateButton.className="update-btn"
      updateButton.id=appointment._id
      div.appendChild(updateButton)

      const deleteButton = document.createElement('button')
      deleteButton.textContent="Delete"
      deleteButton.className="Delete-btn"
      deleteButton.id=appointment._id
      div.appendChild(deleteButton)

      deleteButton.addEventListener('click',deleteAppointment);

      updateButton.addEventListener('click',updateAppointment);
      appointmentList.appendChild(div);
    })
  }
  catch(error){
    console.log(error);
  }
}