import React, { Component } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import Tema from 'views/Temas/Tema.js';
import AgregarTema from 'views/Temas/AgregarTema.js';
import { getTemasByMateria } from '../../utils/api';
import * as ServerErrorCode from '../../utils/ServerErrorCode.js';

class Temas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_subject_selected: props.id_subject_selected,
      temasArray: [],
      materia: "",
      loading: true,
    };
  }

  componentDidMount() {
    const id_selected = this.state.id_subject_selected;
    getTemasByMateria(id_selected)

    .then((response) => {
        const temasAux = response.data.topics;
        temasAux.push("agregar");

        this.setState({
            temasArray: temasAux,
            materia: response.data.subjectName,
            loading: false,
        });
    })
    .catch(error => {

    });
  }

  renderTemas = () => {
    const { temasArray, id_subject_selected } = this.state;

    return temasArray.map(tema => {
      const { name, id_topic } = tema;

      if(tema != "agregar") {
        return (
            <Tema
                name = {name}
                id_subject = {id_subject_selected}
                id_topic = {id_topic}
            />
        );
      } else {

        return (
            <AgregarTema
                name = {this.props.name}
                id_subject = {id_subject_selected}
                id_topic = {this.props.id_topic}
            />
        );
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { materia } = this.state;

    return (
        <div>
            <h2>Temas relacionados a {materia} </h2>

            <GridContainer>
                {loading ? 'Cargando los temas...' : this.renderTemas()}
            </GridContainer>
        </div>
    );
  }
}
export default Temas;