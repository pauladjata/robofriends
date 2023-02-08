import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !robots.length ? (
    <h1>Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />;
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;

// this is the same code as above but written as a class
// the above code uses Hooks: useState, useEffect
// all references to this.state have been removed from the above code

// class App extends Component {
// This has been replaced with useState
//   constructor() {
//     super();
//     this.state = {
//       robots: [],
//       searchfield: "",
//     };
//   }

// This has been replaced with useEffect
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) => this.setState({ robots: users }));
//   }

//   onSearchChange = (event) => {
//     this.setState({ searchfield: event.target.value });
//   };
//   render() {
//     const { robots, searchfield } = this.state;
//     const filteredRobots = robots.filter((robot) => {
//       return robot.name.toLowerCase().includes(searchfield.toLowerCase());
//     });
//     return !robots.length ? (
//       <h1>Loading</h1>
//     ) : (
//       <div className="tc">
//         <h1 className="f1">RoboFriends</h1>
//         <SearchBox searchChange={this.onSearchChange} />
//         <Scroll>
//           <ErrorBoundary>
//             <CardList robots={filteredRobots} />;
//           </ErrorBoundary>
//         </Scroll>
//       </div>
//     );
//   }
// }

// export default App;
