import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../services/helper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAsync, getContactsAsync, singleContactAsync } from '../../services/action/action';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';

const Home = () => {
    const { contact , contacts } = useSelector(state => state.Reducer);
 
    const [recid, setRecId] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(contacts, "pokemon");

    const handleEdit = () => {
        console.log("dinosaur");
        dispatch(singleContactAsync(contact));
    }

    const handleDelete = (id) => {
        dispatch(deleteContactAsync(id));
    };


    // useEffect(() => {
    //     if (contact) {
    //         navigate(`/edit/${recid}`);
    //     }
    // }, [contact, navigate, recid]);

    useEffect(() => {
        dispatch(getContactsAsync());
        console.log("jenu");
    }, [dispatch]);

    return (
        <>
            <Sidebar />
            <Container className="mt-5 mr-5">
                <Row>
                  
                        {/* Table */}
                        <h3 className='text-center pb-5 fw-bold text-dark'>Contact Management</h3>

                        <table class="table text-center">
                            <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                

                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td><img src={contact.avatar} alt={contact.name} className="profile" /></td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.ph}</td>
                                    <td>{contact.Add}</td>
                                    <td>{contact.nots}</td>
                                    <td>
                                        <button type='button' className='btn btn-primary' onClick={handleEdit()}> edit</button>
                                        {/* <Button className='me-2 btn' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                            </svg>
                                        </Button>
                                        <Button className='btnsecond' onClick={(id)=>{handleDelete}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                        </Button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                            
                        </table>

                </Row>
            </Container>
        </>
    );
};

export default Home;
