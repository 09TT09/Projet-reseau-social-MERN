import React, { useContext } from 'react';
import Switch from '../components/Log';
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/profil/updateProfil';

const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className="background">
            {uid ? (<UpdateProfil />) :
            (<Switch login={true} signup={false} />)}
        </div>
    );
};

export default Profil;