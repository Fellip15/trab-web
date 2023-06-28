import React, { useEffect, useRef, useState } from 'react';
import {redirect, useNavigate, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import "./User.css";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Message from '../../Components/Message'

import users from '../../data/users.json';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { baseURL } from '../../config';

const User = ({}) => {
    const navigate = useNavigate()

    const [cookies, setCookies, removeCookies] = useCookies(["user"]);

    const [ idUser, setIdUser ] = useState(undefined);
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ endStreet, setEndStreet ] = useState("");
    const [ endNum, setEndNum ] = useState("");
    const [ endCEP, setEndCEP ] = useState("");
    const [ endNeighborhood, setEndNeighborhood ] = useState("");
    const [ srcImage, setSrcImage ] = useState("/img/defaultProfile.png");
    
    const setUser = (user) => {
        console.log("Settando o usuário")
        console.log(user);
        setIdUser(user._id);
        setName(user.name);
        setEmail(user.email);
        setEndStreet(user.end_street);
        setEndNum(user.end_num);
        setEndCEP(user.end_cep);
        setEndNeighborhood(user.end_neighborhood);
    };

    const handleChangeValueInput = (e, setValue) => {
        setValue(e.target.value);
    };
    
    useEffect(() => {
        async function fetchAndSetUser() {
            const user = await authToken();
            if(user !== undefined) {
                setUser(user);
                axios.get(baseURL + "/image/user/" + user.image)
                .then((res) => {
                    setSrcImage(baseURL + "/" + res.data.image.src);
                })
                .catch((e) => {
                    console.log(e)
                    toast.info(e.response.data.message);
                });
            }

        }

        fetchAndSetUser();
    }, []);

    const refOldPassword = useRef(null);
    const refNewPassword = useRef(null);
    const refConfNewPassword = useRef(null);

    const authToken = async () => {
        let user = undefined;
        await axios.post(baseURL + "/users/token", {
            token: cookies.user
        })
        .then((res) => {
            console.log(res.data.user);
            user = res.data.user;
        })
        .catch((e) => {
            removeCookies("user");
            navigate("/login", { state: { 
                errorMessage: e.response.data.message
            }});
        });

        return user;
    };
    
    const changePassword = async () => {
        const valOldPassword = refOldPassword.current.value;
        const valNewPassword = refNewPassword.current.value;
        const valConfNewPassword = refConfNewPassword.current.value;
        
        const user = await authToken();

        if(user !== undefined) {
            await axios.put(baseURL + "/users/" + user._id, {
                userName: user.name,
                name: user.name,
                email: user.email,
                password: valNewPassword
            })
            .then((res) => {
                console.log(res);
                toast.success("Senha atualizada com sucesso!");
            })
            .catch((e) => {
                console.log(e.response)
                toast.error(e.response.data.message + " Erro: " + e.response.data.error.message);
            });
        }
    };

    const saveEnd = async () => {
        const user = await authToken();

        if(user !== undefined) {
            await axios.request({
                method: "put",
                url: baseURL + "/usersEnd/" + user._id,
                data:{
                    street: endStreet,
                    num: endNum,
                    neighborhood: endNeighborhood,
                    cep: endCEP
                }
            })
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
            })
            .catch((e) => {
                console.log(e.response)
                toast.error(e.response.data.message + " Erro: " + e.response.data.error.message);
            });
        }
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const refInputFile = useRef(null);
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(refInputFile.current && refInputFile.current.value === "" || refInputFile.current.value === undefined || refInputFile.current.value === null) {
            toast.error("É necessário colocar uma imagem primeiro!");
            return;
        }

        if(refInputFile.current) {
            refInputFile.current.value = "";
        }

        const formData = new FormData();
        formData.append("name", "image" + name);
        formData.append("file", selectedFile);
        
        let imageStorage = undefined;
        // fazendo upload da imagem
        await axios({
            method: "post",
            url: baseURL + "/image/user",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((res) => {
            console.log(res.data);
            toast.success(res.data.message);
            imageStorage = res.data.image;
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
        });
        
        if(imageStorage !== undefined) {
            // se o upload foi bem sucedido
            // linkar ela com o user
            axios.put(baseURL + "/usersImage", {
                idUser: idUser,
                idImage: imageStorage._id
            })
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                setSrcImage(baseURL + "/" + res.data.image.src);
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data.message);
            })
        }
    }

    return (
        <>
        <Message/>
        <Header adjustPath={'../'}/>

        
        <div className='userInfo content'>
            <img className='avatar' src={srcImage} />
            <form onSubmit={handleSubmit}>
                <input ref={refInputFile} type="file" onChange={handleFileSelect}/>
                <input type="submit" value="Upload imagem" />
            </form>

            <div className='group-box'>
                <p className='bigtext'>Nome: {name}</p>
                <p className='bigtext'>Email: {email}</p>
            </div>

            <div className='group-box'>
                <h2>Endereco:</h2>
                <div className='street-line'>
                    <label>Rua:</label> 
                    <input className='user-input' type='text' defaultValue={endStreet} onChange={(e) => handleChangeValueInput(e, setEndStreet)}/>
                    <label>Numero:</label> 
                    <input className='user-input' type='text' defaultValue={endNum} onChange={(e) => handleChangeValueInput(e, setEndNum)}/>
                </div>

                <div className='street-line'>
                    <label>Bairro:</label> 
                    <input className='user-input' type='text' defaultValue={endNeighborhood} onChange={(e) => handleChangeValueInput(e, setEndNeighborhood)}/>
                    <label>Cep:</label> 
                    <input className='user-input' type='text' defaultValue={endCEP} onChange={(e) => handleChangeValueInput(e, setEndCEP)}/>
                </div>
                <button className='button-user' onClick={saveEnd}>Salvar</button>
            </div>

            <div className='group-box'>
                <h2>Alterar Senha:</h2>
                <div className='street-line'>
                    <label>Senha atual:</label> 
                    <input ref={refOldPassword} className='user-input password-input' type='password'></input>
                </div>
                <div className='street-line'>
                    <label>Nova senha:</label> 
                    <input ref={refNewPassword} className='user-input password-input' type='password'></input>
                </div>
                <div className='street-line'>
                    <label>Cnofirme nova senha:</label> 
                    <input ref={refConfNewPassword} className='user-input' type='password'></input>
                </div>
                <button className='button-user' onClick={changePassword}>Mudar senha</button>
            </div>
        </div>
        
        <Footer />
        </>
    );
};

export default User;