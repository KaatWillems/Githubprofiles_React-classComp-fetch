import React from 'react';
import ReactDOM from 'react-dom/client';
import { Component } from 'react'
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import pic1 from './logo192.png'
import axios from 'axios'

//gaearon  bvaughn

	// const testData = [
	// 		{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "Facebook"},
  //     {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  // 		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Twitter"},
	// ];

//parent
const Cardlist = (props) => (

   <div> 
     {/* props.profiles is passed in the App js and equals the testData: */}
     {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
     {/* <Card {...testData[0]} />
     <Card {...testData[1]} /> */}
   </div>
  
)

//child 
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

  // userNameInput = React.createRef();

   handleSubmit = async (event) => {
    event.preventDefault()

    //console.log(this.state.userName)

    // console.log(
    //   // the value of the input, thanks to ref
    //   this.userNameInput.current.value
    // )
   
     const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    //  the value that the user inputted in the input.  
    //console.log(resp.data)
    //const data = await resp.json();
      this.props.onSubmit(resp.data); //set 
    // to make the input field empty again:
      this.setState({userName: ''})
  }
 
 
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* needs this and on top it doesnt need const, for some reason  */}
        <input type="text" placeholder='Github username' 

        value={this.state.userName}
        onChange={event => this.setState({userName: event.target.value})}

        // ref={this.userNameInput} 
        required />
        <button>Add card</button>
        
      </form>
    )
  }
}

// ===first way to get input value from input:
// 1. on top in Form Comp; userNameInput = React.createRef();
// 2. in handlesubmit funuciton: console.log(
    //   // the value of the input, thanks to ref
    //   this.userNameInput.current.value
    // )
//3. on input tag: ref={this.userNameInput} 

//==SECOND WAY (controlled):
/*
1. make state ={userName: ''}
2. in input tag: value={this.state.userName}
3. OnChange={event => this.setState(userName: event.target.value)}   (otherwise you cannot type in inputfield)
 THis is better. react is aware of state change while user is typing 
*/


class App extends React.Component {

  // constructor(props) {
  //   super(props)
  //  this.state = {
  //    profiles: testData,
  //  }
  // }
// instead of the above we can also write this: 
  state = {
    profiles: [],
  }

  addNewProfile = (profileData) => {
   // console.log("hello ")
    console.log(profileData)
    
    this.setState(prevState => ({
      // profiles: [profileData], 
      // the above works but then it does not remember your previous searches  with the prevstate it shows the current state + profiledata the new state you give it. 
      profiles: [...prevState.profiles, profileData],
     
    }) )
    
     // console.log('App', profileData)
  }


  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <Cardlist profiles={this.state.profiles} />
        {/* state is an object on the instance and the profiles array is a property on that object */}
      </div>

    )
  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App title="The Github Cards App"/>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
