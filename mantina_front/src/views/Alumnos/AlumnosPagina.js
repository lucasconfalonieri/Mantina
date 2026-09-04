import React from 'react';
import StudentTopics from 'views/Alumnos/StudentTopics.js';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";

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