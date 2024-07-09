# Yen Servers

## Introduction

Welcome to the Yen Servers documentation. This site provides information on data, analytics, and research computing.

## Data, Analytics, and Research Computing

Explore the various resources and documentation available for Yen Servers.

## Latest Updates

_Last updated: 2023-05-25_

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

