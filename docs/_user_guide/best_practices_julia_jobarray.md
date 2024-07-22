# SLURM Job Array Julia Example

The simplest Julia script looks like:

```julia
println("hello world")
```

Save this line to a new file called `hello_world.jl`. This one-liner script can be run with `julia hello_world.jl`. 
However, we will run it via the SLURM scheduler on the Yen10 server. 
Here is an example slurm script that loads Julia module and runs hello world julia script.


```bash
#!/bin/bash

# Example of running a single Julia run 

#SBATCH -J julia
#SBATCH -p normal
#SBATCH -n 1
#SBATCH -c 1                              # one core per task
#SBATCH -t 1:00:00
##SBATCH --mem=1gb
#SBATCH -o julia-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software (Julia default is 1.5 version)
module load julia

# Run Julia script
srun julia hello_world.jl
```

**Note:** to use the scheduler, you prepend `julia hello_world.jl` with `srun` command. Save this slurm script to `julia.slurm`.
Then run it by submitting the job to the slurm scheduler with:

```bash
sbatch julia.slurm
```

We will take this slurm job script and modify it to run as a job array. 
Each task in a job array will run the same julia script and print hello world and the job array task ID.

We are going to pass a job array task ID as a command line argument to the Julia script. The Julia script accepts the 
command line argument and prints hello world and the task ID passed to it. 

Let's modify our hello world Julia script to look like:

```julia
# print command line argument (should be the job array index: 1, 2, ...)
# note that command line arguments are stored as array of strings 
# ARGS[1] is the command line argument following the name of julia script
println("hello world from core: " * ARGS[1])
```

Then we modify the slurm file to look like below (save this to `julia-array.slurm`):

```bash
#!/bin/bash

# Example of running a job array to run Julia hello world

#SBATCH --array=1-10              # there is a max array size - 512 tasks
#SBATCH -J julia
#SBATCH -p normal
#SBATCH -n 1
#SBATCH -c 1                              # one core per task
#SBATCH -t 1:00:00
##SBATCH --mem=1gb
#SBATCH -o julia-%A-%a.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load julia

# Run Julia with a command line arg being an index from 1 to 10
srun julia hello_world.jl $SLURM_ARRAY_TASK_ID
```

Note that in this case, we specified SLURM option `#SBATCH --array=1-10` to run ten independent tasks in parallel. 
The maximum job array size is set to 512 on Yen10. Each task will generate a unique log file `julia-taskID.out`
so we can look at those and see if any of the tasks failed.
 
#### Submit Job Array to Scheduler
We can now submit our `julia-array.slurm` script to the slurm scheduler to run the job array on the Yen10 server. 
It will launch all 10 tasks at the same time (some might sit in the queue while others are going to run right away).
To submit, run:

```
sbatch julia-array.slurm
```

Monitor your jobs with `watch squeue -u USER` where `USER` is your SUNet ID. Check which job array tasks failed. 
Rerun those by setting `--array=` only to failed indices.
