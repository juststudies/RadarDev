import React, {useState, useEffect} from 'react';
import api from '../api';
import './styles.css';


function DevUpdate(props){
    const initialState = {name:'', bio: '', techs:[], latitude: '', longitude: ''}
    const [dev, setDev] = useState(initialState);
    useEffect(()=>{
        async function getDev(){
            try{
                const response = await api.get(`/devs/${props.match.params._id}`);
                setDev(response.data);
            }catch(err){
                console.log(err);
            }
        }
        getDev();        
    }, [props]);

    function handleSubmit(e){
        e.preventDefault();
        async function devUpdate(){
            try{    
                const response = await api.put(`/devs/update/${dev._id}`, dev);
                setDev(response.data);
                props.history.push(`/devs/${dev._id}`);
            }catch(err){
                console.log(err);
            }
        }
        devUpdate();
    }

    function handleChange(e){
        setDev({...dev, [e.target.name]: e.target.value});
    }

    function handleCancel(){
        props.history.push(`/devs/${dev._id}`);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>

                <label>Nome</label>
                <input type="text" name="name" value={dev.name} onChange={handleChange} required/>

                <label>Biografia</label>
                <input type="text" name="bio" value={dev.bio} onChange={handleChange} required/>

                <label>Tecnologias</label>
                <input type="text" name="techs" value={dev.techs} onChange={handleChange} required/>

                <label>Latitude</label>
                <input type="text" name="latitude" value={dev.latitude} onChange={handleChange} required/>

                <label>Longitude</label>
                <input type="text" name="longitude" value={dev.longitude} onChange={handleChange} required/>

                <button type="submit" className="update">Update</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default DevUpdate;