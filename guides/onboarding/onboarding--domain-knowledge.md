# Onboarding: How to get domain knowledge and get overview of the codebase

We’ve developed a few onboarding activities to give you a much deeper understanding of our domain. Understanding our domain,
i.e. the platform and its features FROM OUR USERS’ PERSPECTIVE (i.e. domain knowledge) is paramount to both understanding our codebase and writing
awesome code. Great code has a small “conceptual distance” to the domain. In other words, it minimizes cognitive complexity enormously when variable
naming, method naming, database table naming and likewise are named “closely” to the the names of the concepts the users use.

Therefore, you should carry out the following activities in a thorough manner. Don’t worry if you can’t remember all of what you
see and learn after you’ve done the activities. As long as you do the activities thoroughly, your brain will still remember lots of
things, and in the future you will get that feeling of “hmm... I remember seeing something that’s related to that...” and then you will
know where to go look for the information. So it’s much like constructing a “map” in your mind.

## Read docs from `/docs/systems`

In our main repository we have [🔒 `/docs/systems/`](https://github.com/InteractionDesignFoundation/IDF-web/tree/develop/docs/systems) directory with README.md file for every system/module we have on our application.
Such `README.md` files provide a brief overview of the system and usually contains links to other docs with deeper technical details.
During onboarding you need to read `README.md` files for every system.

## Test email notifications

Go to the notification control panel on our staging/test sites. On that page, you will see information on how to test an email notification.
Please be **absolutely sure** you're not on production server but on a **staging/test site**. Ask your mentor for the URL to the test site
and the password.

Doing this activity can feel a bit grinding perhaps. But rest assured that it will pay off in the long run. It will make your work in
the codebase considerably easier in the long run.
