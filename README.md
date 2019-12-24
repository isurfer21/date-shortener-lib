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

### What is a base 99 format?
In simple language, base-99 format refers to series of 0-9 followed by small & capital A-Z characters and variations of vowel characters (as shown below); were, each character refers to the position index in series.

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

e.g., `12 → c, 19 → j, 34 → y`

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

## For developers

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
