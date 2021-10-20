import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import {  eventClearActiveEvent, eventStartAddNew, eventStartUpdate} from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');

  const now= moment().minutes(0).seconds(0).add(1,'hours');
  const nowPlus1=now.clone().add(1,'hours')
//nowPlus1 es una hora mas que el now
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end:nowPlus1.toDate()
}

export const CalendarModal = () => {
    
    const {modalOpen}= useSelector(state => state.ui)
    const { activeEvent}= useSelector(state => state.calendar)
    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
    const [titleValid,setTitleValid]=useState(true)
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState(initEvent)

    const {notes,title,start,end} = formValues


    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent)
        }else {
            setFormValues(initEvent)
        }
    }, [activeEvent,setFormValues])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    } 

    const closeModal = () => {
        //TODO: cerrar el modal.
        console.log('cerrar modal')
        //dispatch
        dispatch(uiCloseModal())
        dispatch(eventClearActiveEvent())
        setFormValues( initEvent )
    }
    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({//esto se hace porque necesito actualizarla fecha cuando se hace algun cambio
            ...formValues,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        setDateEnd(e)
        setFormValues({//esto se hace porque necesito actualizarla fecha cuando se hace algun cambio
            ...formValues,
            end: e
        })
    }
    const handleSubmitForm = (e) => {
        e.preventDefault()
        const momentStart=moment(start)
        const momentEnd=moment(end)
        
        if( momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('error','La fecha fin tiene que ser mayor a la de inicio','error')
                        //  title           mensaje                                        imag
        }
        if(title.trim().length < 2) {
            return setTitleValid(false);
        }
        //TODO: realizar la grabacion en la bd
        if(activeEvent){
            dispatch(eventStartUpdate(formValues))
        }else{
            dispatch(eventStartAddNew(formValues))
        }
        setTitleValid(true)
        closeModal()
    }
    return (
        <Modal
          isOpen={modalOpen}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={ 200 }
          className='modal'
          overlayClassName='modal-fondo'
        >
            <h1>{(activeEvent) ? 'Editar Evento' : 'Nuevo evento'}</h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                    onChange={handleStartDateChange}
                    value={dateStart}
                    className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                    onChange={handleEndDateChange}
                    value={dateEnd}
                    minDate= {dateStart}
                    className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
        )
}