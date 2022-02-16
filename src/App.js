import React, { useState, useEffect } from "react";
import Scroll from "./components/scroll.component";
import CardList from "./components/cardlist.component";
import SearchBox from "./components/searchbox.component";
import Spinner from "./components/spinner.component";

function App() {
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async function () {
    try {
      const resp = await fetch(
        `https://randomuser.me/api/?results=20&nat=us,gb,fr,de&inc=name,email,picture`
      );
      const userData = await resp.json();
      return setUsers(
        userData.results.map((user) => {
          return {
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            picture: user.picture.large,
          };
        })
      );
    } catch (error) {
      return "Ooops";
    }
  };

  const onSearchChange = (event) => {
    return setSearchField(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(searchField.toLowerCase());
  });
  return !users.length ? (
    <Spinner />
  ) : (
    <div className="tc">
      <h1>Friends Rolodex</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList users={filteredUsers} />
      </Scroll>
    </div>
  );
}

export default App;
