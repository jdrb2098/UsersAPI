import axios from "axios";
import React from "react";

const CardUsers = ({
  user,
  getAllUsers,
  URL,
  setObjectUpdate,
  setIsShowForm,
  reset,
  executeScroll
}) => {
  const deleteUser = (id) => {
    axios
      .delete(`${URL}${id}/`)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const updateUser = () => {
    setIsShowForm(true)
    executeScroll();

    const obj = {
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      birthday: user.birthday,
    };

    reset(obj);
    setObjectUpdate(user);
  };

  return (
    <article className="card">
      <div className="card__info">
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <ul className="card__info__ul">
          <li className="text-muted">
            {user.email}
          </li>
          
          <li>
          <i className="fa-solid fa-calendar-days"></i>
            {user.birthday}
          </li>
        </ul>
      </div>
      <div className="icons-div">
        <button onClick={() => deleteUser(user.id)}>
          <i className="Trash-button fa-solid fa-trash"></i>
        </button>
        <button onClick={updateUser}>
          <i className="fa-solid fa-pen-fancy"></i>
        </button>
      </div>
    </article>
  );
};

export default CardUsers;
