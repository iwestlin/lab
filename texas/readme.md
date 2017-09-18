# A Win Rate Calculator for Texas-Holdem

[Usage GIF](http://wx4.sinaimg.cn/mw1024/7f95814bly1fgj6drtpe0g20qu0lax6x.gif)

Calculate any number of players with any hand cards and any public cards

It will take several seconds, depends on your device's CPU.

**Limited to 10000 times of random pick (on top) due to efficiency, but the mean error should be less than 1%.**[^help]

[^help]: Let's say there are 48 cards left, and we need to pick 5 cards to join the public cards, so there are 48x47x46x45x44/(5x4x3x2x1) = 1712304 different kinds of public cards, and for each group of public cards, there surely is/are one or more winners, so the win rate for each player is an exact number.<br>But we can't do so much calculate (it will take too long), so I make a limit of 10000 times. As a result, the calculation will be a little different with the real win rate, and it's usually not the same number for every calculation of same given cards.<br>So my problem is: **for how many times of random pick, the mean error between calculation and real win rate is less than 1%?**<br>If you have any idea, feel free to open a issue or contact me with [i@viegg.com](mailto:i@viegg.com)
