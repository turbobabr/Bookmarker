<img src="https://raw.githubusercontent.com/turbobabr/Bookmarker/gh-pages/docs/bookmarker_github_hero.png">
===============

Bookmarker is an ultimate solution for [Sketch App](http://bohemiancoding.com/sketch/) to bookmark layers and navigate through the toggled bookmarks using predefined shortcuts or special overview mode.

This plugin is a real time saver when you work with huge documents and want to quickly navigate to any known part of it!

## Installation

1. [Download Bookmarker.zip archive file]().
2. Reveal plugins folder in finder ('Sketch App Menu' -> 'Plugins' -> 'Reveal Plugins Folder...').
3. Copy downloaded zip file to the revealed folder and un-zip it.
4. You are ready to go! :)

## Change Log

##### v0.1.0: December 7, 2014

- Initial release with a bunch of bugs! :)

## Usage

<iframe name='quickcast' src='http://quick.as/embed/mqegfqy2' scrolling='no' frameborder='0' width='100%' allowfullscreen></iframe><script src='http://quick.as/embed/script/1.63'></script>

Bookmarker can be used in many ways. The primary feature is...

### Bookmarking selected layers and assigning shortcuts

1. Select one or several layers you want to bookmark.
2. Hit `Control-Shift-[0..9]` to bookmark them, where `[0..9]` is a numeric key and a slot number you want to assign the created shortcut to.

In case the shortcut is taken by the existing bookmark, it will be re-assigned to a new one and the previously assigned bookmark will be automatically discarded.

### Auto-Bookmarking selected layers

[!Screencast][https://raw.githubusercontent.com/turbobabr/Bookmarker/gh-pages/docs/screencast_placeholder.png]

There is a handy command for bookmarking selected layers and get the created bookmarks auto-assigned with `Control-[0..9]` shortcuts:

1. Select one or several layers you want to bookmark.
2. Hit `Control-B` to bookmark them.

In case there is an empty slot in `Control-[0..9]` shortcuts set, the first empty shortcut will be auto assigned to the created bookmark. Otherwise it will have no assigned shortcut.

#### Navigate: Using number shortcuts

You can navigate to the bookmarked layers that were assigned to a specific shortcut using:
- `Control-[0..9]`, where `[0..9]` is a numeric key and a slot number of the shortcut you want to navigate to.

#### Navigate: Using 'Bookmarks Panel'

When you have a huge list of meaningfully named bookmarks its easier to navigate using bookmarks panel:

1. Activate 'Bookmarks Panel' using `Control-Shift-B` shortcut.
2. Select any listed shortcut from the panels' list using mouse or `Up/Down` keys:
3. Click `OK` button or hit `Enter` to navigate.

#### Navigate: Using 'Overview Mode'

A very convenient way of navigation through bookmarks is using of overview mode:

1. Switch to the `Overview Mode` using `Control-Z` shortcut.
2. Select the bookmark you want to navigate to.
3. Hit `Control-Z` to navigate to it.

#### Navigate: Using 'Prev/Next' commands

- Previous bookmark `Control-Shift-,`
- Next bookmark `Control-Shift-.`

#### Remove: Certain bookmark

To remove a certain bookmark:

1. Switch to the `Overview Mode` using `Control-Z`.
2. Select the bookmark you want to remove.
3. Hit `Command-Delete` to remove it.
4. Use `Control-Z` shortcut to exit from overview mode.

In case bookmark had the assigned shortcut to it, it will be emptied.

#### Remove: All bookmarks

You can remove all the bookmarks from the document using the following two techniques:
- By removing layer named `#bookmarkerMetaLayer#` that is located at the bottom of your layer list in the first page of your document.
- By running plugin `Bookmarker -> Remove All Bookmarks`

## Feedback

If you discover any issue or have any suggestions, please [open an issue](https://github.com/turbobabr/bookmarker/issues) or find me on twitter [@turbobabr](http://twitter.com/turbobabr).

## Credits

TODO: Credits go here!


## License

The MIT License (MIT)

Copyright (c) 2014 Andrey Shakhmin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.