---
title: Slurm Job Array Python Example
layout: indexPages/topicGuides
subHeader: Data, Analytics, and Research Computing.
keywords: slurm, scheduler, yen10, python, job array
category: topicGuides
parent: topicGuides
order: 1
updateDate: 2020-11-02
---


# {{ page.title }}

## Python Example Slurm Script
The simplest Python script looks like:

```python
print('Hello!')
```

Save this line to a new file called `hello.py`. This one-liner script can be run with `python hello.py`. 
However, we will run it via the Slurm scheduler on the Yen10 server. 
Here is an example slurm script that loads anaconda3 module and runs hello world python script.


```bash
#!/bin/bash

# Example of running python script in a batch mode

#SBATCH -J hello
#SBATCH -p normal
#SBATCH -c 1                            # one CPU core
#SBATCH -t 10:00
#SBATCH -o hello-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load anaconda3

# Run python script
srun python hello.py
```

**Note:** to use the scheduler, you prepend `python hello.py` with `srun` command. Save this slurm script to `hello.slurm`.
Then run it by submitting the job to the slurm scheduler with:

```bash
sbatch hello.slurm
```

We will take this slurm job script and modify it to run as a job array. 
Each task in a job array will run the same python script and print 'Hello!' and the job array task ID.

We are going to pass a job array task ID as a command line argument to the python script. The python script accepts the 
command line argument and prints 'Hello!' and the task ID passed to it. 

Let's modify our hello world python script to look like:

```python
#!/usr/bin/python

# import sys library (needed for accepted command line args)
import sys

# print task number
print('Hello! I am a task number: ', sys.argv[1])
```

Then we modify the slurm file to look like below (save this to `hello-parallel.slurm`):

```bash
#!/bin/bash

# Example of running python script with a job array

#SBATCH -J hello
#SBATCH -p normal
#SBATCH --array=1-10                    # how many tasks in the array
#SBATCH -c 1                            # one CPU core per task
#SBATCH -t 10:00
#SBATCH -o hello-%j-%a.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load anaconda3

# Run python script with a command line argument
srun python hello-parallel.py $SLURM_ARRAY_TASK_ID
```

Note that in this case, we specified slurm option `#SBATCH --array=1-10` to run ten independent tasks in parallel. 
The maximum job array size is set to 512 on yen10. Each task will generate a unique log file `hello-jobID-taskID.out`
so we can look at those and see if any of the tasks failed.
 
#### Submit Job Array to Scheduler
We can now submit our `hello-parallel.slurm` script to the slurm scheduler to run the job array on the Yen10 server. 
It will launch all 10 tasks at the same time (some might sit in the queue while others are going to run right away).
To submit, run:

```
sbatch hello-parallel.slurm
```

Monitor your jobs with `watch squeue -u USER` where `USER` is your SUNet ID. Check which job array tasks failed. 
Rerun those by setting `--array=` only to failed indices.