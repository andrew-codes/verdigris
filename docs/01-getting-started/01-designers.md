# Getting Started: Designers

## Running Site Locally

1. Open the terminal and change into project's root directory; `cd verdigris`
2. Run `yarn start` in the terminal
3. Open Chrome and visit [http://localhost:9000](http://localhost:9000)

## Contributing Content

Content can be updated locally, on GitHub via the link in the upper right corner, and new pages can easily be added.

### Updating Content via GitHub

Navigate to the [deployed site](http://verdigris.andrew.codes) and view the page you wish to update. In the upper right corner, click the `edit in github` button. This will take you to GitHub where you can edit the page's markdown source through their online editor. Once done, commit your changes at the bottom of the page.

<img style="max-width: 100%;" src="/assets/edit-in-github.gif" alt="Update via GitHub"/>

### Updating Content Locally

#### Documentation Pages

Docs pages are located within section directories in: `./docs`. Each section directory; such as `./docs/01-getting-started` contains Markdown files of pages. File names will be used as the menu item text; excluding the number and following dash. The number dash, `01-` is used to order content in the navigation menu. Pages and document sections are ordered by file name.

#### Component Documentation Pages

Component related documentation pages; such as "usages" and "style" may be found in the component's respective `docs` directory. For example, `analytics` main docs may be found `./packages/analytics/docs/usage.md` or `./packages/analytics/docs/style.md`. Any additional component documentation pages can be added underneath a `docs` directory within the component docs directory. `./packages/analytics/docs/docs/01-some-page.md`. Pages are ordered by file name in the navigation.

## Adding New Pages

New markdown files can be added to any docs directory. Additionally, new directories (with markdown files) added to `./docs` directory will show up as a navigation section and navigation items.

## Including Images

Images can be included in markdown; however, the files should be saved to the `./docs/assets` directory and the URL for the file should be linked as `/asests/filename.png`.
