import React from 'react';
import StudentTopics from 'views/Alumnos/StudentTopics.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

import styles from "assets/css/material-dashboard-react.css";

export default function AlumnosPagina() {

    const logout = (e) => {
        localStorage.removeItem("token");
        window.location.replace("/");
    };


  return (
    <div>
        
        <h2 className="titleFormat" >
            TEMAS
        </h2>

        <StudentTopics />
    </div>
  );
}