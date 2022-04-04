import React, { useState } from 'react'
import { Link,useHistory   } from 'react-router-dom'
import axios from 'axios'
import { api_url } from '../ApiUrl';

function Login() {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    axios({
  
      // Endpoint to send files
      url: api_url+"login_employee.php",
      method: "POST",
      data: credentials,
      // headers: {
  
      //   // Add any auth token here
      //   'Content-type': 'application/json;charset=UTF-8'
      // },
    })
    .then((response)=>{
      console.log(response.data.data[0].id);
      if(JSON.stringify(response.data.status)==="400")
        {
          alert("Please Register Yourself");
        }
        else
        {
          
          localStorage.setItem('user_type',response.data.data[0].user_type);
          localStorage.setItem('employee_id',response.data.data[0].employee_id);
          localStorage.setItem('authenticated', true);
          localStorage.setItem('property','block');
          if(response.data.data[0].user_type==="crm")
          {
            history.push("/crm_dashboard")
          }
          else if(response.data.data[0].user_type==="designer_head")
          {
            history.push("/crm_dashboard")
          }
          else if(response.data.data[0].user_type==="designer")
          {
            history.push("/designer_dashboard")
          }
          else if(response.data.data[0].user_type==="hr")
          {
            history.push("/hr_dashboard")
          }
          else if(response.data.data[0].user_type==="machine_operator")
          {
            history.push("/machine_operator_dashboard")
          }
          else if(response.data.data[0].user_type==="programmer")
          {
            history.push("/programmer_dashboard")
          }
          else if(response.data.data[0].user_type==="stock_manager")
          {
            history.push("/stock_manager_dashboard")
          }
          else if(response.data.data[0].user_type==="purchase_manager")
          {
            history.push("/purchase_manager_dashboard")
          }
          else if(response.data.data[0].user_type==="super_admin")
          {
            history.push("/super_admin_dashboard")
          }
          else if(response.data.data[0].user_type==="transporter")
          {
            history.push("/transporter_dashboard")
          }
          else
          {
            history.push("/")
          }
        }
    })
    // fetch('http://localhost/girnar_backend/api/customer_login', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
      
    // })
    
    // .then((response)=>response.json())
    // .then((responsedata)=>{
    //     console.log(responsedata.data)
    //     if(responsedata.data==="Invalid Login")
    //     {
    //       alert("Invalid Login");
    //     }
    //     else
    //     {
    //         localStorage.setItem('authenticated', true);
    //         localStorage.setItem('property','block')
    //         history.push("/")
       
    //     }
    // })
  }
  return (
    <div>
      <section className="h-100 gradient-form" style={{ "backgroundColor": "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ "width": "185px" }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are The Girnar Team</h4>
                      </div>
                      <form onSubmit={onFormSubmit}>
                        <div className="form-outline mb-4">
                          <label className="form-label" >Username</label>
                          <input name="username" className="form-control" placeholder="Enter Username" onChange={onInputChange} />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" >Password</label>
                          <input name="password" type="password" className="form-control" placeholder="Enter Password" onChange={onInputChange} />
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Log in</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p> <br />
                          <Link to="/register">
                            <button type="button" className="btn btn-outline-danger" style={{ color: 'blue' }}>Create new</button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4" >
                      <h4 style={{ color: ' #4600b9' }} className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0" style={{ color: ' #4600b9' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
