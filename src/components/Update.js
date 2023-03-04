import React, { useState, useEffect } from 'react';
import { Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Update() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [id, setID] = useState(null);

    useEffect(() => {
            setID(localStorage.getItem('ID'));
            setFirstName(localStorage.getItem('First Name'));
            setLastName(localStorage.getItem('Last Name'));
            setCheckbox(localStorage.getItem('Checkbox Value'))
    }, []);
    const updateAPIData = () => {
        axios.put(`http://localhost:8000/api/produit/${id}`, {
            firstName,
             lastName,
             checkbox
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' checked={checkbox} onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Link to="/" className="btn btn-primary" type='submit' onClick={updateAPIData}>Update</Link>
            </Form>
        </div>
    )
}