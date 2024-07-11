# IxDF's SQL conventions

[[toc]]

## DATETIME vs TIMESTAMP vs biginteger

**TL;DL: Use `DATETIME`** to store datetime values, and use `TIMESTAMP` to store metadata (such as when a record has been created, updated, or deleted).

-   DATETIME supported range '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.
-   TIMESTAMP supported range '1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC.”

The default behavior for default values of timestamps in MySQL and/or MariaDB differs for the first timestamp declaration compared to subsequent timestamps:

> If the explicit_defaults_for_timestamp system variable is disabled, the first TIMESTAMP column has both DEFAULT CURRENT_TIMESTAMP and ON UPDATE CURRENT_TIMESTAMP if neither is specified explicitly.

See [MySQL 5.7 Reference Manual](https://dev.mysql.com/doc/refman/5.7/en/timestamp-initialization.html) for more details.
Note, `explicit_defaults_for_timestamp` is disabled by default.

When we read DATETIME, we should always be aware about timezone, at least we should be sure that DATETIME uses a timezone you expect to receive.

Let’s review a common edge case: daylight saving. On the same day, it’s possible to have the same time twice,
and when you compare times, you should understand which time is greater. TIMESTAMP provides this opportunity, DATETIME not.

1.  Sunday, 7 November 2021, 02:00:00 clocks are turned backward 1 hour to:
2.  Sunday, 7 November 2021, 01:00:00 local standard time instead.

As you can see, there are 01:00:00 2 times at the same day.

### biginteger and year 2038 problem

[Year 2038 problem](https://en.wikipedia.org/wiki/Year_2038_problem) caused by the limitations of signed 32-bit integer
that used to store timestamps in a lot of popular DB engines (including MySQL).
The latest possible date is `03:14:07 UTC on 19 January 2038` ((2^31)-1 = 2,147,483,647 seconds after 1 January 1970).

Should we care about this problem? — Yes and no. Currently, we don’t have any data-flows and requirements to store any
info in DB with dates close to 2038 year (it’s possible to try to create a Meetup far in the future, not it’s not critical).
Current possible option is to use `unsigned biginteger` (2^64 - 1) date type.
But we expect that closer to 2035 a lot of companies will start to work on this problem, we’ll have more solutions and options
to deal with it, so we decided to postpone solving this problem.

## Coding style

Use an upper case for SQL keywords and functions:

```sql
# GOOD
SELECT MAX(sent_at) last_sent_at, notification_class FROM notification__notification_log GROUP BY notification_class

# BAD
select max(sent_at) last_sent_at, notification_class from notification__notification_log group by notification_class
```

🦄
