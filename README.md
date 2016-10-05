# Trains

A first look at `creat-react-app` to see what all the fuss is about and a counter project to something I'm working on with Riot.

View it here: https://adrianblynch.github.io/trains/

## Notes

- fecha - A lightweight date formatting lib
- react-router - Version 4 with ~~a manual fix~~ route `div` wrapping child fix for an [issue with multiple routes](http://stackoverflow.com/questions/39529711/react-router-v4-with-babel-gives-error-with-multiple-routes)
- Flexbox - The project this is mimicking has to support IE9, so no Flexbox, I have no such restrictions
- No Redux - Upon installing, I went to grab Redux. Instead I decided to leave it out
- Data - Rather than doing a request for data, the search data is made available in JSON files
- Data - It's not optimised for updating. It's nested more than it should be
- `build` is included as it's used as the root of the `gh-pages` branch
- Push `build` folder only to `gh-pages` branch: `git subtree push --prefix build origin gh-pages`
- The route patterns are done losely to allow the app to live in the webroot and a sub folder without any other changes (not great)
- A post build script is used to remove the leading `/` from `index.html`: `"build:post": "sed -i '' 's/\\/static/static/g' build/index.html",`
- `npm run serve` runs a python module to serve from the build folder
