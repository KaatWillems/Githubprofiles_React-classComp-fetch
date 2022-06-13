import React from 'react';
import ReactDOM from 'react-dom/client';
import { Component } from 'react'
import './index.css';
//import App from './App';
//import pic1 from './logo192.png'
import axios from 'axios'


const Cardlist = (props) => (

   <div> 
     {/* props.profiles is passed in the App.js and equals the testData (and later the fetchdata): */}
     {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}    
   </div>
  
)


class Card extends React.Component {
  
  render () {

    const profile = this.props;
    return (  
    <div className='github-profile' >
      <img src={profile.avatar_url} alt="" />
      <div className='info'>
          <div className='name'> {profile.name}</div>
          <div className='company'> {profile.company}</div>
      </div>

    </div>
    )
  }
}

class Form extends React.Component {
  state = { userName: '' };

   handleSubmit = async (event) => {
    event.preventDefault()
console.log("xxx")
     const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.kaatonSubmit(resp.data); 
    // to make the input field empty again:
      this.setState({userName: ''})
  }
 
 
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder='Github username' 
        value={this.state.userName}
        onChange={event => this.setState({userName: event.target.value})}
        required />

        <button>Add card</button>
        
      </form>
    )
  }
}


class App extends React.Component {

  state = {
    profiles: [],
  }

  addNewProfile = (profileData) => {
    console.log(profileData)
    
    this.setState(prevState => ({
    profiles: [...prevState.profiles, profileData],     
    }) )
  }


  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form kaatonSubmit={this.addNewProfile} />
        <Cardlist profiles={this.state.profiles} />
      </div>

    )
  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App title="The Github Cards App"/>
  
);

