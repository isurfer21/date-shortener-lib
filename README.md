# date-shortener-web
> A web utility to *shorten* (encode) the date and *expand* (decode) shortened date back to original date

I have developed a new way to encode/decode dates within 3 or 4 characters by using *base-99* format. 

<!--
You can click this link to open the app in your browser

[![Date Shortener Web](https://img.shields.io/badge/Link-Date%20Shortener-blueviolet?style=for-the-badge)](https://isurfer21.github.io/date-shortener-web/web/)
-->

The logic behind this utility tool and reason of it's creation is described below.

### Why did I created it?
Actually, while sharing the files across organisation I would have to maintain version numbers in the filename but those versions won't tell anything about the last updation date until I check when was it last updated. So to maintain the updation dates in the filename, I had started adding timestamp in the filename which solved my issue but looks bad and it also increases the length of the filename.

So I was searching ways to reduce the timestamp, at least the date portion to short string may be having only few characters but can tell the date. Initially, I got an idea of using base36 format instead of date and month because maximum date will be 31 which is less than 36; similary maximum month is 12 that is under 36 too. Well that solves my day-to-day problem but when I applied the same logic to years then it was limited to 36 years only. Then, I thought of using base64 format but that is also limited upto 64 years.

Since I was looking for universal date conversion, so I would require something like base99 format. I looked over the Internet but I didn't found anything like that. So I made it by my own.

### What is a base99 format?
In simple language, base99 format refers to series of 0-9 followed by small & capital A-Z characters and variations of vowel characters (as shown below); were, each character refers to the position index in series.

|	 	|	0	|	1	|	2	|	3	|	4	|	5	|	6	|	7	|	8	|	9	|
|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
| **0** |	0	|	1	|	2	|	3	|	4	|	5	|	6	|	7	|	8	|	9	|
| **1** |	a	|	b	|	c	|	d	|	e	|	f	|	g	|	h	|	i	|	j	|
| **2** |	k	|	l	|	m	|	n	|	o	|	p	|	q	|	r	|	s	|	t	|
| **3** |	u	|	v	|	w	|	x	|	y	|	z	|	A	|	B	|	C	|	D	|
| **4** |	E	|	F	|	G	|	H	|	I	|	J	|	K	|	L	|	M	|	N	|
| **5** |	O	|	P	|	Q	|	R	|	S	|	T	|	U	|	V	|	W	|	X	|
| **6** |	Y	|	Z	|	à	|	è	|	ì	|	ò	|	ù	|	À	|	È	|	Ì	|
| **7** |	Ò	|	Ù	|	á	|	é	|	í	|	ó	|	ú	|	Á	|	É	|	Í	|
| **8** |	Ó	|	Ú	|	â	|	ê	|	î	|	ô	|	û	|	Â	|	Ê	|	Ô	|
| **9** |	Û	|	Î	|	ä	|	ë	|	ï	|	ö	|	ü	|	Ä	|	Ë	|	Ï	|

To remember the series, understand the sequence types as given below:

1. Digits → 0-9
2. Latin *Small* letter → a-z
3. Latin *Capital* letter → A-Z
4. Latin *Small* letter with **grave** → àèìòù
5. Latin *Capital* letter with **grave** → ÀÈÌÒÙ
6. Latin *Small* letter with **acute** → áéíóú
7. Latin *Capital* letter with **acute** → ÁÉÍÓÚ
8. Latin *Small* letter with **circumflex** → âêîôû
9. Latin *Capital* letter with **circumflex** → ÂÊÔÛÎ
10. Latin *Small* letter with **diaeresis** → äëïöü
11. Latin *Capital* letter with **diaeresis** → ÄËÏ

Using this format, any number in between 0-99 can be represented by a character positioned in base99 sequence 

e.g., `12 → c, 19 → j, 34 → y`

where, `c` is placed at 12th position in the sequence, `j` at 19th while `y` at 34th.

Now here is a way to use the same logic for date, so to do that let us take a date and encode it as

`15-8-2019 → 15.8.2019 → f.8.kj → f8kj`

Similarly, decode it back as

`f8kj → f.8.kj → 15.8.2019 → 15-8-2019`

### How to use the app?
Follow the steps given below to encode or decode dates.

#### Encoding a provided date

1. Select the date you want to encode in input text field at *top*
2. Click on **Encode** button
3. See the result in the input text field at *bottom* and ***steps*** in between buttons

#### Decoding the encoded date

1. Enter the encoded date string in the input text field at *bottom*
2. Click on **Decode** button
3. See the result in the input text field at *top* and ***steps*** in between buttons

## Development

### New project
Here are the commands used to create new project

```
$ cargo new --lib ds
$ mv ds/* ./
$ rmdir ds
```

### Build project
Generate **debug** or **release** build using these commands of bash file

#### Debug
It would generate debug build

```
$ sh build.sh -d
```

#### Release
It would generate release build

```
$ sh build.sh -r
```

### Run project
Run **static server** using *node.js* based script having zero dependency

```
$ sh build.sh -s
```

## Install
With the added support for [Web Shell](https://webshell.surge.sh/), now the CLI port of the same app is also available.

So if you're using the *Web Shell* under same user-profile, then just click the [Install](https://webshell.surge.sh/#install%20https://dateshortener.surge.sh/js/mod.js) link for direct installation.

Otherwise to install it manually, open the [Web Shell](https://webshell.surge.sh/) on browser, run

```
install https://dateshortener.surge.sh/js/mod.js
```

That's it! Now you can try below commands.

## Usage
Open the application in terminal & run the required commands as shown below

### Examples
Few sample usages are given below

```
$ ds -t
2ckj
$ ds -t -s
2-12-2019 -> 2.12.2019 -> 2.c.kj -> 2ckj
$ ds -d 2ckj -s
2ckj -> 2.c.kj -> 2.12.2019 -> 2-12-2019
$ ds -e 2/12/2019 -s
2-12-2019 -> 2.12.2019 -> 2.c.kj -> 2ckj
```

### Help
Find out all the available command options & flags 

```
$ ds -h
DATE SHORTENER
It is a tool to shorten (encode) the date and expand (decode) shortened date back to original date.

Usage: ds [options]

Options:
    -h, --help                 display the help menu
    -v, --version              display the application version
    -e, --encode DD-MM-YYYY    encode the provided date
    -d, --decode DMY           decode the provided code
    -t, --today                encode today's date
    -s, --steps                show with steps

Examples: 
 $ ds -v 
 $ ds -t 
 $ ds -t -s 
 $ ds -e 15/08/19 
 $ ds -e 15/08/2019 -s 
 $ ds -d f8j 
 $ ds -d f8kj -s 

```

### Version
See the currently available version

```
$ ds -v
DATE SHORTENER (Version 1.0.0)
Copyright (c) 2019 Abhishek Kumar.
Licensed under the MIT License.
```
