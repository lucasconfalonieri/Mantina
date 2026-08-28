import React, {Component} from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import Materia from 'views/Materias/Materia.js';
import AgregarMateria from 'views/Materias/AgregarMateria.js';
import { getMaterias } from '../../utils/api';

class Materias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materiasArray: [],
      loading: true,
    };
  }

  componentDidMount() {
    getMaterias()
    .then(json => {
        const materias = [];
        json.data.subjects.forEach(result => {
            materias.push(result);
        });

        materias.push("agregar");

        return materias;
    })
    .then(allMaterias => {
        this.setState({
            materiasArray: allMaterias,
            loading: false,
        });
    })
    .catch(error => {
        // do something with the error (report it, etc.)
    });
  }

  renderMaterias = () => {
    const { materiasArray } = this.state;

    return materiasArray.map(materia => {
      const { name, id_subject } = materia;

        if(materia != "agregar") {
          return (
            <Materia
              name={name}
              id_subject={id_subject}
            />
          );
      } else {
          return(
            <AgregarMateria
                name = {this.props.name}
                id_subject = {this.props.id_subject}
            />
          )}
    });
  }

  render() {
    const { loading } = this.state;

    return (

      <GridContainer>
        {loading ? 'Cargando las materias...' : this.renderMaterias()}
      </GridContainer>
      
    );
  }
}

export default Materias;

