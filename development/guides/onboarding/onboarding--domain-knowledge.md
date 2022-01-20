# How to get domain knowledge

We’ve developed a few onboarding activities to give you a much deeper understanding
of our domain. Understanding our domain, i.e. the platform and its features from
our **users’ perspective** (i.e. domain knowledge) is paramount to both understanding
our codebase and writing awesome code. Great code has a **“small conceptual distance”**
to the domain. In other words, it brings cognitive ease when variables, methods, database tables,
models, services, operations, and likewise come directly from domain-specific vocabulary.

Don't expect to grasp/understand/remember everything you read during your onboarding.
Look at it as a map which you can refer to down the road.

## Read docs from `/docs/domain`

In our main repository we have [🔒 `/docs/domain/`](https://github.com/InteractionDesignFoundation/IxDF-web/tree/develop/docs/domain) directory with README.md file for every system/module we have on our application.
Such `README.md` files provide a brief overview of the system and usually contains links to other docs with deeper technical details.
During onboarding you need to read `README.md` files for every system.

## Test email notifications

Go to the [notification control panel](https://develop.information-architecture.org/admin/notifications)
on our staging/test sites (You can find the basic-auth credentials in lastpass).
On that page, you will see information on how to test an email notification.

Please be **absolutely sure** you're not on production server but on a **staging/test site**.

Doing this activity can feel a bit grinding, but rest assured that it will pay off
in the long run. It will make your work in the codebase considerably easier.
