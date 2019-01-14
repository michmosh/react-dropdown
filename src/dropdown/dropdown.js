import React, { Component } from 'react';
import styles from './style.css';

class DropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDropdownOpen : false,
            data : props.config.data , 
            selectedItem : props.config.selectedValue || null 
        }
    }
    openDropDown = ()=>{
        this.setState((currentState)=>{
            return{
                isDropdownOpen : !currentState.isDropdownOpen
            }
        })
    }

    onSelected = (item)=>{
        this.setState((currentState)=>{
            return {
                selectedItem : item,
                isDropdownOpen : false
            }
        } , ()=>{
            this.props.onSelected(this.state.selectedItem)})
    }
    render() {
        return (
        <div className={styles.dropdownWrapper} style={{width:this.props.config.width}}>
            {
                this.props.config.isCancelButton && this.state.selectedItem ? 
                <i className={styles.closeButton} onClick={()=>this.onSelected(null)}>
                    &times;
                </i>:
                null
            }
            
            <div 
                className={styles.selectedOrPlaceHolder}
                onClick={this.openDropDown}>
                {
                    this.state.selectedItem ?

                        this.props.config.displayKeys?
                            this.props.config.displayKeys.map((itemKey , i)=>{
                                if(itemKey.type === 'text') return <span key={i}>{this.state.selectedItem[itemKey.name]}</span>
                                if(itemKey.type === 'image') return <img key={i} src={this.state.selectedItem[itemKey.name]}></img>
                            })
                        :
                        <span >{this.state.selectedItem  }</span>
                    :
                    <span >{this.props.config.placeHolder}</span>
                }    
            </div>
            <ul className={this.state.isDropdownOpen ? styles.show : styles.hide}>
                {
                    this.props.config.data.map((item , index)=>{ 
                        return(
                            <li className={styles.dropdown} key={index} onClick={()=>this.onSelected(item)}>
                            {
                                this.props.config.displayKeys ? 
                                this.props.config.displayKeys.map((itemKey , i)=>{
                                    if(itemKey.type === 'text') return <span key={i}>{item[itemKey.name]}</span>
                                    if(itemKey.type === 'image') return <img key={i} src={item[itemKey.name]}></img>
                                })
                                :
                                <span key={index}>{item}</span>
                            }
                         </li>
                        )
                    })
                }
            </ul>
        </div>
        );
    }
}

export default DropDown;
