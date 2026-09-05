import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarContenidoAlumnoView from 'views/Alumnos/AgregarContenidoAlumnoView.js';
import AlumnoContenido from 'views/Alumnos/AlumnoContenido.js';
import { getContenidosByStudentTopic, changeOrderStudentContent } from '../../utils/api';
import Button from "components/CustomButtons/Button.js";

function SortableAlumnoContenido({ id, text_pdf, name_pdf, id_studentcontent, id_studenttopic, order }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <AlumnoContenido
        text_pdf={text_pdf}
        name_pdf={name_pdf}
        id_studentcontent={id_studentcontent}
        id_studenttopic={id_studenttopic}
        order={order}
      />
    </div>
  );
}

function AlumnosContenido(props) {
  const { id_studenttopic_selected } = props;
  const [contenidosArray, setContenidosArray] = useState([]);
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(true);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  useEffect(() => {
    let active = true;

    getContenidosByStudentTopic(id_studenttopic_selected)
      .then(json => {
        const contenidos = json.data.studentcontents;

        if (active) {
          setContenidosArray(contenidos);
          setLoading(false);
        }
      })
      .catch(error => {
        // do something with the error (report it, etc.)
      });

    return () => { active = false; };
  }, [id_studenttopic_selected]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setContenidosArray((items) => {
        const oldIndex = items.findIndex(c => c.id_studentcontent === active.id);
        const newIndex = items.findIndex(c => c.id_studentcontent === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleClickOrder = (e) => {
    const auxContenidosArray = contenidosArray.map((contenido, index) => ({ ...contenido, order: index }));
    changeOrderStudentContent(JSON.stringify({"studentContents": auxContenidosArray }))
            .then(success => {
              window.location.reload();
            })
            .catch(error => {
              alert("ERROR")
            });
  };

  const renderContenidos = () => {
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={contenidosArray.map(c => c.id_studentcontent)} strategy={verticalListSortingStrategy}>
          {contenidosArray.map(contenido => (
            <SortableAlumnoContenido
              key={contenido.id_studentcontent}
              id={contenido.id_studentcontent}
              text_pdf={contenido.text_pdf}
              name_pdf={contenido.name_pdf}
              id_studentcontent={contenido.id_studentcontent}
              id_studenttopic={id_studenttopic_selected}
              order={contenido.order}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
  }

  const renderAgregar = () => {
    return (
    <div>
    <AgregarContenidoAlumnoView
      id_studentcontent={props.id_studentcontent}
      id_studenttopic={id_studenttopic_selected}
      name_pdf={props.name_pdf}
      text_pdf={props.text_pdf}
    />
      <Button color="danger" onClick={handleClickOrder}> Actualizar Orden </Button>

    </div>

    )
  }

  return (
    <div>
      <h2>Contenidos relacionados a {tema} </h2>
      <GridContainer>
        {loading ? 'Cargando los contenidos...' : renderAgregar()}
        {loading ? '' : renderContenidos()}
      </GridContainer>
    </div>
  );
}
export default AlumnosContenido;
