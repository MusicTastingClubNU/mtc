import * as React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { useMediaQuery } from "@mui/material";
import { addMinutes, format } from "date-fns";

type TimelineEntry = {
  startTime: Date;
  endTime: Date;
  label: string;
};

function buildTimeline(
  start: Date,
  activities: RawActivity[]
): TimelineEntry[] {
  const timeline: TimelineEntry[] = [];

  let currentTime = start;

  for (const activity of activities) {
    const entry: TimelineEntry = {
      label: activity.label,
      startTime: currentTime,
      endTime: addMinutes(currentTime, activity.durationMinutes),
    };
    timeline.push(entry);
    currentTime = entry.endTime; // update time for next activity
  }

  return timeline;
}

const rawActivities: RawActivity[] = [
  { label: "Intros/Recent Releases/Shout Outs", durationMinutes: 10 },
  { label: "Discussion", durationMinutes: 35 },
  { label: "Album/Song Pick Selection", durationMinutes: 5 },
  { label: "In-Club Activity", durationMinutes: 25 },
];
// Example use:
const startTime = new Date("2025-06-20T18:00:00");
const timelineData = buildTimeline(startTime, rawActivities);

type RawActivity = {
  label: string;
  durationMinutes: number;
};

const formatTimeRange = (start: Date, end: Date) =>
  `${format(start, "h:mma")}-${format(end, "h:mma")}`;

export default function MyClubSchedule() {
  // TODO: Need lines to be a straight line
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
        Club Schedule
      </h2>

      <Timeline>
        {timelineData.map((entry, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="textSecondary">
              {formatTimeRange(entry.startTime, entry.endTime)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {index < timelineData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{entry.label}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
