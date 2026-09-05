import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarTemaAlumnoView from 'views/Alumnos/AgregarTemaAlumnoView.js';
import TemaAlumno from 'views/Alumnos/TemaAlumno.js';
import { getTemasAlumnos, changeOrderStudentTopic} from '../../utils/api';
import Button from "components/CustomButtons/Button.js";

function SortableTemaAlumno({ id, name, id_studenttopic, order }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TemaAlumno
        name={name}
        id_studenttopic={id_studenttopic}
        order={order}
      />
    </div>
  );
}

function TemasAlumnos(props) {
  const [temasArray, setTemasArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  useEffect(() => {
    let active = true;

    getTemasAlumnos()
      .then(json => {
        const temas = json.data.studenttopics;

        if (active) {
          setTemasArray(temas);
          setLoading(false);
        }
      })
      .catch(error => {
        // do something with the error (report it, etc.)
      });

    return () => { active = false; };
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTemasArray((items) => {
        const oldIndex = items.findIndex(t => t.id_studenttopics === active.id);
        const newIndex = items.findIndex(t => t.id_studenttopics === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderTemas = () => {
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={temasArray.map(t => t.id_studenttopics)} strategy={verticalListSortingStrategy}>
          {temasArray.map(tema => (
            <SortableTemaAlumno
              key={tema.id_studenttopics}
              id={tema.id_studenttopics}
              name={tema.name}
              id_studenttopic={tema.id_studenttopics}
              order={tema.order}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
  }

  const handleClickOrder = (e) => {
    const auxTemasArray = temasArray.map((tema, index) => ({ ...tema, order: index }));
    changeOrderStudentTopic(JSON.stringify({"studentTopics": auxTemasArray }))
            .then(success => {
              window.location.reload();
            })
            .catch(error => {
              alert("ERROR")
            });
  };

  const renderAgregar = () => {
    return(
    <div >
      <AgregarTemaAlumnoView
      name={props.name}
      id_studenttopic={props.id_studenttopic}
    />
      <Button color="danger" onClick={handleClickOrder}> Actualizar Orden </Button>

    </div>

    )
  }

  return (
    <GridContainer>
      {loading ? 'Cargando los temas...' : renderAgregar()}
      {loading ? '' : renderTemas()}
    </GridContainer>
  );
}

export default TemasAlumnos;
