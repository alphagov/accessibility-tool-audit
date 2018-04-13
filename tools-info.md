# More info on tools

When updating results for a specific tool it helps to know if or when a tool has been updated last and what to look out for when testing it.


## Options and settings

Try to use all the most inquisitive options. This is a list of options per tool which we are aware of and used:

* Google Accessibility Developer Tools: default
* Tenon: default
* WAVE: default (make sure to look at all details, not just "errors" and "alerts")
* HTML CodeSniffer: choose WCAG2AAA standards, select errors and warnings and notices
* aXe: choose all tags (wcag2a,wcag2aa,section508,best-practice,experimental) or use the aXe-Coconut extension
* Asqatasun: "Audit Pages" not "Audit Full-site" (some tests won't run in the full-site audit), choose level AAA (RGAA 3.0),
* SortSite: WCAG 2.0 AAA, Section 508 Refresh (2017), Check screen reader support, Universal reading age, check Compatibility (with default settings), Search (with all options), Standards (with all options), Usability
* EIII: (none)
* AChecker: Enable HTML Validator, Enable CSS Validator, choose WCAG 2.0 (Level AAA)
* Nu Html Checker: add image report
* Siteimprove: choose AAA conformance, select error and warning and review severity
* FAE: default (except it's recommended to uncheck 'include pass and n/a results' for better readability)
* ASLint: default


## Changelogs

To know if a tool was updated since we last tested it, check these changelogs:

* [Google Accessibility Developer Tools changelog](https://github.com/GoogleChrome/accessibility-developer-tools/releases)
* [Tenon changelog](https://tenon.io/documentation/changelog.php)
* WAVE doesn't have a changelog, but they occasionally [blog about WAVE updates](https://webaim.org/blog/?s=wave)
* [HTML CodeSniffer changelog](https://github.com/squizlabs/HTML_CodeSniffer/releases)
* [aXe changelog](https://github.com/dequelabs/axe-core/releases)
* [Asqatasun changelog](https://github.com/Asqatasun/Asqatasun/releases)
* [SortSite changelog](https://www.powermapper.com/products/sortsite/versions/) is only for the Desktop version, but presumably the history of the online version must be very similar
* [EIII changelog](https://gitlab.tingtun.no/eiii_source/checker-suite/commits/master)
* [AChecker changelog](https://github.com/inclusive-design/AChecker/releases)
* [Nu Html Checker changelog](https://github.com/validator/validator/releases)
* Siteimprove doesn't have a changelog, but their [Siteimprove Chrome extension](https://chrome.google.com/webstore/detail/siteimprove-accessibility/efcfolpjihicnikpmhnmphjhhpiclljc) lists a version number and a date when it was last updated
* [FAE changelog](https://fae.disability.illinois.edu/abouts/versions/)
* ASLint doesn't have a changelog, but the footer of the visible UI lists a version number and a date when it was last updated
