# Client-Side Javascript Framework Dashboard
A live dashboard displaying Github API metrics (and a few other stats) for leading client-side Javascript frameworks.

![Imgur](http://i.imgur.com/Y5pzyZ0.png?1)

## The problem
LaunchPad Lab is evaluating new client-side Javascript frameworks. To choose the "winning" technology, we need to compare:
- development activity
- community support
- stability
- other relevant information
- sorting and filtering of data is desirable

## Frameworks to be considered
- React: https://github.com/facebook/react
- Angular: https://github.com/angular/angular.js
- Ember: https://github.com/emberjs/ember.js/
- Vue: https://github.com/vuejs/vue

## Dashboard Requirements  
- Dashboard with automatic page refreshing
- Display about 3 metrics from API data. Choose 3 that best indicate above to be compared from this list: Watchers, Stars, Forks, Commits, Pull Requests, Issues
- Build dashboard with any front-end JS framework or better yet with vanilla JS.

## Project thought process and actions taken
- What is the basic necessary architecture & can I build it? (Yes. Angular or ajax, json, js data manipulation, rendering at intervals, bootstrap grid, etc.).
- If I don't use Angular, can I sort? (Yes, with jquery tablesorter plugin).
- Research github API. Do I need a authorization (No).
- What do other dashboards look like? Can I build the UI? (yes).
- Research API metrics to determine best indicators to solve problem (See article citations below).
- Are these metrics readily available from API? Where? (Yes. Two are and third can be approximated. Third metric: Average time to close an issue (as indicator of community support) is beyond scope of this small project due to API data batching issues and I will have to use percentage of total issues closed (vs. left open). This is not directly available but can be calculated from other available API metrics.).
- diagram minimal viable product code design to: Define variables, initiate ajax calls, repeat them on a determined schedule, combine data, run calculations and save new data into data, render data to page, enable sorting on table, show last refresh.
- pseudocode.
- clarify MVP and stretch scope requirements/goals.
- code piece by piece. test. research. refactor. repeat.
- refactoring. test against requirements.
- redesign and refine UI.

## Unsolved Problems and TODO items
- Enhance visual design with charts, possibly using canvasjs
- bug: Static table data no longer rendering
- Get rid of global variables.
- refactor code using loops etc. to follow DRY rule.
