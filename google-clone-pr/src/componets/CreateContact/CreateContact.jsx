import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../services/helper';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAsync, uploadImg } from '../../services/action/action';
import './CreateContact.css';
import Sidebar from '../Sidebar/Sidebar';

const CreateContact = () => {
    const initialState = {
        id: '',
        avatar: '',
        name: '',
        email: '',
        ph: '',
        Add: '',
        nots: ''
    };

    const [inputState, setInputState] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [myContacts, setMyContacts] = useState(getData('contacts') || []);
    const isLoading = useSelector(state => state.Reducer.isloading);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({
            ...inputState,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContactAsync(inputState));
        setIsSubmit(true);
        setInputState(initialState);
    };

    useEffect(() => {
        if (isSubmit && !isLoading) {
            navigate('/');
        }
    }, [isSubmit, navigate, isLoading]);

    const handleImg = async (e) => {
        const file = e.target.files[0];
        setUploading(true);
        try {
            const url = await dispatch(uploadImg(file));
            setInputState(prevContact => ({ ...prevContact, avatar: url }));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        setUploading(false);
    };

    return (
        <>
        <Sidebar />
        <Container className="mt-5 custom-container justify-content-center d-flex ps-5">
            <Row className='ps-5'>
                <div className="form-card1 mt-5">
                    <div className="form-card2">

                        {/* <form className="form" onSubmit={handleSubmit}>
                            <p className="form-heading">Create Contact</p>

                            <div className="form-field">
                                <label htmlFor="avatar" className="form-label input-field">Avatar</label>
                                <input type="file" className="form-control" id="avatar" aria-describedby="avatarHelp" onChange={handleImg} />
                                
                                <div id="avatarHelp" className="form-text">Upload an image for your avatar.</div>
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Name"
                                    className="input-field"
                                    value={inputState.name}
                                    onChange={handleInput}
                                    name="name"
                                    type="text"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Email"
                                    className="input-field"
                                    value={inputState.email}
                                    onChange={handleInput}
                                    name="email"
                                    type="email"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Phone"
                                    className="input-field"
                                    value={inputState.ph}
                                    onChange={handleInput}
                                    name="ph"
                                    type="number"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Address"
                                    className="input-field"
                                    value={inputState.Add}
                                    onChange={handleInput}
                                    name="Add"
                                    type="text"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Notes"
                                    className="input-field"
                                    value={inputState.nots}
                                    onChange={handleInput}
                                    name="nots"
                                    type="text"
                                />
                            </div>

                            <button type="submit" className="sendMessage-btn mt-2">
                                {isLoading ? (
                                    <div className="spinner-grow" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>*/}

                        <form class="row g-3" onSubmit={handleSubmit}>

                        <div className="form-field">
                                <label htmlFor="avatar" className="form-label input-field">Avatar</label>
                                <input type="file" className="form-control" id="profile" aria-describedby="avatarHelp" onChange={handleImg} />
                                
                                <div id="avatarHelp" className="form-text">Upload an image for your avatar.</div>
                            </div>

                            {/* <div class="col-12">
                                <label for="inputAddress" class="form-label">Avatar</label>
                                <input type="file" class="form-control" id="profile"onChange={handleImg} />
                            </div> */}
                            <div class="col-12">
                                <label for="inputPassword4" class="form-label">Name</label>
                                <input type="text" class="form-control" value={inputState.name}
                                    onChange={handleInput}
                                    name="name"/>
                            </div>
                            <div class="col-12">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input type="email" class="form-control" value={inputState.email}
                                    onChange={handleInput}
                                    name="email"/>
                            </div>

                            <div class="col-12">
                                <label for="inputEmail4" class="form-label">Contact No</label>
                                <input type="number" class="form-control" value={inputState.ph}
                                    onChange={handleInput}
                                    name="ph"/>
                            </div>
                            
                            <div class="col-12">
                                <label for="inputAddress" class="form-label">Address</label>
                                <input type="text" class="form-control" placeholder="Current add" value={inputState.Add}
                                    onChange={handleInput}
                                    name="Add"/>
                            </div>

                            <div class="col-12">
                                <label for="inputAddress" class="form-label">Nots</label>
                                <textarea class="form-control" type="text" id="exampleFormControlTextarea1" rows="3" placeholder="Your Feedback"  value={inputState.nots}
                                    onChange={handleInput}
                                    name="nots"></textarea>
                            </div>
                            
                            <div>

                            <button type="submit" className="sendMessage-btn mt-2">
                                {isLoading ? (
                                    <div className="spinner-grow" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                            </div>
                        </form>


                    </div>
                </div>
            </Row>
        </Container>
        </>
    );
};

export default CreateContact;
