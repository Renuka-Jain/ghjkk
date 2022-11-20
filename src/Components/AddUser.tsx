//import { Link } from "react-router-dom";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../model/User";
import * as userService from '../Service/UserService'
import {useNavigate } from "react-router-dom"
//import { STATES } from "mongoose";
//import {useHistory} from 'react-router-dom'

import {useForm} from 'react-hook-form'


const AddUser: React.FC = () => {
  const { register, handleSubmit, getValues, formState: {errors} } = useForm<User>()

  let navigate = useNavigate();
  const [userState, setState] = useState<User>({
    name: "",
    password: "", 
    email: "",
  }); //especifiquem els unics camps requerits, onchange per omplir els parametres


  const onSubmit = handleSubmit(async (values) => {
    //e.preventDefault();

    const res = await userService.createUser(values);
    console.log(res);
    navigate('/');
  });

  
  return (
    <div className="container">
      <h2>New User</h2>
      <form onSubmit={onSubmit}>
        <div className="card p-4">
          <div className="mb-3">
            <div className="card-body">
              <label>Name : </label>
              <input {...register('name', {required: "Please Enter Your Name!"})} type="text" />
              <p className="error-message">{errors.name?.message}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
            <div className="mb-3">
            <div className="card-body">
                <label>Email : </label>
                <input {...register("email", {required: "Please Enter Your Email!",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
            message: "Please Enter A Valid Email!"
        }})} type="email" id="email" />
        <p className="error-message">{errors.email?.message}</p>
            </div>
            </div>
        </div>

        <div className="card p-4">
            <div className="mb-3">
            <label>Password : </label>
            <input type="password" id="password" {...register("password", {
        required: "Please Enter Your Password",
        minLength: {value: 8, message: "Password must be at least 8 characters long!"}
        })}/>
    <p className="error-message">{errors.password?.message}</p>
            </div>
            <div className="button">
            <input 
                type="submit" 
            />            
            </div>
        </div>

      </form>
    </div>
  );
};
export default AddUser;
