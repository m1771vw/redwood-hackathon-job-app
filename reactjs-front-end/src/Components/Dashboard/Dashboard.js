import React, { Component } from 'react';
import { array } from 'prop-types'
import { connect } from 'react-redux';
import { getAllJobs, deleteJob, editJob, getStatusHistoryById, getContactById } from '../../Redux/actions/';
import Navbar from '../Navbar';
import HomeNavbar from '../HomeNavbar';
import { Redirect } from 'react-router-dom';

// let testData = [
//     {
//         "job_id": 1,
//         "position": "Junior programmer",
//         "company": "Apple",
//         "salary": "100,000",
//         "contact_id": 1,
//         "url": "indeed/apple.com",
//         "site_id": 1,
//         "notes": "Junior level programmer with great benefits",
//         "contact": {
//             "contact_id": 1,
//             "name": "Recruiter Nguyen",
//             "email": "recruiterenguyen@yahoo.com",
//             "phone": "714-909-0098"
//         },
//         "site": {
//             "site_id": 1,
//             "name": "Indeed"
//         }
//     }
// ]


class Dashboard extends Component {
    state = {
        editClicked: false,
        historyClicked: false,
        contactClicked: false
    }
    _deleteJob = (id, index) => {
        console.log("Trying to delete index: ", index);
        this.props.deleteJob(id, index);
        // this.fetchAllJobs();
    }
    _editJob = (id, index) => {
        this.props.editJob(id, index);
        this.setState({
            editClicked: true
        })
    }
    _contactClicked = (id) => {
        this.props.getContactById(id);
        this.setState({
            contactClicked: true,
            historyClicked:false,

        })
    }
    _historyClicked = (id) => {
        this.props.getStatusHistoryById(id);
        this.setState({
            historyClicked:true,
            contactClicked: false
        })
    }
    componentDidMount() {
        this.fetchAllJobs();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.userToken !== this.props.userToken) {
            console.log("Component did update");
            console.log("Authorization: ", this.props.authorized);
            this.fetchAllJobs();
        }
    }
    fetchAllJobs = () => {
        console.log("Dashboard:", this.props.userToken);
        this.props.getAllJobs(this.props.userToken);
    }

    render() {
        this.props.statusHistory && console.log("Rendered status history", this.props.statusHistory)
    return (
        <div>
            {this.state.editClicked ? <Redirect to='/editjob'/> :
                this.props.authorized ? 
        <div>
            <Navbar title="Dashboard"/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Salary</th>
                        <th>Contact</th>
                        <th>Url</th>
                        <th>Site</th>
                        {/* <th>Status</th> */}
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {/* type: array< object { email, username, password } > */}
                    { this.props.jobs.map((item, index) => {
                        let jobStatusHistory = this.props.allStatusHistory.filter(x => x.job_id === item.job_id)
                        console.log("Job status history: ", jobStatusHistory);
                        return (

                            <tr key={index}>
                                <td>{item.job_id}</td>
                                <td>{item.position}</td>
                                <td>{item.company}</td>
                                <td>{item.salary}</td>
                                <td onClick={() => this._contactClicked(item.contact.contact_id)}>{item.contact.name}</td>
                                <td><a href={item.url}>{item.url}</a></td>
                                <td>{item.site.name}</td>
                                {/* <td>{jobStatusHistory && jobStatusHistory[jobStatusHistory.length-1].statusType.status_type}</td> */}
                                <td>{item.notes}</td>
                                <td><button className="btn btn-warning" onClick={() => { this._editJob(item.job_id, index) }} >Edit</button></td>
                                <td><button className="btn btn-info" onClick={() => { this._historyClicked(item.job_id) }} >History</button></td>
                                <td><button className="btn btn-danger" onClick={() => { this._deleteJob(item.job_id, index) }} >Delete</button></td>
                            </tr>
                        )
                    })}
             </tbody>
            </table>
            {this.state.contactClicked &&
                <div>
                    <h1>CONTACT INFO</h1>
                    <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>   
                    </tr>
                </thead>
                <tbody>
                <tr>
                <td>{this.props.contact.name}</td>
                <td>{this.props.contact.email}</td>
                <td>{this.props.contact.phone}</td>

                </tr>
                </tbody>
                    </table>
                </div>
            
            }
            {this.state.historyClicked &&
                <div>
                    <h1>HISTORY</h1>
                    <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th> 
                    </tr>
                </thead>
                <tbody>
             
                {   
                    this.props.statusHistory !== [] && this.props.statusHistory.map((item, index) => {
                        
                        return(
                            <tr key={index + item}>
                            <td>{item.date}</td>
                            <td>{item.statusType && item.statusType.status_type}</td>
                             </tr>

                        )
                    })
                }
       

                </tbody>
                    </table>
                </div>
            
            }
        </div>
            :
            <div>
            <HomeNavbar title="Job Tracker"/>
            <h1>YOU ARE NOT AUTHORIZED.PLEASE LOG IN.</h1>
            </div>

    
    }
    
        </div>

                
);}
}

Dashboard.propTypes = {
    dashboard: array
}
const mapPropsToDispatch = dispatch => ({
    getAllJobs: (userToken) => { dispatch(getAllJobs(userToken)) },
    deleteJob: (id, index) => { dispatch(deleteJob(id, index))},
    editJob: (id, index) => { dispatch(editJob(id, index))},
    getContactById: (id) => { dispatch(getContactById(id))},
    getStatusHistoryById: (id) => {dispatch(getStatusHistoryById(id))}
  });

  const mapStateToProps = state => ({
    jobs: state.jobs,
    contact: state.contact,
    statusHistory: state.statusHistory,
    authorized: state.authorized,
    userToken: state.userToken,
    allStatusHistory: state.allStatusHistory
  });
export default connect(mapStateToProps, mapPropsToDispatch)(Dashboard);