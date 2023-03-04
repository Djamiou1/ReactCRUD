import React, { useState } from 'react';
import { Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Create() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const postData = async () => {
       
          try {
            axios.post(          // any call like get
              "http://localhost:8000/api/produit",         // your URL
              {                                     // data if post, put
                firstName,
                lastName,
                checkbox,
              }
            )
            .then(res => { console.log('Ajouté avec succès'); });
          } catch (error) {
            console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
          }
        
}

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input type="text" placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' type="text" onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Link className="btn btn-primary" to="/" onClick={postData} type='submit'>Submit</Link>
            </Form>
        </div>
    )
}