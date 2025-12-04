import {
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineSubHeader,
  TimelineTime,
  TimelineTitle,
} from '@/components/ui/timeline';
import experience from '@/experience.json';
import { format, parse } from 'date-fns';
import SectionTitle from '../SectionTitle';
import { kebabCase } from 'lodash';

function getDisplayDate(start_date: string, end_date: string) {
  const startDateObject = parse(start_date, 'MM-dd-yyyy', new Date());
  const endDateObject =
    end_date.toLowerCase() === 'present'
      ? null
      : parse(end_date, 'MM-dd-yyyy', new Date());
  return `${format(startDateObject, 'MMM yyyy')} - ${endDateObject ? format(endDateObject, 'MMM yyyy') : 'Present'}`;
}

// Pre-process experience data with memoized date formatting
const processedExperience = experience.map((item) => ({
  ...item,
  displayDate: getDisplayDate(item.start_date, item.end_date),
  key: kebabCase(item.title + '-' + item.company),
}));

export default function Experience() {
  return (
    <section className="my-4" id="experience">
      <SectionTitle title="Experience" />
      <Timeline>
        {processedExperience.map((item) => (
          <TimelineItem key={item.key}>
            <TimelineHeader>
              <TimelineTime>{item.displayDate}</TimelineTime>
              <div>
                <TimelineTitle>{item.company}</TimelineTitle>
                <TimelineSubHeader>{item.title}</TimelineSubHeader>
              </div>
            </TimelineHeader>
            {item.description && (
              <TimelineDescription>{item.description}</TimelineDescription>
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
}
