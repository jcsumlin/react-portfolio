import { Timeline, TimelineItem } from '@/components/ui/timeline'
import { Check } from 'lucide-react'
import experience from '@/experience.json'
import { format, parse } from 'date-fns'
import SectionTitle from './SectionTitle';

function getDisplayDate(start_date: string, end_date: string) {
    const startDateObject = parse(start_date, 'MM-dd-yyyy', new Date());
    const endDateObject = end_date.toLowerCase() === 'present' ? null : parse(end_date, 'MM-dd-yyyy', new Date());
    return `${format(startDateObject, 'MMMM yyyy')} - ${endDateObject ? format(endDateObject, 'MMMM yyyy') : 'Present'}`;
}

export default function Experience() {
    return (
        <div className="mt-4 min-h-screen" id="experience">
            <SectionTitle title="Experience" />
            <Timeline>
                {experience.map((job) => (
                    <TimelineItem
                        className='!text-white'
                        key={job.company + job.title}
                        date={getDisplayDate(job.start_date, job.end_date)}
                        title={`${job.title} at ${job.company}`}
                        // description={job.description || ''}
                        icon={job.logo ? <img src={job.logo} alt={`${job.company} logo`} className="rounded-full" /> : <Check />}
                        iconsize='full'
                        status={job.end_date.toLowerCase() === 'present' ? 'in-progress' : 'completed'}
                    />
                ))}
            </Timeline>
        </div>
    )
}
