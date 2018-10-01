import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Postfeed from "../../components/Postfeed/Postfeed";
import UserPic from "../../components/UserPic/UserPic";
import UserInfo from "../../components/UserInfo/UserInfo";
import NewPost from "../../components/NewPost/NewPost";
import UserAPI from "../../utils/userAPI";


class Profile extends Component {
  state = {
    user: {},
    id:"",
    pic: "",
    linkedin:"",
    portfolio:"",
    projects:[],
    languages:[],
    technologies:[],
    jobTitle: "",
    jobCompany: ""
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    if (params.id) {
      this.getUserData(params.id)
    } else {
      this.getUserData()
    }
  };

  getUserData = (id) => {
    if (!id === undefined) {
   UserAPI.getUser().then(data => {
      if (data.data.success === false) {
        window.location.replace("/login");
      };
      this.setState({
        user: data.data,
        id: data.data._id,
        pic: data.data.profile.pic,
        github: data.data.profile.github,
        linkedin: data.data.profile.linkedin,
        portfolio: data.data.profile.portfolio,
        projects: data.data.profile.projects,
        languages: data.data.profile.languages,
        technologies: data.data.profile.technologies,
        jobTitle: data.data.profile.jobInfo ? data.data.profile.jobInfo.title : "Job Title",
        jobCompany: data.data.profile.jobInfo ? data.data.profile.jobInfo.company : "Job Company"
        }, () => console.log(this.state.pic));
    }).catch(err => {
      console.log(err);
    });
  } else {
       UserAPI.getUserById(id).then(data => {
      this.setState({
        user: data.data,
        id: data.data._id,
        pic: data.data.profile.pic,
        github: data.data.profile.github,
        linkedin: data.data.profile.linkedin,
        portfolio: data.data.profile.portfolio,
        projects: data.data.profile.projects,
        languages: data.data.profile.languages,
        technologies: data.data.profile.technologies,
        jobTitle: data.data.profile.jobInfo ? data.data.profile.jobInfo.title : "Job Title",
        jobCompany: data.data.profile.jobInfo ? data.data.profile.jobInfo.company : "Job Company"
        }, () => console.log(this.state.pic));
    }).catch(err => {
      console.log(err);
    });
  };
  



    }


 

  render() {
    
    return (
    <Container>
        <Row>
          <Col size="md-4">
            <UserPic 
              pic={this.state.pic} 
              fullName={this.state.user.fullName} />
            <UserInfo 
              id={this.state.id}
              title={this.state.jobTitle}
              company={this.state.jobCompany}
              languages={this.state.languages}
              github={this.state.github}
              linkedin={this.state.linkedin}
              portfolio={this.state.portfolio}
              projects={this.state.projects}
              technologies={this.state.technologies}
               />
          </Col>
          <Col size="md-8">
            
              <NewPost/>
              <Postfeed />
            
          </Col>
         
        </Row>
    </Container>
    )
  }
}

export default Profile;
