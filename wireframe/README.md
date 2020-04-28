# Implementation Notes

Four states need to be represented:

1. Screen Filled With Columns
2. Screen Filled With Columns and Image Drawer Open
3. Screen With Only Partial Columns
4. Screen With Partial Columns and Image Drawer Open

Constraints:

Image drawer should hide one column when the screen is filled with columns.

When the screen is only partially filled with columns:

  * columns should be displayed at their max width
  * image drawer should occupy the remaining part of the screen
