import {Form,Row,Col,Button,Container,Modal} from 'react-bootstrap'
import {useState} from 'react'
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
// create a login page
const LoginPage = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // dispatch({type: 'LOGIN', payload: {username, password}});
        axios.post('http://localhost:3000/users/login', {username, password}).then(res => {
            console.log(res.data);
            if (res.data.error) {
                setError(res.data.error);
                setLoading(false);
            }
            else {
                if(res.data.username){
                dispatch({type: 'LOGIN', payload: {username, password}});
                setLoading(false);
                setShow(false);
                }
                else{
                    setError('Invalid username or password');
                    setLoading(false);
                }
            }
        }  ).catch(err => {
            setError(err);
            setLoading(false);
        });
    }
    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        axios.post('http://localhost:3000/users/register', {username, password}).then(res => {
            console.log(res.data);
            if (res.data.error) {
                setError(res.data.error);
                setLoading(false);
            }
            else {
                dispatch({type: 'LOGIN', payload: {username}});
                setLoading(false);
                setShow(false);
            }
        }  ).catch(err => {
            setError(err);
            setLoading(false);
        });
    }

    return (
        <Container style={{marginTop:100}}>
            <Row>
                <Col>
                    <h1>Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </Form>
                    <p>{error}</p>
                    <Button variant="primary" onClick={handleShow}>
                        Register
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleRegister} >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <br></br>
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? 'Loading...' : 'Register'}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    )
}
export default LoginPage;