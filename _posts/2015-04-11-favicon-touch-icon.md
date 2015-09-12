---
layout: post
title:  "Favicon / Touch Icons: More than you bargained for"
date:   2015-04-11 20:12:0
categories: frontend
---

## Favicon / Touch Icons: More than you bargained for

You're probably familiar with the "favicon": the nifty little icon you can have go along with your website, that will show in the tab. Originally, this was just a 16x16 px .ico file you would create, drop into your docroot, maybe add a link tag in your <head>, and be done with it. These days, that little icon is not so little, and it's showing itself in many more ways than a little blip next to your page title. iOS and Android have expanded on it with "touch icons", which can be used with the "add to home screen" feature that lets you bookmark a website to show on your home screen like an app would. Windows 8+ and Windows Phone have the "Tile", and you can pin your website like an app similar to iOS & Android. Even the favicon.ico itself has changed as it is capable of being used in more places, going from 16x16 to 32x32 and 48x48.

### You're going to need a lot of images... and vendor-specific code.
If you intend to support all these variations, unfortuantely it's going to mean a lot of variations of your icon to fit all these dimensions. If you do a bit of digging on the subject (which I have), you'll eventually find some good detailed articles explaining all the various sizes you need, most of which need a <link> tag of their own in your <head> to call them out. In the case of Windows Tiles, you also have additional metadata to add to the mix. All said and done, it's very possible for you to end up with close to a dozen image files, and a tag or so to... tag along. To make matters worse, all it's going to take is a vendor releasing a new version of their product with a higher pixel density, and suddenly you need a new icon to add to the mix.

### So how can I do this (somewhat) sanely?
Fortunately, iOS and Android have in the recent past made this a less crazy thing. Prior to iOS 7, the OS would add extra styling to your image to make it match iOS unless you also provided a "precomposed" version of the icon. This is no longer the case. Android can thankfully rely on the same apple-touch-icon tag that iOS uses, so to support the newer versions of these platforms, all you need is a PNG icon at 192x192px minimum, and a link tag in your ```<head>``` like so:

```
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

Android uses 192x192 for its home screen icon, and the largest icon requirement currently for iOS is 180x180 for the iPhone6, and will scale down to the appropriate sizes for the various devices. Therefore, simply providing a large icon should meet the needs of both these platforms.

Now that iOS and Android are taken care of, we have the good ol' favicon.ico to tackle. This is also an area where browsers can scale the image down appropriately, so we can provide a large version of the icon at 48x48 minimum.

The Windows Tiles probably take the most - they need two more <meta> tags in your <head>, as well as a few variations in image sizes of their own - the highest resolutions being 310x310 and 310x150.

### Just generate it for me!
There are many "favicon" generators out there, but the vast majority of them don't account for all these variations. Fortunately, there is one [very solid generator](http://realfavicongenerator.net) available to take care of all these variations and provide support across all the major devices and browsers. You can find it at. Upload a 260x260 image, make some minor adjustments as necessary, and get all the image variations and <head> markup you need. Take what you want, leave the rest, and be on your way. It's certainly easier than looking up all the different sizes and use cases to account for. But if you want to do that, here's the [most thorough post I found on the issue](https://mathiasbynens.be/notes/touch-icons).