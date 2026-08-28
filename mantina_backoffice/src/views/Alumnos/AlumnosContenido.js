import React, { Component } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarContenidoAlumnoView from 'views/Alumnos/AgregarContenidoAlumnoView.js';
import AlumnoContenido from 'views/Alumnos/AlumnoContenido.js';
import { getContenidosByStudentTopic, changeOrderStudentContent } from '../../utils/api';
import Button from "components/CustomButtons/Button.js";
import List from 'react-smooth-draggable-list';


class AlumnosContenido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_studenttopic_selected: props.id_studenttopic_selected,
      contenidosArray: [],
      tema: "",
      loading: true,
      order: []
    };
  }

  handleClickOrder = (e) => {
    const auxContenidosArray = [];
    this.state.contenidosArray.map(contenido => {
      const { text_pdf,name_pdf, id_studentcontent, order } = contenido;
      if (contenido != "agregar") {
        contenido.order = this.state.order.indexOf(contenido.order);
      auxContenidosArray.push(contenido);
      }
    });
    changeOrderStudentContent(JSON.stringify({"studentContents": auxContenidosArray }))
            .then(success => {
              window.location.reload();
            })
            .catch(error => {
              alert("ERROR")
            });
  };


  componentDidMount() {
    const id_selected = this.state.id_studenttopic_selected;
    getContenidosByStudentTopic(id_selected)
      .then(json => {
        const contenidos = [];
        const orden = [];
        json.data.studentcontents.forEach(result => {
          contenidos.push(result);
          orden.push(result.order);
        });

        contenidos.push("agregar");
        this.setState({order : orden})
        return contenidos;
      })
      .then(allContenidos => {
        this.setState({
          contenidosArray: allContenidos,
          loading: false
        });
      })
      .catch(error => {
        // do something with the error (report it, etc.)
      });
  }

  renderContenidos = () => {
    const { contenidosArray, id_studenttopic_selected } = this.state;
    return <List
      rowHeight={100}
      rowWidth={3000}
      order={this.state.order}
      onReOrder={order => this.setState({ order })}
    >{
      contenidosArray.map(contenido => {
          const { text_pdf,name_pdf, id_studentcontent, order } = contenido;

          if (contenido != "agregar") {
            return (
              <List.Item>
                <AlumnoContenido
                  text_pdf={text_pdf}
                  name_pdf={name_pdf}
                  id_studentcontent={id_studentcontent}
                  id_studenttopic={id_studenttopic_selected}
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




  renderAgregar = () => {
    return (
    <div>
    <AgregarContenidoAlumnoView
      id_studentcontent={this.props.id_studentcontent}
      id_studenttopic={this.state.id_studenttopic_selected}
      name_pdf={this.props.name_pdf}
      text_pdf={this.props.text_pdf}
    />
      <Button color="danger" onClick={this.handleClickOrder}> Actualizar Orden </Button>
     
    </div>

    )
  }

  render() {
    const { loading } = this.state;
    const { tema } = this.state;

    return (
        <div>
            <h2>Contenidos relacionados a {tema} </h2>
            <GridContainer>
              {loading ? 'Cargando los contenidos...' : this.renderAgregar()}
              {loading ? '' : this.renderContenidos()}
            </GridContainer>
        </div>
    );
  }
}
export default AlumnosContenido;