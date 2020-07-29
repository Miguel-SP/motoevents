import React, { Component } from 'react'

import UserService from './../../../service/UserService'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import { Link } from 'react-router-dom'
import './profile.css'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: undefined,
            showModal: false,
        }

        this.UserService = new UserService()
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        this.UserService
            .getProfile(id)
            .then(response => {
                this.setState({ profile: response.data })
                console.log(response.data)
            })
            
            .catch(err => console.log(err))

    }

    handleModal = status => this.setState({ showModal: status })


    render() {
        
        return (

            !this.state.profile ? <h3>Cargando...</h3> :


                (<Container as='main'>

                    <h1>¡Hola, {this.props.loggedInUser.username}!</h1>
                    <div className="edit-btn-div">
                        <Link className="create-btn btn btn-primary" to={`/profile/edit/${this.props.loggedInUser._id}`}>Editar mi perfil</Link>
                    </div>
                    
                    <Row>

                        <Col md={{ span: 5, offset: 1 }}>
                            <h3>Mi moto</h3>

                            <img className="usermotorbike-img" src={this.state.profile.userMotorbike.image_url} alt="userMotorbike" />
                            <p>{this.state.profile.userMotorbike.brand} {this.state.profile.userMotorbike.model}</p>

                        </Col>

                        <Col md={{ span: 2 }}>
                            <h3>Mis amigos</h3>

                            <ListGroup>
                                {this.state.profile.friends.map(friend =>
                                    <Link to={`/profile/public/${friend._id}`}><ListGroup.Item key={friend.id}>{friend.username}</ListGroup.Item></Link>)}
                            </ListGroup>
                        </Col>

                    </Row>
                    <h3>Eventos a los que voy</h3>
                    <Row className="aaa">

                        {this.state.profile.events.map(event =>
                            <Col className="events-col" md={{ span: 3, offset: 1 }}>
                            <Link to={`/eventDetails/${event._id}`}>
                                <Card border="light" className="event-card" >                                              
                                    <Card.Img variant="top" className="event-img" src={event.image_url} alt={event.name} />
                                    <Card.Title>{event.name}</Card.Title>
                                </Card>
                            </Link>
                            </Col>)}
                            
                    </Row>

                </Container>)

        )
    }

}

export default Profile