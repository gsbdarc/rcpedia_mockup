#  How Do I Check my Resource Usage on the Yens?
If you would like to check your resource usage on the Yens, there are a few tools available.

- `htop` allows you to get an overview of the activity on the whole system that you are logged into. Furthermore, you can inspect your own processes by typing `htop -u <SUNetID>`. A lot more information about how to decipher the information produced with this command can be found on [this page](/yen/community.html).
- `gsb-watcher` is a tool written by our team that outputs your CPU and memory usage in one-line statements every second. This is especially useful when you are actively monitoring a running script.
- `topbyuser` is another tool written by us that lists out the active users on the Yen you are logged into and the amount of resources they are currently using.

{% include important.html content="We have [community guidelines](/yen/community.html) to illustrate responsible use of our shared resources that our users are expected to follow. These guidelines ensure that the servers can remain accessible to everyone." %}

## Other page
##  Monitoring Usage
## Monitoring Your Resource Footprint

Certain parts of the GSB research computing infrastructure provide
environments that are managed by a scheduler (like <a href="/services/sherlock.html" target="_blank">Sherlock</a> or <a href="/yen/scheduler.html" target="_blank">Yen-Slurm</a>). In these cases it is not necessary for individuals to monitor resource usage themselves.

However, when working on systems like the <a href="/yen/index.html" target="_blank">interactive yens</a> where resources like **CPU**, **RAM**, and **disk space** are _shared_ among many researchers,
 it is important that all users be mindful of how their work impacts the larger community.

{% include tip.html content="When using interactive yens, use the ```htop``` and ```userload``` commands to monitor CPU and RAM usage. Use the ```gsbquota``` command to monitor disk quota." %}

### CPU & RAM

Per our <a href="/yen/community.html" target="_blank">Community Guidelines</a>, CPU usage should always be limited to 48 CPU cores/threads per user at any one time on yen[2-5] and up to 12 CPU cores on yen1.
Some software (R and RStudio, for example) default to claiming all available cores unless told to do otherwise.
These defaults should always be overwritten when running R code on the yens. Similarly, when working with multiprocessing code in languages like Python,
care must be taken to ensure your code does not grab everything it sees. Please refer to our parallel processing <a href="/topicGuides/index.html" target="_blank">Topic Guides</a> for information about how to limit resource consumption when using common packages.

One easy method of getting a quick snapshot of your CPU and memory usage is via the ```htop``` command line tool. Running ```htop``` shows usage graphs and a process list that is sortable by user, top CPU, top RAM, and other metrics. Please use this tool liberally to monitor your resource usage, especially if you are running multiprocessing code on shared systems for the first time.

The ```htop``` console looks like this:

![htop output for well-behaved code](/images/proc_monitoring.png)


{% include warning.html content="Note that in certain cases greedy jobs may be terminated automatically to preserve the integrity of the system." %}

The `userload` command will list the total amount of resources (CPU & RAM) all your tasks are consuming on that particular Yen node.

```bash
$ userload
```
### Disk

Unlike personal home directories which have a 50 GB quota, faculty project directories on <a href="/storage/fileStorage.html" target="_blank">yens/ZFS</a> are much bigger (1T default).
Disk storage is a finite resource, however, so to allow us to continue to provide large project spaces please always be aware of your disk footprint. This includes compressing files when you are able, and removing intermediate and/or temp files whenever possible.
See the <a href="/storage/fileStorage.html" target="_blank">yen file storage page</a> for more information about file storage options.

Disk quotas on all yen servers can be reviewed by using the ```gsbquota``` command. It produces output like this:

```bash
nrapstin@yen1:~$ gsbquota
/home/users/nrapstin: currently using 39% (20G) of 50G available
```

You can also check the size of your project space by passing in a full path to your project space to `gsbquota` command:

```bash
nrapstin@yen1:~$ gsbquota /zfs/projects/students/<my-project-dir>/
/zfs/projects/students/<my-project-dir>/: currently using 39% (78G) of 200G available
```


## Example
We are going to continue using the same R example, `investment-npv-parallel.R`, and experiment running it on multiple cores and monitoring our resource consumption.

To monitor the resource usage while running a program, we will need three terminal windows that are all connected to the **same** yen server.

Check what yen you are connected to in the first terminal:

```bash
$ hostname
```

Then `ssh` to the same yen in the second and third terminal windows. So if I am on `yen3`, I would open two new terminals and `ssh` to
the `yen3` in both so I can monitor my resources when I start running the R program on `yen3`.

```bash
$ ssh yen3.stanford.edu
```

Once you have three terminal windows connected to the same yen, run the `investment-npv-parallel.R` program after loading the R module
in one of the terminals:

```bash
$ ml R
$ Rscript investment-npv-parallel.R
```

Once the program is running, monitor your usage with `userload` command in the second window:

```bash
$ userload
```
Run `htop -u $USER` in the third window, hwere `$USER` is your SUNet:

```
$ htop -u $USER
```

While the program is running you should see about 1 CPU core is being utilized in `userload` output and one R process is running in `htop` output because we
specified 1 core in our R program.

```bash
$ userload
nrapstin         | 0.99 Cores | 0.00% Mem on yen3.stanford.edu
```

Let's modify the number of cores to 8:

```R
# In the context of economics and finance, Net Present Value (NPV) is used to assess
# the profitability of investment projects or business decisions.
# This code performs a Monte Carlo simulation of Net Present Value (NPV) with 500,000 trials in parallel,
# utilizing multiple CPU cores. It randomizes input parameters for each trial, calculates the NPV,
# and stores the results for analysis.

# load necessary libraries
library(foreach)
library(doParallel)

options(warn=-1)

# set the number of cores here
ncore <- 8

# register parallel backend to limit threads to the value specified in ncore variable
registerDoParallel(ncore)

# define function for NPV calculation
npv_calculation <- function(cashflows, discount_rate) {
  # inputs: cashflows (a vector of cash flows over time) and discount_rate (the discount rate).
  npv <- sum(cashflows / (1 + discount_rate)^(0:length(cashflows)))
  return(npv)
}

# number of trials
num_trials <- 500000

# measure the execution time of the Monte Carlo simulation
system.time({
  # use the foreach package to loop through the specified number of trials (num_trials) in parallel
  # within each parallel task, random values for input parameters (cash flows and discount rate) are generated for each trial
  # these random input values represent different possible scenarios
  results <- foreach(i = 1:num_trials, .combine = rbind) %dopar% {
    # randomly generate input values for each trial
    cashflows <- runif(10000, min = -100, max = 100)  # random cash flow vector over 10,000 time periods.
    # these cash flows can represent costs (e.g., initial investment) and benefits (e.g., revenue or savings) associated with the project
    discount_rate <- runif(1, min = 0.05, max = 0.15)  # random discount rate at which future cash flows are discounted

    # calculate NPV for the trial
    npv <- npv_calculation(cashflows, discount_rate)

  }
})
cat("Parallel NPV Calculation (using", ncore, "cores):\n")
# print summary statistics for NPV and plot a histogram of the results
# positive NPV indicates that the project is expected to generate a profit (the benefits outweigh the costs),
# making it an economically sound decision. If the NPV is negative, it suggests that the project may not be financially viable.
summary(results)
hist(results, main = 'NPV distribution')
```

Then rerun:

```bash
$ Rscript investment-npv-parallel.R
```

You should see:
```bash
Loading required package: iterators
Loading required package: parallel
   user  system elapsed
297.135   1.781 123.176
Parallel NPV Calculation (using 8 cores):
       V1
 Min.   :-709.5883
 1st Qu.: -96.3171
 Median :   0.2777
 Mean   :   0.1964
 3rd Qu.:  96.8101
 Max.   : 754.5522
```

While the program is running, you should see 8 R processes running in the `htop` output because we
specified 8 cores in our R program and about 8 CPU cores being utilized in `userload` output. The program will run faster since we are using 8 cores instead of 1 but does not get you 8X speedup because of parallelization overhead.

![](/images/intro_to_yens/monitor-2.png)

Last modification we are going to make is to pass the number of cores as a command line argument to our R script.
Save the following to a new script called `investment-npv-parallel-args.R`.

```R
#!/usr/bin/env Rscript
############################################
# This script accepts a user specified argument to set the number of cores to run on
# Run from the command line:
#
#      Rscript investment-npv-parallel-args.R 8
#
# this will execute on 8 cores
###########################################
# accept command line arguments and save them in a list called args
args = commandArgs(trailingOnly=TRUE)
library(foreach)
library(doParallel)

options(warn=-1)
# set the number of cores here from the command line. Avoid using detectCores() function.
ncore <- as.integer(args[1])

# register parallel backend to limit threads to the value specified in ncore variable
registerDoParallel(ncore)

# define function for NPV calculation
npv_calculation <- function(cashflows, discount_rate) {
  # inputs: cashflows (a vector of cash flows over time) and discount_rate (the discount rate).
  npv <- sum(cashflows / (1 + discount_rate)^(0:length(cashflows)))
  return(npv)
}

# number of trials
num_trials <- 500000

# measure the execution time of the Monte Carlo simulation
system.time({
  # use the foreach package to loop through the specified number of trials (num_trials) in parallel
  # within each parallel task, random values for input parameters (cash flows and discount rate) are generated for each trial
  # these random input values represent different possible scenarios
  results <- foreach(i = 1:num_trials, .combine = rbind) %dopar% {
    # randomly generate input values for each trial
    cashflows <- runif(10000, min = -100, max = 100)  # random cash flow vector over 10,000 time periods.
    # these cash flows can represent costs (e.g., initial investment) and benefits (e.g., revenue or savings) associated with the project
    discount_rate <- runif(1, min = 0.05, max = 0.15)  # random discount rate at which future cash flows are discounted

    # calculate NPV for the trial
    npv <- npv_calculation(cashflows, discount_rate)

  }
})
cat("Parallel NPV Calculation (using", ncore, "cores):\n")
# print summary statistics for NPV and plot a histogram of the results
# positive NPV indicates that the project is expected to generate a profit (the benefits outweigh the costs),
# making it an economically sound decision. If the NPV is negative, it suggests that the project may not be financially viable.
summary(results)
hist(results, main = 'NPV distribution')
```

Now, we can run this script with varying number of cores. We will still limit the number of cores to 48 on yen[2-5] and to 12 cores on yen1 per
<a href="/yen/community.html" target="_blank">Community Guidelines</a>.

For example, to run with 12 cores:

```bash
$ Rscript investment-npv-parallel-args.R 12
```

You should see:
```bash
Loading required package: iterators
Loading required package: parallel
   user  system elapsed
302.366   2.344 116.261
Parallel NPV Calculation (using 12 cores):
       V1
 Min.   :-682.9972
 1st Qu.: -96.5376
 Median :  -0.2428
 Mean   :  -0.2369
 3rd Qu.:  96.1112
 Max.   : 720.2979
```

Monitor your CPU usage while the program is running in the other terminal window with `htop` and `userload`.

