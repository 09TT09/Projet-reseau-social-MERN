import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import relations from "../../styles/components/user-icon.svg";
import groups from "../../styles/components/group-icon.svg";
import params from "../../styles/components/params-icon.svg";
import layout from "../../styles/components/layout-icon.svg";
import construction from "../../styles/components/construction-icon.svg";
import Logout from "../Log/logout";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="pages_home_container">

                <div className="pages_home_relations pages_home_app">
                    <div className="pages_home_div_logo">
                        <img src={relations} width="60" height="60" alt="éther webapp" className="parts_navbar_img_logo"/>
                    </div>
                    <div className="pages_home_div_text">
                        <p className="pages_home_div_p"><span className="MajGrand20">R</span>ELATIONS</p>
                    </div>
                </div>

                <div className="pages_home_groups pages_home_app">
                    <div className="pages_home_div_logo">
                        <img src={groups} width="60" height="60" alt="éther webapp" className="parts_navbar_img_logo"/>
                    </div>
                    <div className="pages_home_div_text">
                        <p className="pages_home_div_p"><span className="MajGrand20">G</span>ROUPES</p>
                    </div>
                </div>

                <div className="pages_home_parameters pages_home_app">
                    <div className="pages_home_div_logo">
                        <img src={params} width="60" height="60" alt="éther webapp" className="parts_navbar_img_logo"/>
                    </div>
                    <div className="pages_home_div_text">
                        <p className="pages_home_div_p"><span className="MajGrand20">P</span>ARAMÈTRES</p>
                    </div>
                </div>

                

                <div className="pages_home_layout pages_home_app">
                    <div className="pages_home_div_logo">
                        <img src={layout} width="60" height="60" alt="éther webapp" className="parts_navbar_img_logo"/>
                    </div>
                    <div className="pages_home_div_text">
                        <p className="pages_home_div_p"><span className="MajGrand20">A</span>GENCEMENT</p>
                    </div>
                </div>

                <div className="pages_home_app">
                    <div className="pages_home_div_logo">
                        <img src={construction} width="60" height="60" alt="éther webapp" className="parts_navbar_img_logo"/>
                    </div>
                    <div className="pages_home_div_text">
                        <p className="pages_home_div_p"><span className="MajGrand20">M</span>AINTENANCE</p>
                    </div>
                </div>

                <Logout />
            </div>
        </div>
    );
};

export default Home;