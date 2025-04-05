import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import EventCalendar from './EventCalendar';

export const metadata = {
  ...metaData,
  title: 'Events Calendar ― iHelp',
};

export default function Calendar() {
  return (
    <NewMainLayout>
      <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
        <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
          Events Calendar
        </h1>

        <EventCalendar />
      </section>
    </NewMainLayout>
  );
}
