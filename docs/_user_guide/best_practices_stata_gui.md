
# How Do I Run a Graphical Interface of STATA?

## Setting up a Graphical Interface

First, visit [this page](/faqs/howRunGraphicalInterface.html) to learn how to set up X11 forwarding on your machine. The commands `xeyes` and `xclock` are good test examples to make sure your graphical interface forwarding is working.

## Loading STATA

Next, you need to load the STATA software. You can check which STATA versions are available with the `module avail` command.  Let's say you want to load `statamp` - you can do that by running `module load`:

```
module load statamp
```

[This page](/faqs/howRunSpecificSoftwareVersion.html) has more information on loading software on the Yens.

## Running XSTATA

After loading STATA, you need to run the `xstata-mp` command.

```
xstata-mp
``` 

Stata should start with a graphical interface.  Your X11 program will also start.  Stata will probably look a little different than when you run your local copy.  