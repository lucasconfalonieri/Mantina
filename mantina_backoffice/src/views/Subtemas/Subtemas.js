import React, { Component } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarSubtema from 'views/Subtemas/AgregarSubtema.js';
import Subtema from 'views/Subtemas/Subtema.js';
import { getSubtemasByTema } from '../../utils/api';

class Subtemas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_topic_selected: props.id_topic_selected,
      subtemasArray: [],
      tema: "",
      loading: true,
    };
  }

  componentDidMount() {
    const id_selected = this.state.id_topic_selected;
    getSubtemasByTema(id_selected)

    .then((response) => {
        const subtemasAux = response.data.subtopics;
        subtemasAux.push("agregar");

        this.setState({
            subtemasArray: subtemasAux,
            tema: response.data.topicName,
            loading: false,
        });
    })
    .catch(error => {

    });
  }

  renderSubtemas = () => {
    const { subtemasArray, id_topic_selected } = this.state;

    return subtemasArray.map(subtema => {
      const { name, id_subtopic } = subtema;

      if(subtema != "agregar") {
          return (
           <Subtema
              name={name}
              id_topic = {id_topic_selected}
              id_subtopic={id_subtopic}
            />
          );
      } else {
        return (
            <AgregarSubtema
                name = {this.props.name}
                id_topic = {id_topic_selected}
                id_subtopic = {this.props.id_subtopic}
             />
        );
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { tema } = this.state;

    return (
        <div>
            <h2>Subtemas relacionados a {tema} </h2>

            <GridContainer>
                {loading ? 'Cargando los subtemas...' : this.renderSubtemas()}
            </GridContainer>
        </div>
    );
  }
}
export default Subtemas;