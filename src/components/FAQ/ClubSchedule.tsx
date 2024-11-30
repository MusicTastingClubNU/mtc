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

export default function MyClubSchedule() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          X:00PM-X:10PM
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Intros/Recent Releases/Shout Outs</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          X:10PM-X:45PM
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Discussion</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          X:45PM-X:50PM
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Album/Song Pick Selection</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          X:50PM-Y:15PM
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>In-Club Activity</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
