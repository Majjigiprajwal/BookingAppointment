

const booking = document.getElementById('book');
const appointmentList= document.getElementById('appointment-lists');
document.addEventListener('DOMContentLoaded',fetchAppointments);

const createAppointment = async ()=>{
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    const data ={
      name:name,
      email:email,
      address:address
    }
      let response = await  axios.post('https://crudcrud.com/api/c490dcf841d841f1a4a454696a94a1c4/appointments',data)
      const appointments = response.data;
        const div = document.createElement('div');
        const content = document.createElement('p');
        content.textContent=`${appointments.name}-${appointments.email}-${appointments.address}`
        div.appendChild(content);
        const updateButton = document.createElement('button');
        updateButton.textContent="Edit"
        updateButton.className="update-btn"
        updateButton.id=appointments._id
        div.appendChild(updateButton)
  
        const deleteButton = document.createElement('button')
        deleteButton.textContent="Delete"
        deleteButton.className="Delete-btn"
        deleteButton.id=appointments._id
        div.appendChild(deleteButton)
  
        deleteButton.addEventListener('click',deleteAppointment);
  
        updateButton.addEventListener('click',updateAppointment);
        appointmentList.appendChild(div);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
}

booking.addEventListener('click',createAppointment)

 const deleteAppointment = async (e)=>{
    let id = e.target.id;
    axios.delete(`https://crudcrud.com/api/c490dcf841d841f1a4a454696a94a1c4/appointments/${id}`)
     .then((res)=>{
       if(res.status==200){
        let element = document.getElementById(e.target.id).parentElement;
        element.remove();
       }
     })
     .catch((err)=>{
      console.log('Cannot delte user',err);
     })
}

const updateExistingAppointment = async (userId)=>{
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let address = document.getElementById('address').value;

  const data = {
    name: name,
    email: email,
    address: address
  }
    try{
      await axios.put(`https://crudcrud.com/api/c490dcf841d841f1a4a454696a94a1c4/appointments/${userId}`, data);
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('address').value = '';
  
      booking.removeEventListener('click', updateExistingAppointment);
      booking.textContent = 'Book Appointment';
      booking.addEventListener('click', createAppointment)
      fetchAppointments();
    }
    catch(error){
     console.log(error);
    }
}

 const updateAppointment = async (e)=>{
  try{
    let id = e.target.id;
    axios.get(`https://crudcrud.com/api/c490dcf841d841f1a4a454696a94a1c4/appointments/${id}`)
      .then((response)=>{
       document.getElementById('name').value=response.data.name;
       document.getElementById('email').value=response.data.email;
       document.getElementById('address').value=response.data.address;
       let element = document.getElementById(e.target.id).parentElement;
       element.remove();
       booking.removeEventListener('click', createAppointment);
       booking.textContent = 'Update';
       booking.addEventListener('click', () => updateExistingAppointment(id));
      })
  }
  catch(error){
      console.log(error);
  }

}



async function fetchAppointments(){
  try{
    const response = await axios.get('https://crudcrud.com/api/c490dcf841d841f1a4a454696a94a1c4/appointments');
    const appointments = response.data;
    appointmentList.innerHTML="";

    appointments.forEach((appointment)=>{
      const div = document.createElement('div');
      const content = document.createElement('p');
      content.textContent=`${appointment.name}-${appointment.email}-${appointment.address}`
      div.appendChild(content);
      const updateButton = document.createElement('button');
      updateButton.textContent="Edit"
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