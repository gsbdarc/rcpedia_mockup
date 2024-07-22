<div class="row">
    <div class="col-lg-12">
      <H1> </H1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
     <div class="fontAwesomeStyle"><i class="fas fa-tachometer-alt"></i> Platform Limits</div>
<iframe class="airtable-embed" src="https://airtable.com/embed/shrGC2dYzvDSgJfXa?backgroundColor=purple" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
   </div>
    <div class="col col-md-2"></div>
  </div>
<br>

## Best Practices


This page outlines usage guidelines for the yens with respect to system resources. See our [Topic Guides](/topicGuides/index.html) page for specific resource management techniques for commonly used software on the yens, including **Python**, **Matlab**, **R** and **Stata/MP**.

The yen systems comprise a *shared* cluster that hosts many researchers at the GSB. As these are powerful systems (32 CPUs and 1.5 TB RAM on Legacy Yens, 256 CPUs and 1 TB RAM on Next Gen Yens), it is common for them to be used for complex jobs that may take hours, days or even longer to complete. For this reason it is important that all users of these systems understand how to limit their momentary resource footprints so that the larger community is not negatively impacted. 

When using the yens, please adhere to some community best practices: 

- Be aware of your resource footprint
- Restrict your code to a maximum community guidelines above
- Clean up temporary files to free up disk space
- Use `gsbquota` to ensure you don't exceed your quota
- Check in on large jobs periodically 
- Avail yourself of platform-specific techniques that limit resource gobbling
- When in doubt, ask!


### Be Aware

Take the time to understand how your code will impact the environment it which it runs. Is your platform configured to claim all available resources (please fix that)? Are you using actively using all of the RAM you have (consider saving to disk or clearing that out)? Is one of the yens particularly impacted during conference season (try another yen)? **You are part of a community, and overuse impacts everyone**. Please be a good neighbor!

### Monitor Your Children

Unix `top` and `htop` are typical, easy to understand tools that can provide quick insights into all the system’s processes, including your own. Columns in both tools can be sorted by CPU, RAM, VRAM, or PID. `htop` also provides nice CPU graphs. Make sure your job is behaving as expected - pay particular attention to processes that use *increasing* amounts of RAM or try to use all available CPUs.  If you notice a problem, halt your job and fix the issue before restarting it.

If you are claiming too much CPU or RAM at one time then your jobs will be automatically killed, or the DARC team may contact you directly to ask you to terminate your job. This is always a drag for everybody. Please don’t make us do this. 

**An Example**

Here is a typical scenario: I have a complex compute task that involves some multiprocessing code, and I plan to run it on the yens for the first time. Instead of simply launching my code and walking away, I open a `screen`,launch my code, detatch from my `screen`, and run the `htop` command to see what my code is doing. This is what I see:

![htop output for well-behaved code](/images/proc_monitoring.png)

What I observe is that my code (_user_: **jbponce** _command_: **python3 m_test.py**) has claimed 10 cores, with one thread per core. The CPU graphs above confirm this. Excellent! I'm glad to see my code is running and operating within the community guidelines, so I can safely detach from my `screen` and check on the progress later. 

{% include warning.html content="Note that in certain cases jobs that claim excessive amounts of CPU or RAM may be terminated automatically to preserve the integrity of the system" %}

### Know Your Tools

Review the [parallel processing page](/topicGuides/index.html) on our site. You may learn something in there that you didn’t know before. In particular, be sure to read the Restrict Multithreaded Programs When Running in Parallel page, which discusses the sometimes counterintuitive pros and cons of multithreaded code in general. The last section of this page (below) has practical information and code examples for managing resources on various platforms.

### We're Nice

We are here specifically to help people do meaningful research at the GSB, and we have a lot of expertise on hand. If you have questions, or if you feel you would like some guidance with your project then reach out and let us know how we can help. It is common for us to talk with people who are simply not aware of all the options we provide for computational research. Chances are we can speed up your work and keep our systems usable for everybody, all at the same time. Please contact the DARC team at <gsb_darcresearch@stanford.edu>.
