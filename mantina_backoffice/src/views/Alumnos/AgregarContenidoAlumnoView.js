import React , { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';

import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@mui/icons-material/Add";

import PropTypes from "prop-types";

const useStyle = makeStyles()(() => ({
    addButton: {marginTop: '1.6em'}
}));

const AgregarContenidoAlumno = (props) => {
  const { classes: style } = useStyle();
  const { name_pdf,text_pdf ,id_studenttopic, id_studentcontent } = props;

  const handleClickOpen = (e) => {
    window.location.href = "/agregarContenidoAlumno/" + id_studenttopic ;
  };

    return (
        <div >
            <GridItem xs={12} sm={12} md={1}>
                <Button onClick={handleClickOpen} className={style.addButton} justIcon="true" size="lg" color="danger" round><AddIcon /> </Button>
            </GridItem>
        </div>
    );
};

AgregarContenidoAlumno.propTypes = {
  name: PropTypes.string,
  id_studentcontent: PropTypes.string
};

export default AgregarContenidoAlumno;