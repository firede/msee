# Headline 1

This is a test document it contains a lot of text that should be wrapped to multiple lines. 日本語のテキストも書いてあります。どうしてかというと漢字はコンソールで二つの半角のスペースを使っています。

---

We also make sure that there is inline _italic_ and **bold** text. Maybe even _**bold italic**_ text? And how about `code` or **`bold code`** or _**`bold italic code`**_? Maybe we need some __bold__ statements written with *italic* letters? or `**bold code**` that is processed other wise? &copy; Should become © or shouldn't it? Multiple spaces like here   should turn into a single space	even with a tab. To ensure a space we can still use &nbsp;&nbsp;, can't we?

## A few ways to link

[A link somewhere](http://somewhere.to.go)
[http://somewhere.to.go](http://somewhere.to.go "With a title")
http://somewhere.to.go
<http://somewhere.to.go>
[`A code link to somewhere`](http://somewhere.to.go)
[_An italic link to somewhere_](http://somewhere.to.go)
**[An bold link to somewhere](http://somewhere.to.go)**
[link][]
[link to nowhere][]
[numbered link][1]

[link]: http://somewhere.to.go  "With another title" 
[1]: http://somewhere.to.go  "Numbered title" 

## Images

![An image](./image.jpg)
[![A linked image](./image.jpg)](http://somewhere.to.go)

## Regular Lists

Here is some perfectly normal text before a list, just to make sure that the spacing is good.

- Regular Entry
    - with a deep list
- Very, very long entry with a lot of text. So much text in fact that it will usually require a line-break to contain it all. This text is also containing some japanese characters like こんにちは and どうもありがとうミスターロボット to check for multi-line entries
- Lists should even support indented code
    ```
    For the fun of it
    ```
- Another entry with a [link](http://somewhere.to.go)
    + Deep lists with 
    + `x` or
    + other deep lists
        * with stars should work
        * fine as well
- A list entry with follow up lines
    that are indented both with spaces
	and with tabs for the sake of testing.

	even with multiple lines in the mix
    これは問題ないでしょうか？

Same thing after the list.

- But lets end with a list anyways
- To make sure that the spacing to a header is good as well.

## Ordered Lists

Another good text before an ordered list.

1. Regular Entry,
2. Very, very long entry with a lot of text. So much text in fact that it will usually require a line-break to contain it all. This text is also containing some japanese characters like こんにちは and どうもありがとうミスターロボット to check for multi-line entries
3. Indented Blockquotes should be fine too
    > For the fun of it
    > Lets have a blockquote contest
4. Another entry with a [link](http://somewhere.to.go)
5. While we are at it
    1. It should be possible to have nested lists with 4 spaces too
	2. But also with tabs
	    1. even nested entries of nested entries shouldn't break this.
		2. Perhaps I am naive?

Same thing after the list.

2. Also testing if the order of the numbering is
1. Of any value or if we
20. Completely ignore them same as markdown does ...

## Code

Code should be writable inline like `this` and even support back-ticks like  ``hello` world`` but also as a block like:

```JavaScript
// &copy; 2016
function anExamplaryJavaScriptMethod () {
    return whyDoesThisLegacyObject.haveAMethodThatRequiresManyArgumentsAndSuchALongTitle(its, to, test, wrapping, of, code)
}
```

Lets make sure that maybe some other formatting is supported as well

```C
/* Hello World program */
#include<stdio.h>

int main() {
   printf("Hello World");
   return 0;
}
```

## Quotes

> You should know this is a header
> ================================
> 
> There is also support for quotes with `code` and [a link](http://somewhere.to.go) and some **bold** text that explodes this line totally.
> 次の行目もテキストがたくさんが入っています。_どうして_ フォマッティングがおかしくなるのをテストするからです。もしかして短いテキストは問題なしに連打されているかもしれません。
> 
> > Even nested Quotes are fine, arn't they
> 
>  - Sometimes we have even lists in quotes
>  - Sometimes long lists
> 
> 
>     Code blocks should work too! with a lot of text
>     multiline even
> 
> lets see if all this work.

## Table

| We  | even | support | tables |
|-----|------|---------|--------|
| but | sadly | only   | single-line |
| how | about | _italic_ | or **bold** |
| `text` | it should be as formatted as | &copy; | but [better](http://somwhere.to) |
| perhaps | a very long text block in the middle of this is not needlessly wrapped after some point | and | maybe |
| even | missing |
| columns | don't | disturb |
| the | engine |

### Some ...

#### ... More ...

##### ... Headers

Headers with underlines
=======================

Could be written in various ways
--------------------------------



