import { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import CardMovie from "./components/CardMovie";
import Form from "./components/Form";
import { useForm } from "react-hook-form";

const URL = "https://users-crud1.herokuapp.com/users/";

function App() {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const { handleSubmit, register, reset } = useForm();

  const [users, setUsers] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  const [objectUpdate, setObjectUpdate] = useState();

  const getAllUsers = () => {
    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const createUser = (newUser) => {
    axios
      .post(URL, newUser)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const updateUserById = (id, updateUser) => {
    axios
      .patch(`${URL}${id}/`, updateUser)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
        setObjectUpdate();
        showForm();
        executeScroll();
        setIsShowForm(false);
      })
      .catch((err) => console.log(err));
  };
  console.log(users);
  const showForm = () => {
    const obj = {
      duration: "",
      genre: "",
      name: "",
      release_date: "",
    };
    reset(obj);
    setIsShowForm(!isShowForm);
  };

  return (
    <div className="App">
      <div className="formContainer">
        <div >
          <button className="hideButton" onClick={showForm}>
            <h2>{isShowForm ? "Hide Form" : "Create a new User"}</h2>
          </button>
        </div>
        <div ref={myRef}>
          {isShowForm && (
            <Form
              createMovie={createUser}
              updateMovieById={updateUserById}
              objectUpdate={objectUpdate}
              handleSubmit={handleSubmit}
              reset={reset}
              register={register}
            />
          )}
        </div>
      </div>

      {users?.map((user) => (
        <CardMovie
          executeScroll={executeScroll}
          key={user.id}
          user={user}
          URL={URL}
          getAllUsers={getAllUsers}
          setObjectUpdate={setObjectUpdate}
          setIsShowForm={setIsShowForm}
          reset={reset}
        />
      ))}
    </div>
  );
}

export default App;
