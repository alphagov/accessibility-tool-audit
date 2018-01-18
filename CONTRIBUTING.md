# How to contribute

We welcome issues / pull requests for updated or new test cases or tool results.

Make changes to the build files first (mainly 'tests.json' but also anything under the 'build' folder) and add the static files that get created or updated via the `gulp` command in a separate commit last.
You also might want to update 'changelog.json' but it likely needs changing again to update the date to be the date when the Pull Request gets merged.
It's also fine if you don't add the changes to the the changelog and static files at all, we can do that before we merge.

When using a tool, use all the most inquisitive options. For example, if you have the choice between AA and AAA, choose AAA. If you have the choice to add options which don't seem to be related to accessibility (SEO, for example), test those as well.

You should check each test page on its own and not the one big page including (nearly) all tests. Then check if the one particular issue we were expecting to find on that page is found or not. To look for just one issue makes it easier to find.
Don't test any of the test pages which contain only a link to an "example page" but test that example page instead to which the links points. Those are the pages that are not included within the one big page but need to be on pages of their own.

When you add or change the test results, you need to note them as the key in the `resultsCopy` variable in 'build/generate.js'. That will be automatically translated to what you see on the results page (for example, "error" translates to "Issue found" and "notfound" translates to "Not found").


## Update test results

When you have found a result you disagree with or you re-test a tool because it was updated, you should add your changes to the `results` of each relevant test entry within 'tests.json'.


## Change code examples

When you can think of an improvement to an existing test case, you should update the `example` of each relevant test entry within 'tests.json'. Then you should re-test that example with **every single tool** and update their results accordingly.


## Add new code examples

If you like to add a new test case, create a new entry within 'tests.json' as the last entry under its most relevant section ("Content", "Page Layout", etc). Then test **every single tool** with that example and update their results accordingly.

Because some tools don't work with local files, you can add the example to a [JS Bin](http://jsbin.com/) or similar and test that instead. That also helps developing that example as making the changes within 'tests.json' is cumbersome.

Try to make the example as isolated as possible. Although complex examples make more realistic test cases, testing for one specific issue is easier and more reliable to test for.


## Add new tool

We currently only accept tools which are either free or free to try and which are not based on any tool we have already covered. When it's a paid for tool, it should have a pricing option which is affordable by a small team. It must have a web presence with all important information.
It's best to first open a [GitHub issue](https://github.com/alphagov/accessibility-tool-audit/issues/new) and ask if we would accept the tool. That will reduce potentially wasted efforts.

When you add a new tool, you will need to check every single of the test cases.

To add a new tool you would need to add it to these files:

* 'build/analysis.js': add the name as a slug to `toolNames`
* 'build/generate.js': add that slug and its proper full name to `toolNamesCopy`
* 'build/generate.js': add the name and URL to `tools`
* 'build/templates/results.html': add a new `th` to the end of the table head
* 'build/templates/results.html': add a new `td` to the end of the inner loop within the table body by referencing the slug within the variables
* 'build/templates/index.html': research the necessary features and add a new table row at the end of the feature comparison table and fill it with the relevant facts about the tool

Then add results of this tool by adding a new `results` line to every single entry in 'tests.json'.
