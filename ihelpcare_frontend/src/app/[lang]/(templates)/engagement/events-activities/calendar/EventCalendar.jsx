'use client';

import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import useFetchData from '@hooks/useFetchData';
import useNotification from '@hooks/useNotification';
import { getLocale } from '@root/i18n.config';
import { Radio } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const EventDetailsViewModal = dynamic(
  () => import('@app/[lang]/(admin)/events-activities/EventDetailsViewModal'),
  {
    ssr: false,
  }
);

dayjs.extend(customParseFormat);

// event content render function
function renderEventContent(eventInfo) {
  return (
    <i className='font-font-semi-bold !not-italic'>{eventInfo?.event?.title || 'Unknown Event'}</i>
  );
}

export default function EventCalendar() {
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const locale = getLocale();

  const [eventDetailsModal, setEventDetailsModal] = useState({
    open: false,
    eventId: null,
  });

  // fetch event/activities list API's data
  const [loading, error, events] = useFetchData('/event-list');

  return loading ? (
    <SharedLoader />
  ) : error ? (
    <SharedError error={error} />
  ) : (
    <div>
      <div className='mb-2 flex flex-row items-center justify-end'>
        <Radio.Group>
          <Radio.Button
            className='cursor-default !bg-[#05ACF5] font-font-semi-bold !text-color-txt-light hover:!bg-[#05ACF5] hover:!text-color-txt-light active:!bg-[#05ACF5] active:!text-color-txt-light'
            value='hybrid'
          >
            Hybrid
          </Radio.Button>
          <Radio.Button
            className='cursor-default !bg-[#23C438] font-font-semi-bold !text-color-txt-light hover:!bg-[#23C438] hover:!text-color-txt-light active:!bg-[#23C438] active:!text-color-txt-light'
            value='offline'
          >
            Offline
          </Radio.Button>
          <Radio.Button
            className='cursor-default !bg-[#E23D13] font-font-semi-bold !text-color-txt-light hover:!bg-[#E23D13] hover:!text-color-txt-light active:!bg-[#E23D13] active:!text-color-txt-light'
            value='online'
          >
            Online
          </Radio.Button>
        </Radio.Group>
      </div>

      <FullCalendar
        schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin]}
        eventContent={renderEventContent}
        initialView='dayGridMonth'
        events={events?.data?.data?.map((data) => ({
          ...data,
          allDay: false,
          start: dayjs(data?.event_date_from).startOf('day').format('YYYY-MM-DD'),
          end: dayjs(data?.event_date_to).endOf('day').format('YYYY-MM-DD'),
          title: data?.[`title_${locale}`] || 'Unknown Event',
          color:
            data?.type?.type_value?.toLocaleLowerCase() === 'hybrid'
              ? '#05ACF5'
              : data?.type?.type_value?.toLocaleLowerCase() === 'offline'
                ? '#23C438'
                : data?.type?.type_value?.toLocaleLowerCase() === 'online'
                  ? '#E23D13'
                  : '#603F8B',
        }))}
        displayEventTime
        dayMaxEvents={4}
        // prettier-ignore
        eventClick={(event) => setEventDetailsModal((prevState) => ({
          ...prevState,
          open: true,
          // eslint-disable-next-line no-underscore-dangle
          eventId: parseInt(event?.event?._def?.publicId, 10),
        }))}
      />

      {/* event details view modal */}
      {eventDetailsModal?.open && (
        <EventDetailsViewModal
          eventDetailsModal={eventDetailsModal}
          setEventDetailsModal={setEventDetailsModal}
          openNotificationWithIcon={openNotificationWithIcon}
        />
      )}

      {/* notification context */}
      {contextHolder}
    </div>
  );
}
