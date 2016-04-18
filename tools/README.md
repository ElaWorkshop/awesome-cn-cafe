## Purpose
This script automatically does houskeeping work:

* Sets the `marker-color` for places by the network speed
* [TODO] Updates README.md

Color  | Hex     | Speed
------ | ------- | -----
Red    | #C24740 | 0 ~ 5 Mbps
Yellow | #F3AE1A | 5 ~ 10 Mbps
Green  | #50C240 | 10+ Mbps

## Prerequisite
[Node.js](https://nodejs.org/)

## How to run

```shell
node tools/housepeeker.js
```
