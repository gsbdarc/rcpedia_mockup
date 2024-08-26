# What is a "man-in-the-middle" warning?
<div class="last-updated">Last updated: 2020-03-13</div>

If you try to log in to the Yen servers after a long time, or after a major upgrade, you may get something like the following error:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
```

You can resolve this by removing the mismatched host key in your `known_hosts` file.

 The following loop can be run in your local terminal to run  `ssh-keygen` for all of the yens, which will clear out the entries in your `known_hosts` file:

```bash
mach=( "yen1" "yen2" "yen3" "yen4" )
for m in "${mach[@]}" ; do 
    ssh-keygen -R ${m}
    ssh-keygen -R ${m}.stanford.edu
done
```

Learn more about connecting to the Yens [here](/yen/index.html).
