import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

class App extends Component {
    state = {
      characters: [],
    }

    removeCharacter = index => {
      const { characters } = this.state
      this.makeDeleteCall(characters[index]).then(callResult => {
	if (callResult.status === 200) {
      		this.setState({
        	characters: characters.filter((character, i) => {
          	return i !== index
        	}),
      		})
	}
    });
    }

    handleSubmit = character => {
       this.makePostCall(character).then(callResult => {
          if (callResult.status === 201) {
	     this.setState({ characters: [...this.state.characters, callResult.data] });
	   }
    });
    }

    render() {
      const { characters } = this.state
    
      return (
      	<div className="container">
          <Table characterData={characters} removeCharacter={this.removeCharacter} />
          <Form handleSubmit={this.handleSubmit} />
        </div>
      )
    }

    componentDidMount() {
       axios.get('http://localhost:5000/users')
       .then(res => {
          const characters = res.data.users_list;
          this.setState({ characters });
       })
       .catch(function (error) {
            //Not handling the error. Just logging into the console.
          console.log(error);
    	});
    }
	makePostCall(character){
		console.log("posting");
		console.log(character);
		return axios.post('http://localhost:5000/users', character)
		.then(function (response) {
			console.log(response.status);
			return (response);
		})
		.catch(function (error) {
      			console.log(error);
      			return false;
    		});
 	}
	makeDeleteCall(character){
		console.log("deleting");
		console.log(character);
		return axios.delete('http://localhost:5000/users/'.concat(character['id']))
		.then(function (res) {
			console.log(res.status);
			return res;
		})
		.catch(function (error) {
			console.log(error);
			return false;
		});
	}
  }

export default App
