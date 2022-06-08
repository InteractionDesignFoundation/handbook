# Support engineer

[[toc]]

Whenever we start a new sprint, at least one engineer is assigned the support engineer role
for the duration of the sprint. This role is usually assigned to developers who have just completed
a large feature or some other large task who need some time to keep an eye on things and recover energy.

## Your responsibilities
This role can be a challenging one as it involves a lot of critical thinking and initiative.
In a nutshell, your goal is to protect the dev team from distractions while still making sure
that the needs of the business are taking care of.

You have done a great job as a support engineer when:
1. The dev team can confidently mute error channels and notifications knowing that you are constantly monitoring for errors and performance issues
2. The dev team can focus almost entirely on their sprint goals, knowing that you will only involve them if its really important that you do so
3. Other teams feel like their requests are being heard and taken care of in a timely manner

### Monitor error channels
There are a number of channels on Slack which display errors. You should unmute all of them once you are the support engineer:

- `#errors-dev-01`
- `#errors-dev-02`
- `#errors-dev-03`
- `#errors-dev-04`
- `#errors-develop`
- `#errors-production`
- `#js-errors-production`

:::tip
Create a new sidebar section on Slack and add these channels to that section. [Click here to learn how to do this](https://slack.com/help/articles/360043207674-Organize-your-sidebar-with-custom-sections)
:::

The highest priority channel is `#errors-production` as errors shown here are likely affecting a guest, member or admin user on [interaction-design.org](https://interaction-design.org).
In addition to unmuting this channel, you should change the notification settings to alert you whenever a message is sent in this
channel. You might want to do the same for `#js-errors-production`, but JS errors there generally don't break critical site functionality.

The other error channels can sometimes be quite 'noisy' and the errors aren't directly impacting users, so you don't need to be alerted
whenever a message is sent in them. It's sufficient to look through these channels once every few hours.

:::tip Organize support engineer channels
When your support engineer shift is over at the end of the sprint, you should mute the error channels again.
If you added the channels to a custom section, you can hover over the section name on Slack, click on the 3 dots,
and select 'mute all'.
:::

You might be actively monitoring error channels, but you are not necessarily going to solve the errors as soon as they happen.
There are 4 actions you could take for any given error message.

:::tip Reacting to error messages
It may take you a while to investigate an error message. To let other team members know you are on it (and to remind yourself what message you were looking into), you
should react to the message with the 👀 or ⏳ icons.

Once you have resolved the issue via one of the 4 actions listed above, mark the message with a ✔️ so that
it's clear to yourself and your fellow teammates that it has been dealt with.
:::

#### Create an issue on GitHub
This is generally the most helpful action you could take when a new error message appears. Open a new Github issue on
the `ixdf-web` repository using the 'Bug report' template and fill out as much detail as you can about the error. Take a look
at the system owners list to determine who to assign and add 'urgency' and 'importance' labels to ensure it is
dealt with at the appropriate time.

:::warning
Before creating the issue, try make sure that there isn't already an issue already. You can use GitHub's robust
search functionality to assist you. [Read more about how to effectively search issues and pull requests here](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests)
:::

#### Fix the cause of the error immediately
If the bug is currently affecting live users, and it can be resolved quickly (less than 1 hour of effort),
then it might be worth jumping in and fixing it yourself. Before you take this action, you will need to consider the severity of the issue
and how much it will affect your ability to work on other important support engineer tasks.

#### Notify another developer
If the error is severe enough to warrant immediate action, but too large or complex for you to resolve, you might need to
determine who the system owners are for the related system and ping one of them on Slack. Before you get them involved,
try and get as much information as you can about the problem, for example:

- Who does the error affect?
- How can the error be reproduced?
- Is there any additional context that you know which could help the developer?

The higher the quality of the information you provide to the developer, the sooner they can resolve the issue
and get back to working on their sprint goals.

#### Keep an eye on it
Some errors are not urgent enough to be looked into immediately and don't yet make sense to add as a GitHub issue. With these errors,
it's best to just keep an eye on them and continuously re-evaluate if another action needs to be taken.

### Manage requests from other departments
You will be added to the `@support-engineers` tag on Slack when you are assigned the support engineer role.
The team knows to use this tag whenever they require developer help. Just like with error messages on the error channels,
you are not necessarily going to be the person who handles the request directly, you are the 'traffic manager' who decides what to do with the request,
who needs to handle it and when it needs to be handled.

### Keep an eye on performance and error monitoring tools

Your next responsibility is to ensure that our infrastructure and applications are running as smoothly as possible. Not every issue
leads to an actual error being recorded. If, for example, interaction-design.org is serving requests much slower than it usually does, you won't get an error
in any of the channels, but there still might need to be action taken to sort it out.

We use [New Relic](https://newrelic.com/) for most of our monitoring needs. You'll need to get familiar with this platform
and the various dashboards and monitoring tools it provides.

In addition, we use [Bug Snag](https://www.bugsnag.com/) for monitoring JavaScript errors, so keeping an eye on the overview
dashboard there is also important.

:::tip
You should be able to find the login details for the IxDF New Relic and Bug Snag accounts on LastPass. If not, please ping
the dev team lead for assistance.
:::

### Monitor `#cron-production` channel
As support engineer, you are responsible for keeping an eye on the `#cron-production` channel.

:::tip
If you created a custom sidebar section for support engineer channels, you can add this channel there as well
:::

This channel records all console commands that are triggered automatically at specified times.
You don't need to necessarily know what the jobs do, but you should keep an eye on how long they take to execute.
The more 👎 and 🙀 emojis you see next the execution time, the longer it takes to execute that command:
- Every 2 seconds is another 👎
- Every 60 seconds is another 🙀

Most of these scheduled commands take a while, that's why they are executed in this manner. However, if a command takes
an unusually long time, it should be investigated.

## How to spend the rest of your time


As mentioned previously, you probably won't have any product tasks during your support engineer stint.
There is still plenty to do though!

### Learn more about one of our systems
This is a great opportunity to get to know a new system without any pressure. Here are some ideas on how to go about doing so:

1. Take a look at some GitHub issues related to the system you want to learn and tackle one or two of them
2. Read through the controllers related to the system and do some light refactoring
3. Reach out to members of other teams and learn more about how they use the system and what their current pain points are with it.

### Improve our documentation
There is always room for improvement with any documentation system and sharing your knowledge and experience in this
manner is one of the best ways you can use your time as a support engineer. This is especially true if you have
just come off of a large feature build in the previous sprint - that knowledge is still fresh in your head, so this is
a great time to document that information.

### Improve test coverage
If you run our test runner in code coverage mode, you will be able to identify parts of our codebase which
have a less than ideal number of tests. While writing tests just for the sake of having tests is not generally a good idea,
you may be able to improve the stability and reliability of some systems by writing some additional tests.



