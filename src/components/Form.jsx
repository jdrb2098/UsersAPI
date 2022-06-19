import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Form = ({
  createUser,
  updateUserById,
  objectUpdate,
  handleSubmit,
  reset,
  register,
}) => {
  const defaultValuesForm = {
    duration: "",
    genre: "",
    name: "",
    release_date: "",
  };

  const submit = (data) => {
    if (objectUpdate !== undefined) {
      updateUserById(objectUpdate.id, data);
      reset(defaultValuesForm);
    } else {
      createUser(data);
    }
    reset(defaultValuesForm);
  };

  return (
    <form className="form" onSubmit={handleSubmit(submit)}>
      <div className="Row">
        <label htmlFor="First Name">
          <i className="fa-solid fa-user"></i>
        </label>
        <div className="fullName">
          <input
            type="text"
            id="First_Name"
            placeholder="First Name"
            {...register("first_name")}
          />
          <input
            type="text"
            id="last_name"
            placeholder="Last Name"
            {...register("last_name")}
          />
        </div>
      </div>

      <div className="Row">
        <label htmlFor="email">
        <i className="fa-solid fa-envelope"></i>
        </label>
        <input style={{width: '100%'}} type="email" id="email" {...register("email")} />
      </div>
      <div className="Row">
        <label htmlFor="birthday">
        <i className="fa-solid fa-cake-candles"></i>
        </label>
        <input style={{width: '100%'}} type="date" id="birthday" {...register("birthday")} />
      </div>
      <div className="Row">
        <label htmlFor="password">
        <i className="fa-solid fa-lock"></i>
        </label>
        <input style={{width: '100%'}} type="password" id="password" {...register("password")} />
      </div>
      <button className="FormSubmit">Submit</button>
    </form>
  );
};

export default Form;
