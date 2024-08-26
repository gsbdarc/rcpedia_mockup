# Yen Slurm


## Schedule Jobs on the Yens

You may be used to using a job scheduler on [other Stanford compute resources](https://srcc.stanford.edu/about/computing-support-research) (e.g. Sherlock, etc.) or servers from other institutions. However, the Yen servers have traditionally run without a scheduler in order to make them more accessible and intuitive to our users. The ability to log onto a machine with considerably more resources than your laptop and immediately start running scripts as if it was still your laptop has been very popular with our users. This is the case on `yen1`, `yen2`, `yen3`, `yen4` and `yen5`.

{% include tip.html content="Take a look [here](/yen/index.html) to see more details about the Yen hardware." %}

The downside of this system is that resources can be eaten up rather quickly by users and you may find a particular server to be "full". To combat this, we have implemented the SLURM scheduler on our `yen-slurm` servers. For users familiar with scheduler systems, this should be a seamless transition. For those unfamiliar, please have a look [here](/yen/scheduler.html) to learn how to get started.


{% include new.html content="<A href=\"https://drive.google.com/file/d/1Zqn6PUoR4ZnH0An4fCAe7_MwKhHFwCFZ/view?usp=sharing\">Watch</A> recent Hub How-To on using the scheduler to run parallel jobs on yen-slurm." %}

The `yen-slurm` is a new computing cluster offered by the Stanford Graduate School of Business.  It is designed to give researchers the ability to run computations that require a large amount of resources without leaving the environment and filesystem of the interactive Yens.

<div class="row">
    <div class="col-lg-12">
      <H1> </H1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
     <div class="fontAwesomeStyle"><i class="fas fa-tachometer-alt"></i> Current yen-slurm cluster configuration</div>
<iframe class="airtable-embed" src="https://airtable.com/embed/shr4Dm4JOF5IFg5I9?backgroundColor=purple" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
   </div>
    <div class="col col-md-2"></div>
  </div>

The `yen-slurm` cluster has 9 nodes with 1248 total number of available CPU cores, 9 TB of memory, and 8 NVIDIA GPU's.

## What is a scheduler?

The `yen-slurm` cluster can be accessed by the [Slurm Workload Manager](https://slurm.schedmd.com/).  Researchers can submit jobs to the cluster, asking for a certain amount of resources (CPU, Memory, and Time).  Slurm will then manage the queue of jobs based on what resources are available. In general, those who request less resources will see their jobs start faster than jobs requesting more resources.

## Why use a scheduler?

A job scheduler has many advantages over the directly shared environment of the yens:

* Run jobs with a guaranteed amount of resources (CPU, Memory, Time)
* Setup multiple jobs to run automatically
* Run jobs that exceed the [community guidelines on the interactive nodes](/yen/community.html)
* Gold standard for using high-performance computing resources around the world

## How do I use the scheduler?

First, you should make sure your process can run on the interactive Yen command line.  We've written a guide on migrating a process from [JupyterHub to yen-slurm](/yen/migratingFromJupyter.html).  [Virtual Environments](/topicGuides/pythonEnv.html) will be your friend here.

Once your process is capable of running on the interactive Yen command line, you will need to create an slurm script.  This script has two major components:

* Metadata around your job, and the resources you are requesting
* The commands necessary to run your process

Here's an example of a submission slurm script, `my_submission_script.slurm`:

```bash
#!/bin/bash

#SBATCH -J yahtzee
#SBATCH -o rollcount.csv
#SBATCH -c 1
#SBATCH -t 10:00
#SBATCH --mem=100G

python3 yahtzee.py 100000
```

The important arguments here are that you request:
* `SBATCH -c` is the number of CPUs
* `SBATCH -t` is the amount of time for your job
* `SBATCH --mem` is the amount of total memory


Once your slurm script is written, you can submit it to the server by running `sbatch my_submission_script.slurm`.

## OK - my job is submitted - now what?

You can look at the current job queue by running `squeue`:

```bash
USER@yen4:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
              1043    normal    a_job    user1 PD       0:00      1 (Resources)
              1042    normal    job_2    user2  R    1:29:53      1 yen11
              1041    normal     bash    user3  R    3:17:08      1 yen11
```

Jobs with state (ST) R are running, and PD are pending.  Your job will run based on this queue.

## Best Practices

### Use all of the resources you request

The Slurm scheduler keeps track of the resources you request, and the resources you use. Frequent under-utilization of CPU and Memory will affect your future job priority.  You should be confident that your job will use all of the resources you request.  It's recommended that you run your job on the interactive Yens, and [monitor resource usage](/faqs/howCheckResourceUsage.html) to make an educated guess on resource usage.

### Restructure your job into small tasks

Small jobs start faster than big jobs. Small jobs likely finish faster too.  If your job requires doing the same process many times (i.e. OCR'ing many PDFs), it will benefit you to setup your job as many small jobs.

## Tips and Tricks

### Current Partitions and their limits

Run `sinfo` command to see available partitions:

```bash
$ sinfo
```

You should see the following output:

```bash
USER@yen4:~$ sinfo
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
normal*      up 2-00:00:00      7   idle yen[11-17]
dev          up    2:00:00      7   idle yen[11-17]
long         up 7-00:00:00      7   idle yen[11-17]
gpu          up 1-00:00:00      2   idle yen-gpu[1-2]
```

The first column PARTITION lists all available partitions. Partitions are the logical subdivision
of the `yen-slurm` cluster. The `*` denotes the default partition.

The four partitions have the following limits:

| Partition      | CPU Limit Per User | Memory Limit           | Max Memory Per CPU (default)  | Time Limit (default) |
| -------------- | :----------------: | :--------------------: | :----------------------------:| :-------------------:|
|  normal        |    256             | 3 TB                   |   24 GB (4 GB)                | 2 days  (2 hours)    |
|  dev           |    2               | 48 GB                  |   24 GB (4 GB)                | 2 hours (1 hour)     |
|  long          |    32              |  768 GB                |   24 GB (4 GB)                | 7 days (2 hours)     |
|  gpu           |    64              |  256 GB                |   24 GB (4 GB)                | 1 day (2 hours)      |


You can submit to the `dev` partition by specifying:

```bash
#SBATCH --partition=dev
```

Or with a shorthand:

```bash
#SBATCH -p dev
```

If you don’t specify the partition in the submission script, the job is queued in the `normal` partition. To request a particular partition, for example, `long`, specify `#SBATCH -p long` in the slurm submission script. You can specify more than one partition if the job can be run on multiple partitions (i.e. `#SBATCH -p normal,dev`).

### How do I check how busy the machines are?

You can pass format options to the `sinfo` command as follows:

```bash
USER@yen4:~$ sinfo --format="%m | %C"
MEMORY | CPUS(A/I/O/T)
257366+ | 100/1148/0/1248
```

where `MEMORY` outputs the minimum size of memory of the `yen-slurm` cluster node in megabytes (256 GB) and
`CPUS(A/I/O/T)` prints the number of CPU's that are allocated / idle / other / total.
For example, if you see `100/1148/0/1248` that means 100 CPU's are allocated, 1,148 are idle (free) out of 1,248 CPU's total.

You can also run `checkyens` and look at the last line for summary of all pending and running jobs on yen-slurm.

```bash
USER@yen4:~$ checkyens
Enter checkyens to get the current server resource loads. Updated every minute.
yen1 :  5 Users | CPU [                     3%] | Memory [#                    8%] | updated 2023-01-13-09:44:01
yen2 :  2 Users | CPU [                     0%] | Memory [                     0%] | updated 2023-01-13-09:44:02
yen3 :  2 Users | CPU [                     0%] | Memory [##                  14%] | updated 2023-01-13-09:44:01
yen4 :  3 Users | CPU [#####               29%] | Memory [###                 15%] | updated 2023-01-13-09:44:01
yen5 :  1 Users | CPU [##                  10%] | Memory [######              31%] | updated 2023-01-13-09:44:01
yen-slurm : 12 jobs, 0 pending | 86 CPUs allocated (21%) | 300G Memory Allocated (5%) | updated 2023-01-13-09:44:02
```

### When will my job start?

You can ask the scheduler using `squeue --start`, and look at the `START_TIME` column.

```bash
USER@yen4:~$ squeue --start

JOBID PARTITION     NAME     USER ST          START_TIME  NODES SCHEDNODES           NODELIST(REASON)
112    normal yahtzeem  astorer PD 2020-03-05T14:17:40      1 yen11                (Resources)
113    normal yahtzeem  astorer PD 2020-03-05T14:27:00      1 yen11                (Priority)
114    normal yahtzeem  astorer PD 2020-03-05T14:37:00      1 yen11                (Priority)
115    normal yahtzeem  astorer PD 2020-03-05T14:47:00      1 yen11                (Priority)
116    normal yahtzeem  astorer PD 2020-03-05T14:57:00      1 yen11                (Priority)
117    normal yahtzeem  astorer PD 2020-03-05T15:07:00      1 yen11                (Priority)
```

### How do I cancel my job on Yen-Slurm?

The `scancel JOBID` command will cancel your job.  You can find the unique numeric `JOBID` of your job with `squeue`.
You can also cancel all of your running and pending jobs with `scancel -u USERNAME` where `USERNAME` is your username.

### Constraining my job to specific nodes using node features

Certain nodes may have particular features that your job requires, such
as a GPU.  These features can be viewed as follows:

```bash
USER@yen4:~$ sinfo -o "%10N  %5c  %5m  %64f  %10G"
NODELIST    CPUS   MEMOR  AVAIL_FEATURES                                                    GRES
yen[11-17]  32+    10315  (null)                                                            (null)
yen-gpu1    64     25736  GPU_BRAND:NVIDIA,GPU_UARCH:AMPERE,GPU_MODEL:A30,GPU_MEMORY:24GiB  gpu:4
yen-gpu2    64     25736  GPU_BRAND:NVIDIA,GPU_UARCH:AMPERE,GPU_MODEL:A40,GPU_MEMORY:48GiB  gpu:4
```

For example, to ensure that your job will run on a node that has an
NVIDIA Ampere A40 GPU, you can include the `-C`/`--constraint` option to
the `sbatch` command or in an `sbatch` script.  Here is a trivial
example command that demonstrates this: `sbatch -C "GPU_MODEL:A30" -G 1 -p gpu --wrap "nvidia-smi"`

At present, only GPU-specific features exist, but additional node features may be added over time.


## Submit Your First Job to Run on Yen-Slurm

We are going to copy scripts including example python scripts and Slurm submission scripts.
Make a directory inside your home directory called `intermediate_yens_2023`.
Then copy the scripts for this class from `scratch` to your `intermediate_yens_2023` working directory so you can modify and run them.

```bash
$ cd
$ mkdir intermediate_yens_2023
$ cd intermediate_yens_2023
$ cp /scratch/darc/intermediate-yens/* .
```

### Running Python Script on the Command Line 
Just as we ran <a href="/gettingStarted/9_run_jobs.html" target="_blank">R script</a> on the interactive yen nodes, we can simply run a Python script on the command line.  

Let's run a python version of the script, `investment-npv-serial.py`, which is a serial version of the script that does not use multiprocessing.

```python
# In the context of economics and finance, Net Present Value (NPV) is used to assess
# the profitability of investment projects or business decisions.
# This code performs a Monte Carlo simulation of Net Present Value (NPV) with 500,000 trials in serial,
# utilizing multiple CPU cores. It randomizes input parameters for each trial, calculates the NPV,
# and stores the results for analysis.
import time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

np.errstate(over='ignore')

# define a function for NPV calculation
def npv_calculation(cashflows, discount_rate):
    # calculate NPV using the formula
    npv = np.sum(cashflows / (1 + discount_rate) ** np.arange(len(cashflows)))
    return npv

# function for simulating a single trial
def simulate_trial(trial_num):
    # randomly generate input values for each trial
    cashflows = np.random.uniform(-100, 100, 10000)  # Random cash flow vector over 10,000 time periods
    discount_rate = np.random.uniform(0.05, 0.15)  # Random discount rate

    # ignore overflow warnings temporarily
    with np.errstate(over = 'ignore'):
        # calculate NPV for the trial
        npv = npv_calculation(cashflows, discount_rate)

    return npv

# number of trials
num_trials = 500000

start_time = time.time()

# Perform the Monte Carlo simulation in serial
results = np.empty(num_trials)

for i in range(num_trials):
    results[i] = simulate_trial(i)

results = pd.DataFrame( results, columns = ['NPV'])

end_time = time.time()
elapsed_time = end_time - start_time

print(f"Elapsed time: {elapsed_time:.2f} seconds")

print("Serial NPV Calculation:")
# Print summary statistics for NPV
print(results.describe())

# Plot a histogram of the results
plt.hist(results, bins=50, density=True, alpha=0.6, color='g')
plt.title('NPV distribution')
plt.xlabel('NPV Value')
plt.ylabel('Frequency')
plt.savefig('histogram.png')
```

We can call the function like this:
```bash
$ python3 investment-npv-serial.py
```

The output should look like:
```bash
Elapsed time: 185.77 seconds
Serial NPV Calculation:
                 NPV
count  500000.000000
mean       -0.119349
std       144.435560
min      -723.741078
25%       -96.553456
50%         0.105534
75%        96.588246
max       721.687146
```

## Submit Serial Script to the Scheduler

We'll prepare a submit script called `investment-serial.slurm` and submit it to the scheduler. Edit the slurm script to include
your email address.

```bash
#!/bin/bash

# Example of running python script in a batch mode

#SBATCH -J npv-serial
#SBATCH -p normal,dev
#SBATCH -c 1                            # CPU cores (up to 256 on normal partition)
#SBATCH -t 1:00:00
#SBATCH -o npv-serial-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Run python script
python3 investment-npv-serial.py
```

Then submit the script:

```bash
$ sbatch investment-serial.slurm
```

You should see a similar output:

```bash
Submitted batch job 44097
```

Monitor your job:
```bash
$ squeue
```

The script should take less than 5 minutes to complete. Look at the slurm emails after the job is finished.
Look at the output file.

## Using `venv` Environment in Slurm Scripts
We can also use a `venv` environment python instead of a system `python3` when running scripts via Slurm.

We can modify the slurm script to use previously created `venv` environment as follows:

```bash
#!/bin/bash

# Example of running python script in a batch mode

#SBATCH -J npv-serial
#SBATCH -p normal,dev
#SBATCH -c 1                            # CPU cores (up to 256 on normal partition)
#SBATCH -t 1:00:00
#SBATCH -o npv-serial-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Activate venv 
source /zfs/gsb/intermediate-yens/venv/bin/activate

# Run python script
python investment-npv-serial.py
``` 

In the above slurm script, we first activate `venv` environment and execute the python script using `python` in the active environment.

---         
<a href="/training/6_jupyter_hub.html"><span class="glyphicon glyphicon-menu-left fa-lg" style="float: left;"/></a> <a href="/training/8_parallel_jobs.html"><span class="glyphicon glyphicon-menu-right fa-lg" style="float: right;"/></a>

