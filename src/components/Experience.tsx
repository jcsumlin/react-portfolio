import {
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineSubHeader,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import experience from "@/experience.json";
import { format, parse } from "date-fns";
import SectionTitle from "./SectionTitle";
import { kebabCase } from "lodash";

function getDisplayDate(start_date: string, end_date: string) {
  const startDateObject = parse(start_date, "MM-dd-yyyy", new Date());
  const endDateObject =
    end_date.toLowerCase() === "present"
      ? null
      : parse(end_date, "MM-dd-yyyy", new Date());
  return `${format(startDateObject, "MMMM yyyy")} - ${endDateObject ? format(endDateObject, "MMMM yyyy") : "Present"}`;
}

export default function Experience() {
  return (
    <div className="mt-4 min-h-screen" id="experience">
      <SectionTitle title="Experience" />
      <Timeline>
        {experience.map((item) => (
          <TimelineItem key={kebabCase(item.title + "-" + item.company)}>
            <TimelineHeader>
              <TimelineTime>
                {getDisplayDate(item.start_date, item.end_date)}
              </TimelineTime>
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
    </div>
  );
}
