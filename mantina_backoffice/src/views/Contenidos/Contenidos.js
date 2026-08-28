import React, { Component } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarContenido from 'views/Contenidos/AgregarContenido.js';
import Contenido from 'views/Contenidos/Contenido.js';
import { getContenidosByTema } from '../../utils/api';

class Contenidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_topic_selected: props.id_topic_selected,
      contenidosArray: [],
      tema: "",
      loading: true,
    };
  }

  componentDidMount() {
    const id_selected = this.state.id_topic_selected;
    getContenidosByTema(id_selected)

    .then((response) => {
        const contenidosAux = response.data.contentstopics;
        contenidosAux.push("agregar");

        this.setState({
            contenidosArray: contenidosAux,
            tema: response.data.topicName,
            loading: false,
        });
    })
    .catch(error => {

    });
  }


  renderContenidos = () => {
    const { contenidosArray, id_topic_selected } = this.state;

        return contenidosArray.map(contenido => {
          const { text_pdf, name_pdf, id_content_topic } = contenido;

          if(contenido != "agregar") {
              return (
               <Contenido
                  text_pdf={text_pdf}
                  name_pdf={name_pdf}
                  id_content_topic={id_content_topic}
                  id_topic={id_topic_selected}
                />
              );
           } else {
            return (<AgregarContenido
                  id_content_topic={this.props.id_content_topic}
                  id_topic={id_topic_selected}
                  name_pdf={this.props.name_pdf}
                  text_pdf={this.props.text_pdf}
            />);
           }
        });
  }

  render() {
    const { loading } = this.state;
    const { tema } = this.state;

    return (
        <div>
            <h2>Contenidos relacionados a {tema} </h2>

            <GridContainer>
                {loading ? 'Cargando los contenidos...' : this.renderContenidos()}
            </GridContainer>
        </div>
    );
  }
}
export default Contenidos;