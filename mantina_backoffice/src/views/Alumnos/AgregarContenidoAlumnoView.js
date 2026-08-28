import React , { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@material-ui/icons/Add";

import PropTypes from "prop-types";

const useStyle = makeStyles(() => ({
    addButton: {marginTop: '1.6em'}
}));

const AgregarContenidoAlumno = (props) => {
  const style = useStyle();
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