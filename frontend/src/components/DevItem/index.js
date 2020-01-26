import React from 'react';

import './styles.css'
import { Link } from 'react-router-dom';

function DevItem({dev}){    
    return(
       
        <li className="dev-item">
            <header>           
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                <Link to={`/devs/${dev._id}`} >
                    <strong>{dev.name}</strong>
                </Link>
                <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            
            
        </li>
            
       
    )
}

export default DevItem;