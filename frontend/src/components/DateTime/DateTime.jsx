import React from "react";

DateTime.defaultProps = {
    options: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    },
};

export default function DateTime({
    date,
    options: { weekday, year, month, day, hour, minute, second },
}) {
    let currentLocale = new Intl.DateTimeFormat()
        .resolvedOptions()
        .locale.toLowerCase();

    const getDate = () =>
        new Intl.DateTimeFormat(currentLocale, {
            weekday,
            year,
            month,
            day,
            hour,
            minute,
            second,
        }).format(Date.parse(date));


    return (
        <time dateTime={date} title={date}>
            {getDate()}
        </time>
    );
}