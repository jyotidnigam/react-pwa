import React, { useState } from 'react';
import { Card, Container, Form, Col, Button } from 'react-bootstrap';

import { useAuthDispatch, useAuthState } from '../../Context';
import { gameUploadService } from '../../services/gameService';


const Builder = (props) => {

    const [ selectedFile, setSelectedFile] = useState(null);
    const [ gameName, setGameName] = useState('');
    const { userDetails } = useAuthState();

    const handleFileUpload = (event) => {
        console.log(event.target.files[0])
        let file = event.target.files[0];
        if (['application/json', 'json'].includes(file.type))  {
            setSelectedFile(event.target.files[0])
        }  else {
            event.target.value = null;
            alert('File not supported, please upload a json file')
        }
    }

    const handleChange = (e) => {
        setGameName(e.target.value);
    }

    const onUploadHandler = async() => {
        const data = new FormData() 
        data.append('file', selectedFile);
        data.append('user', userDetails._id )
        data.append('gameName', gameName )
        await gameUploadService(data);
    }

    return <div className="mt-5">
       <Container>
           <Card>
               <Card.Body className="text-md-center">
               <Form.Group className="row">
                  <Form.Label className="col-sm-4 col-lg-3">
                      Game Name:
                      </Form.Label>
                  <Col sm={8} lg={9}>
                    <Form.Control
                      type="text"
                      name="file"
                      required
                      value={gameName}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="row">
                  <Form.Label className="col-sm-4 col-lg-3">
                      Select File:
                      </Form.Label>
                  <Col sm={8} lg={9}>
                    <Form.Control
                      type="file"
                      name="file"
                      required
                      onChange={handleFileUpload}
                    />
                  </Col>
                </Form.Group>
               <Form.Group className="row text-left">
                   <Col sm={4} lg={3}></Col>
                   <Col sm={8} lg={9}> 
                   <Button onClick={onUploadHandler}>Upload</Button>
                   </Col>
               </Form.Group>
               </Card.Body>
           </Card>
       </Container>
    </div>

}

export default Builder;