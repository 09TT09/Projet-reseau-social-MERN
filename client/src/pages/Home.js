import React, { useContext, useEffect } from 'react';
import Switch from '../components/Log';
import { UidContext } from '../components/AppContext';
import UpdateHome from '../components/home/UpdateHome';


const Home = () => {
    const uid = useContext(UidContext);
    //const uid = UidContext;
    //console.log(uid)

    return (
        <div className="background">
            {uid ? (<UpdateHome />) : (<Switch login={true} signup={false} />)}
        </div>
    );
};

export default Home;