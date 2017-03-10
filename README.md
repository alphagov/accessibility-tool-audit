# Accessibility tool audit

Automated accessibility checkers can be used to help identify accessibility issues in digital services. They're good for finding simple and obvious problems, but aren't able to detect many accessibility issues.

This repo contains a collection of accessibility failures to be used for testing automated accessibility tools and test results from those tools.

[Read our blog post](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/) about how we did the automated tool testing.

## About the test cases

The test cases are a collection of the wide variety of potential accessibility issues that can exist. There's probably loads more we haven't thought of.

## Contributing / updating results

We welcome issues / pull requests for updated test cases or tool results. All relevant content can be found in `tests.json`. (All the HTML files are automatically created from that one file.)

## Installing

Make sure you have the gulp command installed beforehand.

``` 
npm install -g gulp
```

Then run the following commands to install the dependencies and generate the static html files.

```
npm install
gulp

```

Now you can run a local HTTP server to serve the files in this directory. Such as:

```
python -mSimpleHTTPServer
```

and click [http://localhost:8000/](http://localhost:8000/) to see the generated HTML output.

You can also run gulp in dev mode, which would keep watching for files to change until you kill it.

```
gulp dev
```

## Licence

Released under the MIT Licence, a copy of which can be found in the file `LICENCE`.
