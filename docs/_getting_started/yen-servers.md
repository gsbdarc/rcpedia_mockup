# Yen Servers

## Latest Updates

_Last updated: 2023-05-25_

## Introduction

Welcome to the Yen Servers documentation. This site provides information on data, analytics, and research computing.

## Data, Analytics, and Research Computing

Explore the various resources and documentation available for Yen Servers.

At the GSB, we have a collection of Ubuntu Linux servers (the `yen` cluster) specifically for doing your research computing work.  If you are a faculty member, PhD student, post-doc or research fellow, by default you should have access to these servers.  They are administered by the [Stanford Research Computing Center (SRCC)](https://srcc.stanford.edu) and located in Stanford's data centers.

{% include important.html content="The `yen` servers are not designed for teaching or high risk data." %}

## Why use the `yen` servers?

These servers offer you several advantages over using a laptop or desktop computer.

#### Better Hardware

Let's use the server `yen2.stanford.edu` as an example: this machine has 256 processing cores and about 1 TB of RAM.  With `yen2`, you are able to complete memory- or CPU-intensive work that would overwhelm even the best personal laptop!

#### Long running jobs

Even when your laptop is capable of doing the job, you may still want to offload that work to the external server.  The server can free up resources for your laptop to use for other tasks such as browsing web sites, reading PDF files, working with spreadsheets, and so forth. If your laptop crashes, it's very convenient for your compute jobs to continue!

#### Licensed software

Tools like Matlab and Stata aren't free for personal use, but are installed and licensed to use on the `yen` servers.


<div class="row">
    <div class="col-lg-12">
      <H1> </H1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
     <div class="fontAwesomeStyle"><i class="fas fa-tachometer-alt"></i> Current cluster configuration</div>
    <iframe class="airtable-embed" src="https://airtable.com/embed/shr0XAunXoKz62Zgl?backgroundColor=purple" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
    </div>
    <div class="col col-md-2"></div>
  </div>

<br>
## How to connect

{% include tip.html content="New to using a research server?  Learn about [Getting Started](../gettingStarted)" %}

There are various ways to connect to the `yen` servers.

* SSH in to `yen.stanford.edu`
* A terminal on [JupyterLab](webBasedCompute.html)
* RStudio or Jupyter Notebook on [JupyterLab](webBasedCompute.html)

When you SSH in to `yen.stanford.edu`, a load-balancer will assign you to `yen1`, `yen2`, `yen3`, `yen4` or `yen5`.  The `yen10`, `yen11`, `yen12`, `yen13`, `yen14`, `yen15` and `yen-gpu1` servers can only be accessed using the [scheduler](scheduler.html).

{% include tip.html content="Any work running on an interactive server (yen[1-5]) can only be started or stopped from that server." %}

## Other page

# Overview of the Yen Computing Infrastructure
![](/images/yen-computing-infrastructure.png)

When you access the yen cluster, you get directed to your home directory on the interactive yen (yen1, yen2, yen3, yen4 or yen5).
At this point, you can manage your files, get them ready for submission, submit a job that will execute on yen-slurm cluster,
view the status of pending jobs and so on.

Once you submit your job, it gets queued along with all the other jobs submitted by other yen users.
We use a scheduler to automatically form a *queue of jobs* with a fair share of common resources like cores and memory.
When the required amount of resources (CPU cores and/or memory) becomes available, the batch scheduler executes your job.
We use <A HREF="/training/3_yen_slurm.html" target="_blank">Slurm scheduler</A> as our job scheduler (and so does <a href="https://www.sherlock.stanford.edu/docs/overview/introduction" target="_blank">Sherlock HPC</a> and a lot of other supercomputers
at various academic institutions and national labs).

### Yen10 node
![](/images/yen10-node.png)

Yen-Slurm has 9 nodes - yen[11-17] and yen-gpu[1-2], each with multiple CPU's (processors) containing multiple cores and some with GPU's.

For example, yen11, yen[15-17] have 2 CPU's, each with 128 cores for the total of 256 CPU cores and 1 TB of RAM; yen[12-14] each have 1.5T of RAM and 32 CPU cores; yen-gpu[1-2] nodes have 64 cores, 256 G of RAM and 4 GPU's. Together, yen-slurm cluster of 9 nodes has 1248 CPU cores, 9 T of RAM and 8 GPU's.

## Other page
#  Introduction to the Yen Servers
As a supplement to everything you can do on your own computer, the GSB has several Linux servers that you can use
for your computing needs. These Linux research servers are useful for a variety of tasks, including when you want or need to:

- Run a program over a long period of time and do not want to leave your personal computer on and running
- Run a program that will use a lot of memory (such as when analyzing a large data set)
- Take advantage of parallel processing
- Access software for which you do not have a personal license
- Save files in a place where multiple people can access and work with them

## Yen Servers

![](/images/intro_to_yens/yens.png)

At the GSB, we have a collection of Ubuntu Linux servers (the `yen` cluster) specifically for doing your research computing work.
 If you are a faculty member, PhD student, post-doc or research fellow, by default you should have access to these servers.

<div class="row">
    <div class="col-lg-12">
      <H1> </H1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
     <div class="fontAwesomeStyle"><i class="fas fa-tachometer-alt"></i> Current cluster configuration</div>
<iframe class="airtable-embed" src="https://airtable.com/embed/shr0XAunXoKz62Zgl?backgroundColor=purple" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
    </div>
    <div class="col col-md-2"></div>
  </div>

---
## Why use the `yen` servers?

These servers offer you several advantages over using a laptop or desktop computer.

#### Better Hardware

Let's use the server `yen3.stanford.edu` as an example: this machine has 256 processing cores and 1 TB of RAM.
In comparison, my MacBook Pro has 6 cores (double-threaded so it looks like 12 cores) and 32 GB of RAM. With `yen3`, you are able to complete memory- or CPU-intensive work that would overwhelm even the best personal laptop!

#### Long running jobs

Even when your laptop is capable of doing the job, you may still want to offload that work to the external server.
The server can free up resources for your laptop to use for other tasks such as browsing web sites, reading PDF files,
working with spreadsheets, and so forth. If your laptop crashes, it's very convenient for your compute jobs to continue!

#### Licensed software

Tools like Matlab and Stata are installed and licensed to use on the `yen` servers.


#### Storage

The project files and any large output should live on ZFS file system (not in your home). The ZFS capacity is nearly 1 PB (petabyte).

{% include important.html content="The Yen servers are *not* approved for high risk data." %}
