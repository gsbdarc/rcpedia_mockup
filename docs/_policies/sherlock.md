---
title: Sherlock
layout: indexPages/services
subHeader: Sherlock
keywords: compute, computing, batch, sherlock, slurm, hpc
category: services 
parent: services
section: infrastructure 
order: 1
updateDate: 2021-12-8
---

# Sherlock

## What is Sherlock?

<a href="https://www.sherlock.stanford.edu/" target="_blank">Sherlock</a> is a high-performance computing (HPC) cluster available for research at Stanford and operated by the <a href="https://srcc.stanford.edu/" target="_blank">Stanford Research Computing Center</a>. Sherlock is a "condo-model" cluster with a public access portion and an owner portion with nodes purchased by active research groups. Anyone at Stanford can use Sherlock for free, on the public nodes. However only owners can use the owner nodes as well. Owners have priority over their own nodes, but can run jobs that get scheduled on nodes not actively being used by their owners.

Sherlock is a  _batch_  submission environment like <a href="https://srcc.stanford.edu/farmshare" target="_blank">FarmShare</a> and <a href="/training/3_yen_slurm.html" target="_blank">Yen-Slurm</a>, not an _interactive_ computing environment like the <a href="/yen/index.html" target="_blank">yens</a>. That is,  **you can't just log in and run intensive tasks**. To compute on Sherlock, you have to prepare and submit a <a href="/training/3_yen_slurm.html" target="_blank">slurm</a> job script that describes the CPU, memory (RAM), and time resources you require, as well as the code to run. A scheduler puts your requests in queue until the resources can be allocated. Note that this probably requires you to have an understanding of what resources your job will require ahead of submission.

Sherlock has over 1,600 compute nodes with 44,000+ CPU cores. It is divided into several logical partitions that are either accessble for everyone to use (`normal`) or you have to buy in to use them. A PI group can purchase its own nodes and have its own partition. Buying nodes gives you access to the large `owners` partition where you can run jobs on nodes while the PI group who owns them is not using them. 

<br>

## How do I use Sherlock?

<br>

## Getting Sherlock Account

{% include note.html content="If you are a faculty member at the GSB and are interested in using Sherlock, please <a href=\"mailto:gsb_darcresearch@stanford.edu\" target=\"_blank\">let the DARC team know</a>." %}

For a GSB faculty member, we can create a Sherlock account with your own PI group that will give you access to the `gsb` partition. If you are a PhD student, you will need to have a faculty sponsor you to gain access to Sherlock.  

Once you have an account, login to Sherlock.

```bash
$ ssh <$USER>sherlock.stanford.edu
```

Enter your SUNet ID and Duo authenticate to login.

Sherlock uses <a href="/training/3_yen_slurm.html" target="_blank">Slurm</a> to schedule jobs and manage the queue of pending jobs. We can use the same slurm commands to get information about the cluster and a queue of jobs as well as use similar submission scripts to the ones we used on <a href="/training/3_yen_slurm.html" target="_blank">Yen-Slurm</a> to run jobs on Sherlock.

Get information about the cluster:

```bash
$ sinfo
```

See the queue on a `normal` partition:

```bash
$ squeue -p normal
```

To get information about partitions that are available to you, run
```bash
$ sh_part
```

<br>

## GSB Sherlock Partition

DARC currently owns three nodes in the Sherlock cluster and software licenses for Matlab and Stata-MP. Our Stata-MP license is a 64-core license, much larger than the 16-core licenses available on the yens.

Right now, GSB has its own partition, `gsb`, which the GSB faculty PI groups can access. The `gsb` partition is comprised of three nodes, one with 20 cores and 125 G of RAM and two larger nodes, each with 128 cores and 1 T of RAM. 

Tasks that are probably suitable for Sherlock are:

-   Parameter Sweeps: you need to run the same code _many_ times, but with different inputs
-   Resource Guarantees: you need to _know_ that your code will have a specific amount of CPU or Memory (RAM) for the duration of its run
-   Large Compute: you need more CPU/memory resources than is "fair" to use at a time on the yens
-   Parallelization: you code in C/C++, and can use MPI for code parallelization across nodes
-   <a href="/topicGuides/runGPU.html" target="_blank">Deep learning / machine learning</a> on GPU's: your code uses a deep learning framework like Keras or PyTorch that can utilize the GPUs for training and prediction

Be advised that  **Sherlock isn't a magic bullet for getting a large amount of work done quickly**. Submitting work to Sherlock requires careful thought about how your analysis is organized to effectively be submitted and run. DARC can help you evaluate your options and plan for success.

<br>


## Examples

<br>

## Python Example 

The python script `hello.py` is a simple hello world script that prints hello and hostname of the node where 
it is running then sleeps for 30 seconds. 

```python
import socket
import time

# print hostname of the node
print('Hello from {} node').format(socket.gethostname())
time.sleep(30)
```

<br>

### Slurm Script

We can use the following slurm script, `hello.slurm`, that will submit the above python script and use any of the three partitions that I have permission to submit to:

```bash
#!/bin/bash

# Example of running python script 

#SBATCH -J hello
#SBATCH -p normal,gsb,dev
#SBATCH -c 1                            # one CPU core 
#SBATCH -t 5:00
#SBATCH -o hello-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load python/3.6.1

# Run python script 
python hello.py 
```

Submit with:

```bash
$ sbatch hello.slurm
```

Monitor the queue:

```bash
$ watch squeue -u $USER
```

You might see job's status as `CF` (configuring) when the job starts and `CG` (completing) when the job finishes.

Once the job is finished, look at the output:

```bash
$ cat hello-$JOBID.out
```

You should see a similar output:

```bash
Hello from sh02-05n71.int node
```

<br>

## Large Job Array Example

Now, we want to run a large <a href="/training/10_job_array.html" target="_blank">job array</a>. First, let's check user job limits for the `normal` partition with:

```bash
$ sacctmgr show qos normal
```

to find that `MaxTRESPU` limit is 512 CPUs max so we will need to limit our job array to 512 CPU cores.

We can modify the hello world python script and call it `hello-task.py` to also print a job task ID. 

```python
import sys
import socket
import time

# print task number and hostname of the node
print('Hello! I am a task number {} on {} node').format(sys.argv[1], socket.gethostname())
time.sleep(30)
```

We use the following slurm script, `hello-job-array.slurm`, that will submit 512 job array tasks and use either `normal` or the `gsb` partition where I have permission to submit to:

```bash
#!/bin/bash

# Example of running python script with a job array

#SBATCH -J hello
#SBATCH -p normal,gsb
#SBATCH --array=1-512                    # how many tasks in the array
#SBATCH -c 1                             # one CPU core per task
#SBATCH -t 5:00
#SBATCH -o out/hello-%A-%a.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load python/3.6.1

# Run python script with a command line argument
python hello-task.py $SLURM_ARRAY_TASK_ID
```

Submit with:

```bash
$ sbatch hello-job-array.slurm
```


Monitor the queue:

```bash
$ watch squeue -u $USER
```

<br>

## Deep learning on GPU

Sherlock also has over 700+ GPUs that we can take advantage of when training machine learning / deep learning models. 

This is an abbreviated version of <a href="/topicGuides/runGPU.html" target="_blank">this topic guide</a> that also talks about how to setup your conda
environment on Sherlock to be able to run the Keras example below.

We will run this python script, `mnist.py` on the Sherlock GPU to train a simple MNIST convnet. 

```python
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

# Model / data parameters
num_classes = 10
input_shape = (28, 28, 1)

# the data, split between train and test sets
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Scale images to the [0, 1] range
x_train = x_train.astype("float32") / 255
x_test = x_test.astype("float32") / 255
# Make sure images have shape (28, 28, 1)
x_train = np.expand_dims(x_train, -1)
x_test = np.expand_dims(x_test, -1)
print("x_train shape:", x_train.shape)
print(x_train.shape[0], "train samples")
print(x_test.shape[0], "test samples")


# convert class vectors to binary class matrices
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

# build the model
model = keras.Sequential(
    [
        keras.Input(shape=input_shape),
        layers.Conv2D(32, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Flatten(),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation="softmax"),
    ]
)

print(model.summary())

# train the model
batch_size = 128
epochs = 15

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

model.fit(x_train, y_train, batch_size=batch_size, epochs=epochs, validation_split=0.1)

# evaluate the trained model
score = model.evaluate(x_test, y_test, verbose=0)
print("Test loss:", score[0])
print("Test accuracy:", score[1])
```

The submission script `keras-gpu.slurm` looks like:

```bash
#!/bin/bash

# Example slurm script to run keras DL models on Sherlock GPU

#SBATCH -J train-gpu
#SBATCH -p gpu
#SBATCH -c 20
#SBATCH -N 1
#SBATCH -t 2:00:00
#SBATCH -G 1                          # how many GPU's you want
#SBATCH -o train-gpu-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# For safety, we deactivate any conda env that might be activated on interactive yens before submission and purge all loaded modules
source deactivate
module purge

# Load software
module load cuda/11.0.3

# Activate the environment
source activate tf-gpu

# Run python script
python mnist.py
```

This script is asking for one GPU (`-G 1`) on `gpu` partition and 20 CPU cores on one node for 2 hours.

It also loads necessary CUDA module and activates the conda environment where I previously installed the python packages for this script.

Submit the job to the `gpu` partition with:

```bash
$ sbatch keras-gpu.slurm
```

Monitor your job:

```bash
$ squeue -u $USER
```

You should see something like:

```bash
           JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          20372833       gpu train-gp nrapstin  R       0:05      1 sh03-12n07
```

Once the job is running, connect to the node where your job is running to monitor GPU utilization:

```bash
$ ssh sh03-12n07
```

Once you connect to the GPU node, load the cuda module there and monitor GPU utilization while the job is running:

```bash
$ module load cuda/11.0.3
$ watch nvidia-smi
```

You should see that the GPU is being utilized (GPU-Util column):
```
Every 2.0s: nvidia-smi                                                                                         
Tue Nov 15 13:43:04 2022
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 520.61.05    Driver Version: 520.61.05    CUDA Version: 11.8     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  On   | 00000000:C4:00.0 Off |                  N/A |
|  0%   44C    P2   114W / 260W |  10775MiB / 11264MiB |     40%   E. Process |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    0   N/A  N/A      4876	 C   python                          10772MiB |
+-----------------------------------------------------------------------------+
```

Once the job is done, look at the output file:

```bash
$ cat train-gpu*.out
```

<!--
---
title: 12. Sherlock HPC
layout: indexPages/training
subHeader: Data, Analytics, and Research Computing. 
keywords: scheduler, batch, schedule, sherlock, hpc 
category: training 
parent: training
section: intermediateYens 
order: 12
updateDate: 2022-07-18
---
-->

# Sherlock HPC

<a href="https://www.sherlock.stanford.edu/docs/overview/introduction" target="_blank">Sherlock</a> is a High Performance Computing (HPC) cluster, operated by the <a href="https://srcc.stanford.edu" target="_blank">Stanford Research Computing Center</a> 
that provides computing resources to the Stanford community. High Performance Computing (HPC) is a multi-processor environment (hardware and software) that enables you to 
run jobs on several processors at once (also called parallel processing). 
HPC systems are comprised of multiple servers (known as *nodes*) that are connected by a high performance network that
enables a user to utilize CPU cores and RAM on different machines with distributed computing. Users can run large jobs across multiple
compute nodes or run multiple jobs at once. The DARC team is here to help you succeed and utilize the computing systems efficiently.


#### Technical Specs
Sherlock has over 1,600 compute nodes with 44,000+ CPU cores. It is divided into several logical partitions that are either 
accessble for everyone to use (`normal`) or you have to buy in to use them. A PI group can purchase its own nodes
and have its own partition. Buying nodes gives you access to the large `owners` partition where you can run jobs on nodes while
 the PI group who owns them is not using them. 

Login to Sherlock.

```bash
$ ssh <$USER>sherlock.stanford.edu
```
Enter your SUNet ID and Duo authenticate to login.

Sherlock also uses Slurm so we can use the same slurm commands to get information about the cluster and a queue of jobs as well
as use very similar submission scripts to the ones we used on Yen-Slurm to run jobs on Sherlock.

Get information about the cluster:
```bash
$ sinfo
```

See the queue on a `normal` partition:
```bash
$ squeue -p normal
```

<br>

### Python Example 

The python script `hello.py` is a simple hello world script that prints hello and hostname of the node where 
it is running then sleeps for 30 seconds. 

```python
import socket
import time

# print hostname of the node
print('Hello from {} node').format(socket.gethostname())
time.sleep(30)
```

#### Slurm Script
We can use the following slurm script, `hello.slurm`, that will submit the above python script and use any of the three partitions
that I have permission to submit to:

```bash
#!/bin/bash

# Example of running python script 

#SBATCH -J hello
#SBATCH -p normal,gsb,dev
#SBATCH -c 1                            # one CPU core 
#SBATCH -t 5:00
#SBATCH -o hello-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load python/3.6.1

# Run python script 
python hello.py 
```

Submit with:

```bash
$ sbatch hello.slurm
```

Monitor the queue:

```bash
$ watch squeue -u $USER
```
You might see job's status as `CF` (configuring) when the job starts and `CG` (completing) when the job finishes.

Once the job is finished, look at the output:

```bash
$ cat hello-$JOBID.out
```

You should see:

```bash
Hello from sh02-05n71.int node
```

<br>

### Large Job Array Example
Now, we want to run a large job array. First, let's check user job limits for `normal` partition with:

```bash
$ sacctmgr show qos normal 
```

to find that `MaxTRESPU` limit is 512 so we will need to limit our job array to 512 CPU cores. 

We can modify the hello world python script and call it `hello-task.py` to also print a job task ID. 

```python
import sys
import socket
import time

# print task number and hostname of the node
print('Hello! I am a task number {} on {} node').format(sys.argv[1], socket.gethostname())
time.sleep(30)
```


We use the following slurm script, `hello-job-array.slurm`, that will submit 512 job array tasks and use `normal` or `gsb` partitions.

```bash
#!/bin/bash

# Example of running python script with a job array

#SBATCH -J hello-array
#SBATCH -p normal,gsb
#SBATCH --array=1-512                    # how many tasks in the array
#SBATCH -c 1                             # one CPU core per task
#SBATCH -t 5:00
#SBATCH -o out/hello-%A-%a.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# Load software
module load python/3.6.1

# Run python script with a command line argument
python hello-task.py $SLURM_ARRAY_TASK_ID
```

Submit with:

```bash
$ sbatch hello-job-array.slurm
```


Monitor the queue:

```bash
$ watch -n 5 squeue -u $USER
```

<br>

### Python run on GPU
Sherlock also has over 700+ GPUs that we can take advantage of when training machine learning / deep learning models. 

This is an abbreviated version of <a href="/topicGuides/runGPU.html" target="_blank">this topic guide</a> that also talks about how to setup your conda
environment on Sherlock to be able to run the Keras example below.

We will run this python script on the Sherlock GPU to train a simple MNIST convnet. 

```python
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

# Model / data parameters
num_classes = 10
input_shape = (28, 28, 1)

# the data, split between train and test sets
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Scale images to the [0, 1] range
x_train = x_train.astype("float32") / 255
x_test = x_test.astype("float32") / 255
# Make sure images have shape (28, 28, 1)
x_train = np.expand_dims(x_train, -1)
x_test = np.expand_dims(x_test, -1)
print("x_train shape:", x_train.shape)
print(x_train.shape[0], "train samples")
print(x_test.shape[0], "test samples")


# convert class vectors to binary class matrices
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

# build the model
model = keras.Sequential(
    [
        keras.Input(shape=input_shape),
        layers.Conv2D(32, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Flatten(),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation="softmax"),
    ]
)

print(model.summary())

# train the model
batch_size = 128
epochs = 15

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

model.fit(x_train, y_train, batch_size=batch_size, epochs=epochs, validation_split=0.1)

# evaluate the trained model
score = model.evaluate(x_test, y_test, verbose=0)
print("Test loss:", score[0])
print("Test accuracy:", score[1])
```

The submission script `keras-gpu.slurm` looks like:

```bash
#!/bin/bash

# Example slurm script to run keras DL models on Sherlock GPU

#SBATCH -J train-gpu
#SBATCH -p gpu
#SBATCH -c 20
#SBATCH -N 1
#SBATCH -t 2:00:00
#SBATCH -G 1                          # how many GPU's you want
#SBATCH -o train-gpu-%j.out
#SBATCH --mail-type=ALL
#SBATCH --mail-user=your_email@stanford.edu

# For safety, we deactivate any conda env that might be activated on interactive yens before submission and purge all loaded modules
source deactivate
module purge

# Load software
module load cuda/11.0.3

# Activate the environment
source activate tf-gpu

# Run python script
python mnist.py
```

This script is asking for one GPU (`-G 1`) on `gpu` partition and 20 CPU cores on one node for 2 hours.
It also loads necessary CUDA module and activates the conda environment where I previously installed the python packages for this script.

Submit the job to the `gpu` partition with:

```bash
$ sbatch keras-gpu.slurm
```

Monitor your job:

```bash
$ squeue -u $USER
```
You should see something like:

```bash
           JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          20372833       gpu train-gp nrapstin  R       0:05      1 sh03-12n07
```
  
Once the job is running, connect to the node where your job is running to monitor GPU utilization:

```bash
$ ssh sh03-12n07
```
Once you connect to the GPU node, load the cuda module there and monitor GPU utilization while the job is running:

```bash
$ module load cuda/11.0.3
$ watch nvidia-smi
```

You should see that the GPU is being utilized (GPU-Util column):
```
Every 2.0s: nvidia-smi
Tue Nov 15 13:43:04 2022
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 520.61.05    Driver Version: 520.61.05    CUDA Version: 11.8     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  On   | 00000000:C4:00.0 Off |                  N/A |
|  0%   44C    P2   114W / 260W |  10775MiB / 11264MiB |     40%   E. Process |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    0   N/A  N/A      4876      C   python                          10772MiB |
+-----------------------------------------------------------------------------+
```

Once the job is done, look at the output file:

```bash
$ cat train-gpu*.out
```

{% include note.html content="We currently have reserved nodes for GSB research needs on Sherlock and if you are interested in learning more, please [contact us](mailto:gsb_darcresearch@stanford.edu)." %}
 
Read more about GSB Sherlock partition <a href="/services/sherlock.html" target="_blank">here</a>.

---         
<a href="/training/11_yenGPU.html"><span class="glyphicon glyphicon-menu-left fa-lg" style="float: left;"/></a> <a href="/training/13_thankyou.html"><span class="glyphicon glyphicon-menu-right fa-lg" style="float: right;"/></a>
