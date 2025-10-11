import React from 'react';
import Materias from 'views/Materias/Materias.js';
import MateriasTreeView from 'views/Materias/MateriasTreeView.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

import styles from "assets/css/material-dashboard-react.css";

export default function MateriasPagina() {
    const [showTreeView, setShowTreeView] = React.useState(JSON.parse(localStorage.getItem("showTreeView")));
    const [icon, setIcon] = React.useState(localStorage.getItem("iconLayout"));

    const logout = (e) => {
        localStorage.removeItem("token");
        window.location.replace("/");
    };

    const handlerShowTreeView = (e) => {
        if(showTreeView == true) {
            setShowTreeView(false);
            localStorage.setItem("showTreeView", false);
        } else {
            setShowTreeView(true);
            localStorage.setItem("showTreeView", true);
        }

        if(showTreeView) {
            localStorage.setItem("iconLayout", "account_tree");
            setIcon("account_tree");
        } else {
            localStorage.setItem("iconLayout", "view_compact");
            setIcon("view_compact");
        }
    }

  return (
    <div>
        <Button color="secondary" onClick={handlerShowTreeView}><Icon>{icon}</Icon>CAMBIAR VISTA</Button>

        <h2 className="titleFormat" >
            MATERIAS
        </h2>

        {showTreeView ? <MateriasTreeView /> : <Materias />}
    </div>
  );
}
