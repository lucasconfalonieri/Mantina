import React , { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';

import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@mui/icons-material/Add";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import PropTypes from "prop-types";

const useTemaAlumnoStyle = makeStyles()(() => ({
    addButton: {marginTop: '1.6em'}
}));

const AgregarTemaAlumno = (props) => {
  const { classes: temaAlumnoStyle } = useTemaAlumnoStyle();
  const { name, id_studenttopic} = props;

  const handleClickOpen = (e) => {
      window.location.href = "/agregarTemaAlumno";
  };

    return (
        <div >
            <GridItem xs={12} sm={12} md={1}>
                <Button onClick={handleClickOpen} className={temaAlumnoStyle.addButton} justIcon="true" size="lg" color="danger" round><AddIcon /> </Button>
            </GridItem>
        </div>
    );
};

AgregarTemaAlumno.propTypes = {
  name: PropTypes.string,
  id_studenttopic: PropTypes.string
};

export default AgregarTemaAlumno;