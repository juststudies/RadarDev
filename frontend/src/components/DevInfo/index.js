import React, {useEffect, useState} from 'react';
import api from '../api';
import {Link} from 'react-router-dom';

import './styles.css';

function DevInfo(props){
    const [dev, setDev] = useState({});

    useEffect(()=>{
        async function getDev(){
            try{
                const response = await api.get(`/devs/${props.match.params._id}`)
                setDev(response.data);
            }catch(err){
                console.log(err);
            }
        }
        getDev();
    }, [props]);

    async function handleDeleteDev(){
        const response = await api.delete(`/devs/delete/${props.match.params._id}`);    
        setDev(response.data);
        props.history.push('/');
    } 

    function handleCancel(){
        props.history.push('/');
    }

    return(
        <li className="dev-item">
            <header>           
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                <strong>{dev.name}</strong>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            <div className="button-group">
                <button type="submit" onClick={handleDeleteDev} className="button Delete">Delete</button>
                <Link to={`/devs/update/${dev._id}`}><button type="button" className="button Edit">Edit</button></Link>
                <button type="button" onClick={handleCancel} className="button Cancel">Cancelar</button>
            </div>
            
        </li>
    )
}

export default DevInfo;
