## Purpose
This script automatically does houskeeping work:

* Sets the `marker-color` for places by the network speed
* Updates README.md

Color  | Hex     | Speed
------ | ------- | -----
Red    | #C24740 | 0 ~ 4 Mbps
Yellow | #F3AE1A | 4 ~ 10 Mbps
Green  | #50C240 | 10+ Mbps

## Prerequisite
[Node.js](https://nodejs.org/)

```shell
cd tools
npm install
```

## How to run

```shell
./tools/housepeeker.js
```
