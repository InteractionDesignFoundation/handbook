# Onboarding: How to get domain knowledge and get overview of the codebase

We’ve developed a few onboarding activities to give you a much deeper understanding of our domain. Understanding our domain,
i.e. the platform and its features FROM OUR USERS’ PERSPECTIVE (i.e. domain knowledge) is paramount to both understanding our codebase and writing
awesome code. Great code has a small “conceptual distance” to the domain. In other words, it minimizes cognitive complexity enormously when variable
naming, method naming, database table naming and likewise are named “closely” to the the names of the concepts the users use.

Therefore, you should carry out the following activities in a thorough manner. Don’t worry if you can’t remember all of what you
see and learn after you’ve done the activities. As long as you do the activities thoroughly, your brain will still remember lots of
things, and in the future you will get that feeling of “hmm... I remember seeing something that’s related to that...” and then you will
know where to go look for the information. So it’s much like constructing a “map” in your mind.

## Activity number 1: Test all email notifications

Go to the notification control panel on our staging/test sites. On that page, you will see information on how to test an email notification.
Please be **absolutely sure** you're not on production server but on a **staging/test site**. Ask your mentor for the URL to the test server
and the password.

Please make a plan for yourself to test a number of email notifications every day so that you'll have tested all email notifications
in, say, a month at the latest. If you prefer to do it in one go, then please do that. Whatever works for you.

Doing this activity can feel a bit grinding perhaps. But rest assured that it will pay off in the long run. It will make your work in
the codebase considerably easier in the long run.

## Activity number 2:

Go to our old test cases in the Sync folder called `IDF2-Test-cases` - ping @madssoegaard to get access to that folder if you don't already have access. You should start with the files called `IDF-Test-Cases--How-to-do-testing--START-HERE.docx`
which will tell you everything you need.

Please note that these test cases are not being maintained anymore and
some of them could be (slightly) wrong. That’s okay since most of them will be correct.

For testing, you will need to familiarize yourself with the Testing Control Panel (the URL is in `IDF-Test-Cases--How-to-do-testing--START-HERE.docx` and
remember that you need to do all this on a **non-production site**.

On the testing control panel (again, on the **NON-PRODUCTION SITE**), we’ve made testing SUPER easy through our “impersonation feature”
and through listing different types of members on this page for easy impersonation.

Now that you’re familiar with the testing control panel, please open a browser in one window with the testing control panel on a
staging/test site and a test case file in another window and start testing to see all the flows of
the platform.

While you’re doing that, your brain will be constructing a map of the various states of the code, the happy path of
code execution, the edge cases, etc. etc. All this information will be super valuable during the next many years so it’s important
you’re fully concentrated. To reiterate the point from before, you will not remember every single detail and that’s okay. Your brain
will however be constructing a “map”. That way, you will find yourself in situations in the future where you will suddenly
remember some flow that may be affected by some code you’re working on. Or you will suddenly
get a feeling that you’ve seen a given screen/flow/etc before and you’ll know the full picture of what you are working on. This will
save you a ton of time later on.
