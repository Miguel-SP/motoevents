import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import { Redirect } from 'react-router-dom'



const Profile = props => {

    return (
        props.loggedInUser ?
            
        (<Container as='main'>
            <h1>¡Hola, {props.loggedInUser.username}!</h1>

            <Row>
                <Col>
                    <p>Eventos a los que voy</p>
                    <ListGroup>
                        {props.loggedInUser.events.map(event => (
                            <ListGroup.Item key={event}>{event.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <p>Mi moto</p>
                    <p>Modal con gráfico de nivo.rocks</p>
                    {props.loggedInUser.motorbike}
                </Col>
                <Col>
                    <p>Editar mi perfil</p>
                </Col>
            </Row>

        </Container>
                
        ) : <Redirect to='/login' />

    )
}


export default Profile