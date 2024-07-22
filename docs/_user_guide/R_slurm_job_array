---
title: Slurm Job Array R Example
layout: indexPages/topicGuides
subHeader: Data, Analytics, and Research Computing.
keywords: slurm, scheduler, yen-slurm, R, job array
category: topicGuides
parent: topicGuides
order: 1
updateDate: 2023-04-04
---


# {{ page.title }}

## R Example Slurm Script
The simplest R script looks like:

```R
print('Hello!')
```

Save this line to a new file called `hello.R`. This one-liner script can be run with `Rscript hello.R`. 
However, we will run it via the Slurm scheduler on the yen-slurm cluster. 
Here is an example slurm script that loads R module and runs the hello world R script.


```bash
#!/bin/bash

# Example of running R script in a batch mode

#SBATCH -J hello
#SBATCH -p normal
#SBATCH -c 1                            # one CPU core
#SBATCH -t 10:00
#SBATCH -o hello-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load R

# Run R script
Rscript hello.R
```

Save this slurm script to `hello.slurm`.
Then run it by submitting the job to the slurm scheduler with:

```bash
sbatch hello.slurm
```

We will take this slurm job script and modify it to run as a job array. 
Each task in a job array will run the same R script and print 'Hello!' and the job array task ID.

We are going to pass a job array task ID as a command line argument to the R script. The R script accepts the 
command line argument and prints 'Hello!' and the task ID passed to it. 

Let's modify our hello world R script to look like:

```R
#!/usr/bin/env Rscript

# accept command line arguments and save them in a list called args
args = commandArgs(trailingOnly=TRUE)

# print task number
print(paste0('Hello! I am a task number: ', args[1]) )
```

Then we modify the slurm file to look like below (save this to `hello-parallel.slurm`):

```bash
#!/bin/bash

# Example of running R script with a job array

#SBATCH -J hello
#SBATCH -p normal
#SBATCH --array=1-10                    # how many tasks in the array
#SBATCH -c 1                            # one CPU core per task
#SBATCH -t 10:00
#SBATCH -o hello-%j-%a.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load R

# Run R script with a command line argument
Rscript hello-parallel.R $SLURM_ARRAY_TASK_ID
```

Note that in this case, we specified slurm option `#SBATCH --array=1-10` to run ten independent tasks in parallel. 
The maximum job array size is set to 512 on yen-slurm. Each task will generate a unique log file `hello-jobID-taskID.out`
so we can look at those and see if any of the tasks failed.
 
#### Submit Job Array to Scheduler
We can now submit our `hello-parallel.slurm` script to the slurm scheduler to run the job array on the yen-slurm server. 
It will launch all 10 tasks at the same time (some might sit in the queue while others are going to run right away).
To submit, run:

```
sbatch hello-parallel.slurm
```

Monitor your jobs with `watch squeue -u USER` where `USER` is your SUNet ID. Check which job array tasks failed. 
Rerun those by setting `--array=` only to failed indices.
