import './Calendar.css';

import type { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef, useState } from 'react';

import RightPanel from './RightPanel';

// import type { TaskEvent } from '~/interfaces/task';
type TaskEvent = {
  title: string;
  start: Date;
  end: Date;
};

export default function Calendar() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  console.log(111);
  const [views] = useState<CalendarOptions['views']>({
    week: {
      titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
    },
  });

  const calendarRef = useRef<FullCalendar | null>(null);

  const handleEventClick = (event: EventClickArg) => {
    // onEventClick(event);
  };

  const handleEventResize = (event: EventClickArg) => {
    console.log('🚀 :: event 1', event);
  };

  const handleEventDrop = (event: EventClickArg) => {
    console.log('🚀 :: event 2', event);
  };

  const handleDateClick = (event: any) => {
    setIsRightPanelOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventClassNames = (item: any) => {
    if (!item.event._instance) return [''];
    const { end } = item.event._instance.range;
    const isTaskExceeded = end.getTime() < new Date().getTime();
    return isTaskExceeded ? ['exceeded'] : ['not-exceeded'];
  };

  const handleCloseRightPanel = () => {
    setIsRightPanelOpen(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev next today',
          end: 'dayGridMonth timeGridWeek timeGridDay listMonth',
        }}
        views={views}
        // events={taskEvents ? taskEvents : []}
        dayMaxEvents={3}
        editable
        eventResizableFromStart
        dragScroll
        navLinks
        eventClassNames={handleEventClassNames}
        eventClick={handleEventClick}
        eventResize={handleEventResize}
        eventDrop={handleEventDrop}
        dateClick={handleDateClick}
        ref={calendarRef}
      />
      {isRightPanelOpen && (
        <div
          style={{
            width: '30%',
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            backgroundColor: '#fff',
            borderLeft: '1px solid #ccc',
            boxShadow: '-1px 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 2,
          }}
        >
          <RightPanel handleCloseRightPanel={handleCloseRightPanel} />
        </div>
      )}
    </div>
  );
}
