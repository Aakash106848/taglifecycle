import {Component} from 'react';
import './UDetails.css'
import User from './User';

class UDetails extends Component{
    UserArray=[];
    constructor()
    {
        super();
        this.state={
            Name:"",
            Address:"",
            UpdateCount:0,
        }
        this.updateName=this.updateName.bind(this);
        this.updateAddress=this.updateAddress.bind(this);
        this.confirmReset=this.confirmReset.bind(this);
        this.AddUser=this.AddUser.bind(this);
        this.deleteEntry=this.deleteEntry.bind(this);
        
    }
    

    /* this function gets executed when the tag is getting loaded in the mounting phase.Use this function to initialize the state and perform some initial tasks like DB connection or authentication */
    componentDidMount(){
        this.setState({Name:"ASDFG"})
        this.setState({Address:"QWERTY"})
        console.log("State Initialized")
    }
    /* this function gets executed whenever the state of the component is changed.It is called when the component is re-rendered.Use this function to update the state, perform some logic and update the DOM */
    componentDidUpdate(){
        
        const today = new Date();
        console.log("Got updated on :"+ today.getFullYear() + "-" + (today.getMonth() + 1) + "-"+ today.getDate() + " " + today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds() +"for" + this.state.UpdateCount +" times");
        
    }
    componentWillUnmount(){
      
        const today = new Date();
        console.log("Unmounted on :"+ today.getFullYear() + "-" + (today.getMonth() + 1) + "-"+ today.getDate() + " " + today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds());
    }
    updateName(event)
    {
        this.setState({Name:event.target.value})
        this.setState({UpdateCount:this.state.UpdateCount+1})
    }
    updateAddress(event)
    {
        this.setState({Address:event.target.value})
        this.setState({UpdateCount:this.state.UpdateCount+1})
    }
    

    confirmReset()
    {
        const v = window.confirm("Are you sure you want to reset the data?");
        if(v)
        {
            this.setState({Name:""})
            this.setState({Address:""})
        }
        else{
            return
        }
    }
    AddUser(event)
    {   
        event.preventDefault();
        const u = new User(this.state.Name, this.state.Address);
        this.UserArray.push(u);
        console.log(this.UserArray);
        window.alert(JSON.stringify(this.UserArray));
        this.setState({ UserArray: this.UserArray });

    }
    deleteEntry(event)
    {
        event.preventDefault();
        const w = document.getElementById('delete').value;
        const v = window.confirm("Are you sure you want to delete this entry?");
        if(v)
        {
            const indexToDelete = this.UserArray.findIndex(User => User.Name === w);
            this.UserArray.splice(indexToDelete,1);
            this.setState({ UserArray: this.UserArray });
        }
    }
    render(){
        return(
            <div className='Container'>
                <fieldset>
                    <legend>User Details</legend>
                <form onSubmit={this.AddUser} onReset={this.confirmReset}>
                    <label>Name :</label><input type="text" placeholder="Name" value={this.state.Name} onChange={this.updateName}/>
                    <label>Address :</label><input type="text" placeholder="Address" value={this.state.Address} onChange={this.updateAddress}/>
                    <input className='submitButton' type="submit"value="Add Data" />
                    <input className='submitButton' type="reset" value="Reset Data" />
                    <label>Delete:</label><input id='delete' type="text" placeholder="Name"/>
                    <input className='submitButton'  onClick={this.deleteEntry} type="button" value="Delete"/>

                </form>
                </fieldset>
                <table border="1">
                    {
                        this.UserArray.map((usr, index) => (
                        <tr key={index}>
                            <td>
                            {usr.Name}
                            </td>
                            <td>
                            {usr.Address}
                            </td>
                        </tr>
                        ))
                    }
                </table>   
            </div>
        )
    }
}
export default UDetails;