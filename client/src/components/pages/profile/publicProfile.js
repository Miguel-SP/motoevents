import React, { Component } from 'react'
import './profile.css'

import UserService from './../../../service/UserService'

import Radar from './../../UI/RadarGraphic'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import Modal from 'react-bootstrap/esm/Modal'
import { Link } from 'react-router-dom'
import Spinner from '../../UI/Spinner'


class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: undefined,
            showModal: false,
        }

        this.UserService = new UserService()
    }

    componentDidMount = () => {

        this.UserService
            .getProfile(this.props.match.params.id)
            .then(response => {
                this.setState({ profile: response.data })
            })
            .catch(err => console.log(err))

    }

    handleModal = status => this.setState({ showModal: status })

    addFriend = () => {
        const id = this.props.match.params.id
        this.UserService
            .addFriend(id)
            .then(() => this.props.handleToast("Amigo añadido"))
            .catch(err => console.log(err))
    }

    render() {
        return (

            !this.state.profile ? <Spinner/> :


                (<Container as='main'>
                    
                    <Row>
                    <Col xs={{span: 4, offset: 1}}>
                    <h1>Perfil de {this.state.profile.username}</h1>
                    </Col>
                    <Col xs={{span: 3, offset: 4}}>
                    {this.props.loggedInUser.friends.some(friend => friend === this.state.profile._id) ? <h3 className="edit-btn-div">Sois amigos</h3> :
                        (<div className="edit-btn-div">
                            <Link className="create-btn btn btn-primary" onClick={() => this.addFriend()}>Añadir a amigos</Link>
                        </div>)}
                    </Col>
                    </Row>
                    <Row>

                        <Col md={{span:6}} md={{order: 2}}>
                        <h3>Comparar mi moto con la de {this.state.profile.username}</h3>
                        
                        <Col md={{ span: 7, offset: 2 }} className="card-motorbike">
                        
                            <Link onClick={() => this.handleModal(true)}><img className="usermotorbike-img" src={this.state.profile.userMotorbike.image_url} alt="userMotorbike" /></Link>

                            <p>{this.state.profile.userMotorbike.brand} {this.state.profile.userMotorbike.model}</p>

                            <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                <Modal.Body>
                                    <Radar {...this.props} />
                                </Modal.Body>
                            </Modal>

                        </Col>
                        </Col>

                        <Col md={{span:6}} md={{order: 1}} >
                        <h3>Eventos a los que está apuntado</h3>
                        
                        <Col className="events-col" md={{ span: 6, offset: 3 }}>

                            <ListGroup>
                                {this.state.profile.events.map(event =>
                                    <Link to={`/eventDetails/${event._id}`}>
                                        <ListGroup.Item key={event._id} className="transparent">
                                            <Col xs={{span: 12}} >
                                                <img src={event.image_url} alt={event.name} className="event-img" />
                                                <p>{event.name}</p>
                                            </Col>
                                        </ListGroup.Item>
                                    </Link>)}
                            </ListGroup>

                        </Col>
                        </Col>

                    </Row>
                </Container>)

        )
    }

}

export default PublicProfile