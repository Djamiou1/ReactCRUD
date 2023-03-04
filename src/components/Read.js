import React, {useEffect, useState} from 'react';
import { Table } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Load } from '../styles/Load';

export default function Read() {
    const [isDataLoading, setDataLoading] = useState(false)
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        setDataLoading(true)
        axios.get(`http://localhost:8000/api/produit`)
            .then((response) => {
                setAPIData(response.data);
                setDataLoading(false)
            })
    }, [])

    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox);
     }

     const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/produit/${id}`)
        .then((response) => {
            getData();
        })
      }

      const getData = () => {
        axios.get(`http://localhost:8000/api/produit/`)
            .then((getData) => {
                 setAPIData(getData.data);
             })
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Link className="btn btn-primary" to="/create">Ajouter</Link>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>firstName</Table.HeaderCell>
                        <Table.HeaderCell>lastName</Table.HeaderCell>
                        <Table.HeaderCell>Verification</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>

                {isDataLoading ? (
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>
                                <Load />
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                          </Table.Row>
                        </Table.Body>
                    ) : (
                    <Table.Body>
                        {APIData.map((data) => {
                            return (
                            <Table.Row>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell> 
                                      <div className='btn btn-warning' onClick={() => setData(data)}>Update</div>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                <div className='btn btn-danger' onClick={() => onDelete(data.id)}>Delete</div>
                                </Table.Cell>
                             </Table.Row>
                        )})}
                    </Table.Body>
                    )}
            </Table>
        </div>
    )
}