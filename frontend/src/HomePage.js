// component that gives options for scan domains or virtual machines with nmap
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal, Form, Col,Container,Tabs,Tab ,Row,} from 'react-bootstrap';
import MyDocument from './Document'
export default function HomePage()
{

    const [uploadScript, setUploadScript] = useState(false);
    const [networkDiscovery, setNetworkDiscovery] = useState(false);
    const [backdoorDetection, setBackdoorDetection] = useState(false);
    const [vulnerabilityScan, setVulnerabilityScan] = useState(false);

    const [output, setOutput] = useState('');

    const sendScan=()=>{
        let listOfScans=[]
        if(uploadScript){
            listOfScans.push("uploadScript")
        }
        if(networkDiscovery){
            listOfScans.push("networkDiscovery")
        }
        if(backdoorDetection){
            listOfScans.push("backdoorDetection")
        }
        if(vulnerabilityScan){
            listOfScans.push("vulnerabilityScan")
        }
        console.log(listOfScans)
        axios.post("http://localhost:3000/scan",{listOfScans}).then(res=>{
            console.log(res.data)
            setOutput(res.data)
        }).catch(err=>{
            console.log(err)
        });
    }


    return <Container style={{marginTop:70}}>
        <h1>Home Page</h1>
        <br></br>
        <br></br>
        {/* make a tab selection with menu on left */}
        <Tabs defaultActiveKey="scan" id="uncontrolled-tab-example">    
            <Tab eventKey="scan" title="NMAP">
                <Container>
                    <Row>
                        <Col md="auto" style={{margin:20,fontSize:30,textAlign:"start"}}>
                {/* make check box selection for types of scannig*/}
                <Form.Group controlId="formBasicCheckbox" >
                    <Form.Check type="checkbox" label="Upload script"  onChange={(e)=>{
                        setUploadScript(e.target.checked);
                     
                    }}/>
                    <Form.Check type="checkbox" label="Network discovery"  onChange={(e)=>{
                        setNetworkDiscovery(e.target.checked);
                         
                    }}/>
                    <Form.Check type="checkbox" label="Backdoor detection" 
                    onChange={(e)=>{
                        setBackdoorDetection(e.target.checked);
                    }}
                    />
                    <Form.Check type="checkbox" label="Vulnerability detection" 
                    onChange={(e)=>{
                        setVulnerabilityScan(e.target.checked);
                    }}
                    />
                    
                </Form.Group>
                </Col>
                <Col>
                </Col>
                </Row>
                </Container>
            </Tab>
            <Tab eventKey="vm" title="NIKTO">
            <h3>Hello2</h3>
            </Tab>
            <Tab eventKey="vm" title="OpenVAS">
            <h3>Hello2</h3>
            </Tab>

        </Tabs>
        
        <Row>
            <Col>
                    <Button onClick={(e)=>{
                        sendScan()
                    }}>
                        Scan
                    </Button>
            </Col>
        {
            output?
        <Col md="auto" style={{margin:20,fontSize:30,textAlign:"start"}}>
                    <a href={'http://localhost:3000/'+output} target="_blank">
                    <Button>
                            Get report
                </Button></a>
        </Col>:
        <></>
    }       
        </Row>

    
    </Container>
}