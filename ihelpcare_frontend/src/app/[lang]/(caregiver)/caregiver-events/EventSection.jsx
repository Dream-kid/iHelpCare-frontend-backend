import EventsSection from '@app/[lang]/(admin)/events-activities/EventsSection';

export default function EventSection() {
  return (
    <section className='container min-h-[78vh]'>
      <h1 className='title__anim pt-5 text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Events & Activities
      </h1>

      {/* admin events section component */}
      <EventsSection />
    </section>
  );
}
