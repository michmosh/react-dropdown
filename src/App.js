import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DropDown from './dropdown/dropdown';
import Comp1 from './comp1/comp1';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data : [] , 
      selectedCountries : []
    }
  }
  
  componentDidMount(){
    axios.get(`https://restcountries.eu/rest/v2/all?fields=name;flag`)
    .then(res=>{
      this.setState({
        data : res.data
      })
    })
  }

  onSelected(item){
    if(item !== null){
      this.setState((currentState=>{
        return {
          selectedCountries : [...currentState.selectedCountries , item]
        }
      }))
    }else{
      this.setState((currentState=>{
        let selectedCountriesArray = currentState.selectedCountries;
        selectedCountriesArray.pop();
        return {
          selectedCountries : [...selectedCountriesArray]
        }
      }))

    }
    
  }
  render() {
    let config = {
      data: this.state.data , 
      placeHolder : 'SELECT COUNTRY',
      displayKeys : [{name:'name' , type:'text'},{name:'flag' , type:'image'}],
      width:'10rem' , 
      isCancelButton : true,
      selectedValue : {name:'Brazil' , flag:'https://restcountries.eu/data/bra.svg'}
    }
    return (
      <div className="App">
        <DropDown config={config} onSelected={(item)=>this.onSelected(item)}/>
        <div>
          SELECTED COUTRIES : 
          <Comp1 data={this.state.selectedCountries} />
        </div>
      </div>
    );
  }
}

export default App;
