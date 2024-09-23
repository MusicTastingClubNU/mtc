import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Grid, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import data from "../WE/picksData.json";
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
  transform: "scale(1)", // Adjust the scale as needed
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

const initialValue = dayjs("2024-10-03");

function ServerDay(
  props: PickersDayProps<Dayjs> & { FQ24Meetings?: Dayjs[]; emoji?: string }
) {
  const {
    FQ24Meetings = [],
    day,
    outsideCurrentMonth,
    emoji,
    ...other
  } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    FQ24Meetings.some((meetingDay) => meetingDay.isSame(day, "day"));
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
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    initialValue
  );
  const currQ = data[2];
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

  React.useEffect(() => {
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

  // QUARTER SIGNIFIERS
  const startOfFQ24: Dayjs = dayjs("2024-09-21");
  const endOfFQ24: Dayjs = dayjs("2024-12-14");
  const startOfWQ25: Dayjs = dayjs("2025-01-06");
  const endOfWQ25: Dayjs = dayjs("2025-03-22");
  const startOfSQ25: Dayjs = dayjs("2025-04-01");
  const endOfSQ25: Dayjs = dayjs("2025-06-13");

  function whichQuarterIndex(selectedDate: Dayjs | null) {
    // TODO QuarterIndex for testing purposes
    // if (selectedDate == null){ return 0; }
    if (selectedDate!.isBefore(startOfFQ24)) {
      return 2;
    }

    // Good for 2024-2025 school year
    if (selectedDate == null) {
      return 0;
    }
    if (
      selectedDate!.isAfter(startOfFQ24) &&
      selectedDate!.isBefore(endOfFQ24)
    ) {
      return 2;
    }
    if (
      selectedDate!.isAfter(startOfWQ25) &&
      selectedDate!.isBefore(endOfWQ25)
    ) {
      return 3;
    }
    if (
      selectedDate!.isAfter(startOfSQ25) &&
      selectedDate!.isBefore(endOfSQ25)
    ) {
      return 4;
    }
    return 0;
  }

  const startOfFQ24W1: Dayjs = dayjs("2024-09-26");
  const FQ24Meetings: Dayjs[] = [
    dayjs("2024-10-03"),
    dayjs("2024-10-10"),
    dayjs("2024-10-17"),
    dayjs("2024-10-24"),
    dayjs("2024-10-31"),
    dayjs("2024-11-07"),
    dayjs("2024-11-14"),
    dayjs("2024-11-21"),
  ];

  const whichWeekIndex = (selectedDate: Dayjs): number => {
    if (!selectedDate.isValid()) return -1;

    for (let i = 0; i < FQ24Meetings.length; i++) {
      if (selectedDate.isSame(FQ24Meetings[i])) {
        return i;
      }
    }
    return -1;
  };

  return (
    <>
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
                          FQ24Meetings={FQ24Meetings}
                          emoji={
                            selectedDate
                              ? data[whichQuarterIndex(selectedDate)]?.weeks[
                                  whichWeekIndex(dayProps.day)
                                ]?.weekActivity.weekActivityEmoji ?? ""
                              : ""
                          }
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
                          FQ24Meetings={FQ24Meetings}
                          emoji={
                            selectedDate
                              ? data[whichQuarterIndex(selectedDate)]?.weeks[
                                  whichWeekIndex(dayProps.day)
                                ]?.weekActivity.weekActivityEmoji ?? ""
                              : ""
                          }
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
                    {data[whichQuarterIndex(selectedDate)].weeks[
                      whichWeekIndex(selectedDate)
                    ]?.weekActivity.weekActivityTitle ?? "No Activity Found"}
                  </h1>
                  <h2 style={{ paddingBottom: 20 }}>
                    {data[whichQuarterIndex(selectedDate)].weeks[
                      whichWeekIndex(selectedDate)
                    ]?.weekActivity.weekActivityDetails ?? ""}
                  </h2>
                  <h4 style={{ paddingBottom: 40 }}>
                    Hosted By{" "}
                    {data[whichQuarterIndex(selectedDate)].weeks[
                      whichWeekIndex(selectedDate)
                    ]?.weekActivity.weekActivityHost ?? ""}
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
    </>
  );
}
