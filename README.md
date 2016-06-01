# Mic Frontend Development Test

## General Guidelines
This is a Frontend developer competency test designed to gauge skill, attention to detail and affinity for standards based development.

- Feel free to email <david@mic.com> and <anthony@mic.com> with any questions you may have.
- The code should follow best practices
- You may use any libraries or frameworks that you want for this task - but prepare to motivate your choices in the follow-up interview.
- Project structuring and setup files have been ommitted.  We would like to see how you think about project organization.
- Even though this is a small project, treat it with the mindset of a larger one.
- Commit your progress often.
- Your submission should include a readme-file with instructions on how to install & get started.

### Submission
Init a git repository, complete the test, make your commits locally and then email a compressed version of the entire code base to <david@mic.com> and <anthony@mic.com> (including the hidden .git directory).


## Implementation Details
1. The implementation should look visually identical if not better than the screenshot below.
1. Populate the page with data from `articles.json`.  Initially show 10 of the 30 articles that are populated.
>> pagination
1. At the bottom of the TABLE should be a Load More button (not shown below) that will show 10 more rows.  
>> pagination onclick
If there are no more articles to show from the bootstrapped data, then make an xhr request to `more-articles.json` and dynamically add them to the TABLE, 10 at a time.
>> use a promise instead and combine to one data array [DONE]
1. Allow the user to sort the TABLE via the `words` and `submitted` columns.
>> https://datatables.net/examples/basic_init/table_sorting.html [DONE]
1. If a user leaves the page and then returns, their previous sorting choice should be automatically set.  For this one you can ignore having your solution work in non-modern browsers.
>> state saving 
>> https://mottie.github.io/tablesorter/docs/index.html [DONE]
>> https://datatables.net/examples/basic_init/state_save.html

[![End Product](https://bitbucket.org/policymic/dev-test/raw/master/screenshot.png)](https://bitbucket.org/policymic/dev-test/raw/master/screenshot.png)

Email <david@mic.com> and <anthony@mic.com> with any questions you may have.
