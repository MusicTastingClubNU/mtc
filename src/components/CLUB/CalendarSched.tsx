import * as React from "react";
import { useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Grid, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import calendarData from "./calendarData.json";
import useMediaQuery from "@mui/material/useMediaQuery";

const ItemMobile = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flex: "wrap",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  paddingTop: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flex: "wrap",
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const KeyComponent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginTop: 10,
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  fontSize: 15,
  color: theme.palette.text.secondary,
}));

const calendarStylesFull = {
  transform: "scale(1.5)",
};

const calendarStylesMobile2 = {
  transform: "scale(1)",
  alignItems: "center",
  width: "100%",
};

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2025-04-03");

function ServerDay(
  props: PickersDayProps<Dayjs> & { meetings?: Dayjs[]; emoji?: string }
) {
  const { meetings = [], day, outsideCurrentMonth, emoji, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    meetings.some((meetingDay) => meetingDay.isSame(day, "day"));
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? emoji : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialValue);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  const getEmojiForDay = (date: Dayjs) => {
    const dateString = date.format("YYYY-MM-DD");
    const activity = calendarData.find(
      (day) => day.weekActivityWeek === dateString
    );
    return activity?.weekActivityEmoji ?? ""; // Default to empty string if no match found
  };
  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div>
            {" "}
            {isMobile ? (
              <ItemMobile>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    defaultValue={initialValue}
                    loading={isLoading}
                    onMonthChange={handleMonthChange}
                    onChange={handleDateChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                      day: (dayProps) => (
                        <ServerDay
                          {...dayProps}
                          meetings={calendarData.map((activityWeek) =>
                            dayjs(activityWeek.weekActivityWeek)
                          )}
                          emoji={getEmojiForDay(dayProps.day)}
                        />
                      ),
                    }}
                    sx={isMobile ? calendarStylesMobile2 : calendarStylesFull}
                  />
                </LocalizationProvider>
              </ItemMobile>
            ) : (
              <Item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    defaultValue={initialValue}
                    loading={isLoading}
                    onMonthChange={handleMonthChange}
                    onChange={handleDateChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                      day: (dayProps) => (
                        <ServerDay
                          {...dayProps}
                          meetings={calendarData.map((activityWeek) =>
                            dayjs(activityWeek.weekActivityWeek)
                          )}
                          emoji={getEmojiForDay(dayProps.day)}
                        />
                      ),
                    }}
                    sx={isMobile ? calendarStylesMobile2 : calendarStylesFull}
                  />
                </LocalizationProvider>
              </Item>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item2>
            <div style={{ width: "100%" }}>
              {selectedDate && (
                <>
                  <h1 style={{ color: "black", paddingBottom: 10 }}>
                    {calendarData.find(
                      (day) =>
                        day.weekActivityWeek ===
                        selectedDate?.format("YYYY-MM-DD")
                    )?.weekActivityTitle ?? "No Activity Found"}{" "}
                  </h1>
                  <h2 style={{ paddingBottom: 20 }}>
                    {calendarData.find(
                      (day) =>
                        day.weekActivityWeek ===
                        selectedDate?.format("YYYY-MM-DD")
                    )?.weekActivityDetails ?? ""}
                  </h2>
                  <h4 style={{ paddingBottom: 40 }}>
                    {calendarData.find(
                      (day) =>
                        day.weekActivityWeek ===
                        selectedDate?.format("YYYY-MM-DD")
                    )?.weekActivityHost
                      ? "Hosted By " +
                        calendarData.find(
                          (day) =>
                            day.weekActivityWeek ===
                            selectedDate?.format("YYYY-MM-DD")
                        )?.weekActivityHost
                      : ""}
                  </h4>
                </>
              )}
            </div>
          </Item2>
        </Grid>
      </Grid>
      <KeyComponent>
        <b>KEY: </b>
        <>&nbsp;</>Games=♟️ | Appreciation=🎵
      </KeyComponent>
      <Grid item xs={8}>
        <br />
      </Grid>
    </div>
  );
}
