import React, { useEffect, useState } from 'react'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarModal } from './CalendarModal'
import { CalendarEvent } from './CalendarEvent'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

moment.locale('es')
const localizer = momentLocalizer(moment)



export const CalendarScreen = () => {
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
    const {uid} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    //TODO: leer del store los eventos
    const {events,activeEvent} = useSelector(state => state.calendar)
    
    useEffect(() => {
        dispatch( eventStartLoading())        
    }, [dispatch])
    const onDoubleClick = (e) => {
        // console.log(e)
        
        dispatch(uiOpenModal())
    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
        
    }
    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView',e)
    }
    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter = (event,start,end,isSelected) => {
        
        const style={
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color:'white',   
        }
        return {style};
    }
    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}//Este evento me permite que cuando hago click se dispare.
                onView={onViewChange}
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event:CalendarEvent //mando como referencia, no loimporto como un component
                    //para que se vea el hola mundo en todos lados.
                }}

            />
            <AddNewFab />
            
            {
                    (activeEvent)
                    &&
                    (<DeleteEventFab />)                         
             }

                
            
            <CalendarModal />
        </div>
    )
}
