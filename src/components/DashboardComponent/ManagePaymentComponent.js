import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import { bankDetails, submitBankDetailsClr } from "../../actions/userActions";
import ManagePayment from "../functional/ManagePayment"
import  "./AvailabilityComponent.css";

class ManagePaymentComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDetails : {},
            bankname: '',
            accnumber:  '',
            ifsccode: '',
            pannumber: '',
            accountname: '',
            loading:true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
          });
    }
    handleSubmit(e){
        e.preventDefault();
        let data = {
            "name": this.state.accountname,
            "bankName": this.state.bankname,
            "ifscCode": this.state.ifsccode,
            "accountNumber": this.state.accnumber,
            "panNumber": this.state.pannumber
        }
        this.props.bankDetails(data);
        
    }

    bankDetails = (data) =>{
        this.setState({
            loading:true
        })
        this.props.bankDetails(data)
    }
    loadingOff = () =>{
        this.setState({
            loading:false
        })
    }
    
    async componentWillReceiveProps(nextProps){
        this.setState({
            userDetails : nextProps.user
        }, () => {
            if(this.state.userDetails.bankDetails){
                this.setState({
                    bankname : this.state.userDetails.bankDetails.bankName,
                    accnumber : this.state.userDetails.bankDetails.accountNumber,
                    ifsccode : this.state.userDetails.bankDetails.ifscCode,
                    pannumber : this.state.userDetails.bankDetails.panNumber,
                    accountname : this.state.userDetails.bankDetails.name,
                    loading:false
                }, () => {
                    console.log(this.state.userDetails.bankDetails.bankName)
                })
            }
        
        })
    }

    async componentDidMount(){
        console.log(this.props.user, 'user')
   
    }

    render() {
        return (
            <React.Fragment>
                <div className='col-md-7 col-xl-8 AllComponents'>
                    <ManagePayment 
                     bankName = {this.state.bankName}
                     accnumber = {this.state.accnumber}
                     ifsccode = {this.state.ifsccode}
                     pannumber = {this.state.pannumber}
                     accountname = {this.state.accountname}
                     handleSubmit = {this.handleSubmit}
                     bankDetails = {this.bankDetails}
                     submitBankDetailsRet = {this.props.submitBankDetailsRet}
                     loadingOff = {this.loadingOff}
                     loading = {this.state.loading}
                     handleChange = {this.handleChange}
                     submitBankDetailsClr = {this.props.submitBankDetailsClr}
                    />
                </div>
                <div className='col-md-3'></div>
           </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    user : state.user.userDetail,
    submitBankDetailsRet:state.user.submitBankDetailsRet
  })
  export default connect(mapStateToProps, {bankDetails, submitBankDetailsClr})(ManagePaymentComponent)

