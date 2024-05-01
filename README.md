# Introduction

This is an integrated development environment for programming [GP2.](https://uoycs-plasma.github.io/GP2/).
it includes [Samuel Hand's GP2 editors](https://uoycs-plasma.github.io/GP2-Editor/) and [Ace text editor](https://ace.c9.io/)
This IDE requires electron to be installed and requires the GP2 compiler to be installed if you want to use it for running GP2 programs.

## General Usage

To run the IDE clone this repo and run:

```
cd grape
make
cd ..
electron main.js
```

To use the IDE open a project folder using the open project button. This will bring up a list of files.
Click a file to bring it up in the graphical or text editor.

## Editor Usage

The basic graph editing interface described in the table below is the same across both graphical editors. Selected elements can be edited using the toolbar at the top. Note that changing the label or ID of an element requires confirmation by means of the button next to the input, or the enter key. This prevents the entering of invalid attributes.

| Operation            |                                     Action |
| :------------------- | -----------------------------------------: |
| Create Node          |                    Double click background |
| Move Node            |                   Left click and drag node |
| Create Edge          | Right click and drag from source to target |
| Select Item          |                            Left click item |
| Delete selected item |                   Press delete on keyboard |
| Zoom In/Out          |                        Mouse wheel up/down |
| Pan                  |             Left click and drag background |

Adding an element to the left hand side of a rule will automatically add it to the right hand side. This way, any modifications made by the rule are explicitly stated by modifying the right hand side of the rule. For example, to create a rule that deletes a node, first create the node in the left hand side, then delete it from the right hand side.

Graph files can be saved by clicking the save button at the top of the window. If another file is opened before you save the current open file then progress will be lost.

The rule declaration and condition can be set in the text boxes above and below the rule, respectively.

To save a file open in the text editor press ctrl+s.
