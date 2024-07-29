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
          0X:00PM-0X:10PM
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Intros/Recent Releases/Shout Outs</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          0X:10PM-0X:45PMish
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Discussion</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          0X:45PMish-0X:50PMish
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Album/Song Pick Selection</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          0X:50PMish-0(X+1):20PMish
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>In-Club Activity</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
