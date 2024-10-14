# Run Jobs on Yen's GPU Partition 

## GPU Partition Overview
The Yen-Slurm cluster has three GPU nodes:

- `yen-gpu1`: 64 threads, 256 GB CPU RAM, 4 A30 NVIDIA GPUs (24 GB RAM per GPU)
- `yen-gpu[2-3]`: 64 threads, 256 GB CPU RAM, 4 A40 NVIDIA GPUs (48 GB RAM per GPU).

## Login to the Yens

Enter your SUNet ID in place of `$USER`, then enter your password and Duo authenticate to login.

```bash title="Terminal Input"
ssh $USER@yen.stanford.edu
```

## Slurm GPU partition

The `yen-slurm` cluster now has a `gpu` partition to run jobs on the GPU nodes. See its timelimit with:

```bash title="Terminal Input"
sinfo -p gpu
```

```{ .yaml .no-copy title="Terminal Output"}  
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
gpu          up 1-00:00:00      3   idle yen-gpu[1-3]
```

!!! warning
    There is a limit of 1 day runtime and 4 GPU's per user

### Submitting Jobs to GPU Nodes

A typical Slurm submission script looks like this:

```bash title="gpu_job.slurm"
#!/bin/bash

# Example slurm script to run pytorch on Yen GPU

#SBATCH -J gpu-job           # Job name
#SBATCH -p gpu               # Use GPU partition
#SBATCH -c 10                # Number of CPU cores
#SBATCH -N 1                 # Request one node
#SBATCH -t 1-                # Runtime limit
#SBATCH -G 1                 # GPUs requested (max is 4)
#SBATCH -o gpu-job-%j.out    # Output file
#SBATCH --mail-type=ALL      # Notifications
#SBATCH --mail-user=your_email@stanford.edu

# Load the PyTorch module
ml pytorch

# Run your script on GPU
python <your-script>.py
```

Submit the job with:

```bash title="Terminal Input"
sbatch gpu_job.slurm
```

Check your job's status with:

```bash title="Terminal Input"
squeue -u $USER
```

You should see something like:

```{ .yaml .no-copy title="Terminal Output"} 
 JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
190526       gpu train-gp     user  R       0:25      1 yen-gpu1
```

Once the job is running, you can monitor GPU utilization by logging into the node: 

```bash title="Terminal Input"
ssh yen-gpu1
```

Then, use `nvidia-smi` to check GPU utilization:

```bash title="Terminal Input on GPU Node"
watch nvidia-smi
```

This guide provides an overview of how to use GPUs on the Yens cluster, including job submission with Slurm and basic monitoring of GPU utilization.
