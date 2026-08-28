import React from 'react';
import TemasAlumnos from 'views/Alumnos/TemasAlumnos.js';


export default function AlumnosPagina({location}) {
       const { state = {} } = location;

      return (
        <div>
            <h2>
                Temas Alumnos
            </h2>

            <TemasAlumnos />
        </div>
      );
}
