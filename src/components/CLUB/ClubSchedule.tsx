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

export default function MyClubSchedule() {
  // TODO: Need lines to be a straight line
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
        Club Schedule
      </h2>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            6:00PM-6:10PM
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Intros/Recent Releases/Shout Outs</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            6:10PM-6:45PM
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Discussion</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            6:45PM-6:50PM
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Album/Song Pick Selection</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            6:50PM-7:15PM
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>In-Club Activity</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
