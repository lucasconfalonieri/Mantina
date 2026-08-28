import React, { Component } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarTemaAlumnoView from 'views/Alumnos/AgregarTemaAlumnoView.js';
import TemaAlumno from 'views/Alumnos/TemaAlumno.js';
import { getTemasAlumnos, changeOrderStudentTopic} from '../../utils/api';
import Button from "components/CustomButtons/Button.js";


import List from 'react-smooth-draggable-list';



class TemasAlumnos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temasArray: [],
      loading: true,
      order: []
    };
  }

  componentDidMount() {
    getTemasAlumnos()
      .then(json => {
        const temas = [];
        const orden = [];
        json.data.studenttopics.forEach(result => {
          temas.push(result);
          orden.push(result.order);
        });

        temas.push("agregar");
        this.setState({order : orden})
        return temas;
      })
      .then(allTemas => {
        this.setState({
          temasArray: allTemas,
          loading: false
        });
      })
      .catch(error => {
        // do something with the error (report it, etc.)
      });
  }

  renderTemas = () => {
    const { temasArray } = this.state;

    return <List
      rowHeight={100}
      rowWidth={3000}
      order={this.state.order}
      onReOrder={order => this.setState({ order })}
    >{
        temasArray.map(tema => {
          const { name, id_studenttopics, order } = tema;

          if (tema != "agregar") {
            return (
              <List.Item>
                <TemaAlumno
                  name={name}
                  id_studenttopic={id_studenttopics}
                  order={order}
                />
              </List.Item>
            );
          } else {
            return (
              <br/>
            )
          }
        })
      }

    </List>


  }

  handleClickOrder = (e) => {
    const auxTemasArray = [];
    this.state.temasArray.map(tema => {
      const { name, id_studenttopics, order } = tema;
      if (tema != "agregar") {
      tema.order = this.state.order.indexOf(tema.order);
      auxTemasArray.push(tema);
      }
    });
    changeOrderStudentTopic(JSON.stringify({"studentTopics": auxTemasArray }))
            .then(success => {
              window.location.reload();
            })
            .catch(error => {
              alert("ERROR")
            });
  };

  renderAgregar = () => {
    return(
    <div >
      <AgregarTemaAlumnoView
      name={this.props.name}
      id_studenttopic={this.props.id_studenttopic}
    />
      <Button color="danger" onClick={this.handleClickOrder}> Actualizar Orden </Button>
     
    </div>

    )
  }
  render() {
    const { loading } = this.state;

    return (

      <GridContainer>
       
        {loading ? 'Cargando los temas...' : this.renderAgregar()}
        {loading ? '' : this.renderTemas()}
      </GridContainer>



    );
  }
}

export default TemasAlumnos;

