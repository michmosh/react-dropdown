import React, { Component } from 'react';
import styles from './style.css'

class Comp1 extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
       <ul>
           {
               this.props.data.map((element, index)=>{
               return (
                <li key={index}>
                    <span>{element.name}</span> 
                </li>
               ) })
           }
           
       </ul>
        );
    }
}

export default Comp1;
