
import api from "../../api.js";
import { useState, useEffect } from "react";
function Test() {
  const [users , setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div> 
    <>
      {users.map((u) => (
        <div key={u._id}>{u.name}
        <h1>{u.email}</h1>
        
        
        </div>
        
      ))}
    </>

    <h2>Test</h2>
    </div>
  );  
    
} 
export default Test;

/*
import api from "../../api.js";
import { useState, useEffect } from "react";

function Test() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {users.map((u) => (
        <div key={u._id}>{u.name}</div>
      ))}
    </>
  );
}

export default Test;

*/