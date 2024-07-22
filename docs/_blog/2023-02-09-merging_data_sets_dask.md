---
title: Merging Big Data Sets with Python Dask
layout: indexPages/topicGuides
subHeader: Data, Analytics, and Research Computing.
keywords: Merging, python, dask
category: topicGuides
parent: topicGuides
order: 1
updateDate: 2023-02-09
---


# {{ page.title }}

## Using `dask` instead of `pandas` to merge large data sets

If you are running out of memory on your desktop to carry out your data processing tasks, the Yen servers are a good place to try because
the Yen{1,2,3,4,5} servers each have at least 1 T of RAM and the Yen-Slurm nodes have 1-3 TB of RAM each, although per [Community Guidelines](/yen/community.html), you should 
limit memory to 192 GB on most of the interactive yens. 

The python package [`dask`](https://dask.org/) is a powerful python package that allows you to do data analytics in parallel which means it
 should be faster and more memory efficient than `pandas`. It follows `pandas` syntax and can speed up common data 
 processing tasks usually done in `pandas` such as merging big data sets.

## Example
We are going to use public EDGAR data from 2013. We will merge two data sets - EDGAR log files
from 2013 and financial statements from 2013.

### Data download 

The Edgar log files are downloaded by grabbing a list of URLs for each log file from <a href="https://www.sec.gov/files/edgar_logfiledata_thru_jun2017.html" target="_blank">the SEC website</a>. 

Let's make `data` directory where the two datasets will be:
```bash
mkdir data
cd data
```

Here is the URLs for the logs we are going to use in this example (any 10 zip files from 2013 for the logs would do):
Save this file to `10_log_list_2013.txt`:

```bash
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr1/log20130217.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr1/log20130225.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr2/log20130605.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr2/log20130606.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr3/log20130712.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr3/log20130804.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr3/log20130812.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr3/log20130907.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr3/log20130915.zip
www.sec.gov/dera/data/Public-EDGAR-log-file-data/2013/Qtr4/log20131020.zip
```

Download the data for these 10 URLs by running the following command on the command line:

```bash
mkdir raw_edgar_logs2013
cat 10_log_list_2013.txt | xargs -n 1 -P 10 wget -nc -P raw_edgar_logs2013
```

Now you should have 10 zip files downloaded in `raw_edgar_logs2013` directory:

```bash
ls -ltrh raw_edgar_logs2013
```

You should see:
```bash
total 1.3G
-rwxrwxr-x 1 nrapstin  97M Nov 13  2017 log20130217.zip
-rwxrwxr-x 1 nrapstin 106M Nov 13  2017 log20130225.zip
-rwxrwxr-x 1 nrapstin 120M Nov 13  2017 log20130606.zip
-rwxrwxr-x 1 nrapstin 122M Nov 13  2017 log20130605.zip
-rwxrwxr-x 1 nrapstin 143M Nov 13  2017 log20130712.zip
-rwxrwxr-x 1 nrapstin  88M Nov 13  2017 log20130804.zip
-rwxrwxr-x 1 nrapstin 136M Nov 13  2017 log20130812.zip
-rwxrwxr-x 1 nrapstin  76M Nov 13  2017 log20130907.zip
-rwxrwxr-x 1 nrapstin  77M Nov 13  2017 log20130915.zip
-rwxrwxr-x 1 nrapstin  79M Nov 13  2017 log20131020.zip
```

Next, we will combine all 10 logs into one big csv file. Save the following into a new script `combine_logs.py`.

```python
# Python script to combine 10 EDGAR log files from 2013 into one csv file
import pandas as pd
import numpy as np
from zipfile import ZipFile
import glob

def process_your_file(f):
    '''
    Helper function to read in zip file and
    return a pandas df
    '''
    zip_file = ZipFile(f)

    # get file name
    filename = zip_file.filename[19:-4]

    # read in csv
    df = pd.read_csv(zip_file.open(filename + '.csv'))
    return df

# combine all 2013 logs into one df
files = glob.glob('raw_edgar_logs2013/log2013*.zip')

# make a list of df's to combine
frames = [ process_your_file(f) for f in files ]

# combine all df's in the list
result = pd.concat(frames)

# write out 10 2013 csv files into one csv
# results in a 7.8 G df
result.to_csv('logs2013-10logs.csv')
```

Run the python script to combine the logs into one csv file which will take about 10 minutes:
```python
python combine_logs.py
```

The second dataset is financial statments from 2013 that can be downloaded from [here](https://www.sec.gov/dera/data/financial-statement-data-sets.html). 
We will also combine them into one csv file.

Similar to the log data, we have a list of URLs that we want to download the data from. Save this file to
`financial_2013_urls_list.txt`:

```bash
https://www.sec.gov/files/dera/data/financial-statement-data-sets/2013q1.zip
https://www.sec.gov/files/dera/data/financial-statement-data-sets/2013q2.zip
https://www.sec.gov/files/dera/data/financial-statement-data-sets/2013q3.zip
https://www.sec.gov/files/dera/data/financial-statement-data-sets/2013q4.zip
```

Then run the following command to download the financial statements from 2013 into `financial2013` directory:
```bash
mkdir financial2013
cat financial_2013_urls_list.txt | xargs -n 1 -P 12 wget -nc -P financial2013
```

Now you should have 4 zip files downloaded in `financial2013` directory:

```bash
ls -ltrh financial2013
```

You should see:
```bash
total 242M
-rwxrwxr-x 1 nrapstin  50M Sep  5  2017 2013q1.zip
-rwxrwxr-x 1 nrapstin  50M Sep  5  2017 2013q2.zip
-rwxrwxr-x 1 nrapstin  47M Sep  5  2017 2013q3.zip
-rwxrwxr-x 1 nrapstin  47M Sep  5  2017 2013q4.zip
```

Next, we will combine the 4 zip files into one big csv file. Save the following into a new script `combine_financial.py`.

```python
# Python script to combine EDGAR finacial files from 2013 into one csv file
import pandas as pd
import numpy as np
from zipfile import ZipFile
import glob

# combine all 2013 financial statements into one df
files = glob.glob('financial2013/*.zip')

def process_your_file(f):
    zip_file = ZipFile(f)

    # read in sub.txt for each quarter
    df = pd.read_csv(zip_file.open('sub.txt'), sep='\t')
    return df


# make a list of df's to combine
frames = [ process_your_file(f) for f in files ]

# combine all df's in the list
result = pd.concat(frames)

# write out 2013 finanical data
result.to_csv('finance2013.csv')
```

Now we should have two data sets that we are going to merge using `pandas` and `dask` python packages - `logs2013-10logs.csv` and `finance2013.csv` inside `data` directory.

```bash
cd ..
ls -ltrh data/*csv
```

You should see the output:
```bash
-rwxrwxr-x 1 nrapstin operator 7.8G Jan 14 09:33 data/logs2013-10logs.csv
-rwxrwxr-x 1 nrapstin operator 9.4M Jan 14 09:59 data/finance2013.csv
```

### Profiling in python
Before we run any script, let's talk about profiling. 

#### Profiling memory
We will use [`memory_profiler` python package](https://pypi.org/project/memory-profiler/) 
to generate a memory footprint profile to compare `pandas` vs `dask` versions of the code. 
This profiler will tell you how much memory each line of your script uses. After installing the package, 
simply add a decorator (`@profile`) before the function you want to profile in your python script. Then the profile is generated 
by running `python -m memory_profiler my_script.py`. If you simply want to profile the entire script, 
like we do in this example, make your script one big function and profile that function. 


### Profiling two data sets merge
#### `pandas`

We can use `pandas` to merge the two datasets. Remember to make the whole script a function with a `@profile` decorator for 
the memory profiler to run.

Save the following script to `pandas-mem-profile.py`:
```python
#########################################
# Merge example using pandas
#########################################
@profile
def profile_func():

    # packages
    import numpy as np
    import pandas as pd
    import time

    # read in two data sets to merge
    logdata = pd.read_csv('data/logs2013-10logs.csv')

    # need to convert cik to int - otherwise get wrong merged results
    logdata['cik'] = logdata['cik'].astype('int')

    findata = pd.read_csv('data/finance2013.csv')

    # merge in pandas
    merged = logdata.merge(right=findata, on=['cik'])

    # write the merged data out
    merged.to_csv('data/mem-merged_df.csv')

if __name__ == '__main__':
    profile_func()
```


#### `dask` 
Instead, we can use `dask` to do the same merge. We substitute [dask dataframes](https://docs.dask.org/en/latest/dataframe.html) where we previously 
used `pandas` dataframes. Save this to a new file called `dask-mem-profile.py`.

```python
#########################################
# Merge example using dask
#########################################
@profile
def profile_func():

    # packages
    import numpy as np
    import dask.dataframe as dd
    import time

    # read in two data sets to merge
    logdata = dd.read_csv('data/logs2013-10logs.csv', dtype={'browser': 'object'})

    # need to convert cik to int - otherwise get wrong merged results
    logdata['cik'] = logdata['cik'].astype('int')
    findata = dd.read_csv('data/finance2013.csv')

    # merge in dask
    merged_dd = logdata.merge(right=findata, on=['cik'])

    # write the merged data out
    merged_dd.to_csv('data/mem-merged_dd.csv', single_file = True)

if __name__ == '__main__':
    profile_func()
```

We are going to run both memory profile scripts on the yen-slurm servers using [slurm scheduler](/yen/scheduler.html).
This is a slurm submission script (save it to `memory_profile.slurm`):

```bash
#!/bin/bash

#SBATCH -J profile
#SBATCH -o mem-profile-%j.out
#SBATCH --time=10:00:00
#SBATCH --mem=500G
#SBATCH --cpus-per-task=12
#SBATCH --mail-type=ALL
#SBATCH --mail-user=USER@stanford.edu

module load intel-python3
source activate dask

# memory profile
python -m memory_profiler pandas-mem-profile.py
python -m memory_profiler dask-mem-profile.py
```

Adding your email address in the slurm script will ensure you get emails when your job starts and finishes 
with an exit code as well (exit code 0 means everything worked normally and any other number means the code
crashed). 

Before you can run this script on yen-slurm, let's install the necessary python packages for the scripts to run.
You can load existing python module on the yens then create your conda environment. You only have to
create the conda environment once then you just activate it when you want to use it in the future.

To create conda environment to install `pandas`, `dask`, and `memory_profiler` packages into, run:
```bash
module load intel-python3

conda create -n dask python=3.8
source activate dask
pip install pandas dask memory_profiler
```


Now we are ready to submit the profiling scripts. To submit:

```bash
sbatch memory_profile.slurm
```

Then monitor your job with:

```bash
squeue
```

You should see your job running:

```bash
           JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
             21749    normal  profile nrapstin  R       0:07      1 yen10
```

Once the job finishes, display the out file to see the results of profiling. The name of the out file
will have the JOBID that you saw in the output from `squeue` command.

```bash
cat mem-profile-21749.out
```

You should see something like:
```bash
Filename: pandas-mem-profile.py

Line #    Mem usage    Increment  Occurences   Line Contents
============================================================
     4   19.043 MiB   19.043 MiB           1   @profile
     5                                         def profile_func():
     6
     7                                             # packages
     8   33.203 MiB   14.160 MiB           1       import numpy as np
     9   58.402 MiB   25.199 MiB           1       import pandas as pd
    10   58.402 MiB    0.000 MiB           1       import time
    11
    12                                             # read in two data sets to merge
    13 85244.812 MiB 85186.410 MiB           1       logdata = pd.read_csv('data/logs2013-10logs.csv')
    14
    15                                             # need to convert cik to int - otherwise get wrong merged results
    16 85245.402 MiB    0.590 MiB           1       logdata['cik'] = logdata['cik'].astype('int')
    17
    18 85267.191 MiB   21.789 MiB           1       findata = pd.read_csv('data/finance2013.csv')
    19
    20                                             # merge in pandas
    21 149995.457 MiB 64728.266 MiB           1       merged = logdata.merge(right=findata, on=['cik'])
    22
    23                                             # write the merged data out
    24 149995.469 MiB    0.012 MiB           1       merged.to_csv('data/mem-merged_df.csv')


Filename: dask-mem-profile.py

Line #    Mem usage    Increment  Occurences   Line Contents
============================================================
     4   19.027 MiB   19.027 MiB           1   @profile
     5                                         def profile_func():
     6
     7                                             # packages
     8   33.605 MiB   14.578 MiB           1       import numpy as np
     9   67.973 MiB   34.367 MiB           1       import dask.dataframe as dd
    10   67.973 MiB    0.000 MiB           1       import time
    11
    12                                             # read in two data sets to merge
    13   73.801 MiB    5.828 MiB           1       logdata = dd.read_csv('data/logs2013-10logs.csv', dtype={'browser': 'object'})
    14
    15                                             # need to convert cik to int - otherwise get wrong merged results
    16   73.801 MiB    0.000 MiB           1       logdata['cik'] = logdata['cik'].astype('int')
    17   75.332 MiB    1.531 MiB           1       findata = dd.read_csv('data/finance2013.csv')
    18
    19                                             # merge in dask
    20   75.332 MiB    0.000 MiB           1       merged_dd = logdata.merge(right=findata, on=['cik'])
    21
    22                                             # write the merged data out
    23 34784.383 MiB 34709.051 MiB           1       merged_dd.to_csv('data/mem-merged_dd.csv', single_file = True)
```

The first columm (`Line #`) lists the line number in the python script, the second column (`Mem usage`) 
lists total RAM used while the third column (`Increment`) lists the additional memory that is added from executing each
line of the script. We can compare `Increment` column values line by line between `pandas` and `dask` version
 of the code to see that it takes roughly half the memory for `dask` version and that `dask` does not
 actually load the datasets in memory until it needs it (at computing the write to csv command). 
 
 {% include note.html content="The total memory consumption for `pandas` script was almost 150 G while for `dask` it was under 35 G to carry out
 the same merge between two datasets." %}
 
#### Profiling speed 
Similarly, we want to see how long each line of our script takes. We will use `time` package to 
manually time data loading, merging and writing to disk calls. Python has awesome profiling
visualization tools that come in handy when you want to understand where your code is slow or fast and optimize the slow parts. 
One good profile visualization package is [SnakeViz package](https://jiffyclub.github.io/snakeviz/) that lets you visualize and
interact with the script profile in your browser. Although we will not use it in this example, I encourage you to look it up for your
next Python project especially when thinking about optimizing or rewriting your script.

#### `pandas`
Again, we use `pandas` to do all of the data loading, merging and writing to disk. Let's look at the python script
`pandas-speed-profile.py`:

```python
#########################################
# Merge example using pandas
#########################################
# packages
import numpy as np
import pandas as pd
import time

# read in two data sets to merge
print('loading log data in pandas...')
tmp = time.time()
logdata = pd.read_csv('data/logs2013-10logs.csv', dtype={'browser': 'object'})
print('log data loading took: %s seconds' % (str(time.time() - tmp)))

# need to convert cik to int - otherwise get wrong merged results
logdata['cik'] = logdata['cik'].astype('int')

print('loading finance data in pandas...')
tmp = time.time()
findata = pd.read_csv('data/finance2013.csv')
print('finance data loading took: %s seconds' % (str(time.time() - tmp)))

# merge in pandas
print('merge data sets in pandas...')
tmp = time.time()
merged = logdata.merge(right=findata, on=['cik'])
print('merging datasets took: %s seconds' % (str(time.time() - tmp)))

# write out the merged df
print('writing data sets in pandas...')
tmp = time.time()
merged.to_csv('data/merged_df.csv')
print('writing datasets took: %s seconds' % (str(time.time() - tmp)))
```


#### `dask` 
Instead, we can use `dask` to do the same merge:

```python
#########################################
# Merge example using dask
#########################################
# packages
import numpy as np
import dask.dataframe as dd
import time

# read in two data sets to merge
print('loading log data in dask...')
tmp = time.time()
logdata = dd.read_csv('data/logs2013-10logs.csv', dtype={'browser': 'object'})
print('log data loading took: %s seconds' % (str(time.time() - tmp)))

# need to convert cik to int - otherwise get wrong merged results
logdata['cik'] = logdata['cik'].astype('int')

print('loading finance data in dask...')
tmp = time.time()
findata = dd.read_csv('data/finance2013.csv')
print('finance data loading took: %s seconds' % (str(time.time() - tmp)))

# merge in dask
print('merge data sets in dask...')
tmp = time.time()
merged_dd = logdata.merge(right=findata, on=['cik'])
print('merging datasets took: %s seconds' % (str(time.time() - tmp)))

# write out the merged df
print('writing data sets in dask...')
tmp = time.time()
merged_dd.to_csv('data/merged_dd.csv', single_file=True)
print('writing datasets took: %s seconds' % (str(time.time() - tmp)))
```

We are going to run both speed profile scripts using the same conda environment `dask` and the following
 slurm submission script (save it to `speed_profile.slurm`):

```bash
#!/bin/bash

#SBATCH -J speed-profile
#SBATCH -o speed-profile-%j.out
#SBATCH --time=10:00:00
#SBATCH --mem=500G
#SBATCH --cpus-per-task=12
#SBATCH --mail-type=ALL
#SBATCH --mail-user=USER@stanford.edu

module load intel-python3
source activate dask

# speed profile
python pandas-speed-profile.py
python dask-speed-profile.py
```

To submit, run:

```bash
sbatch speed_profile.slurm
```

Then monitor your job with:

```bash
squeue
           JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
           24591    normal speed-pr nrapstin  R    1:19:16      1 yen10
```

Once the job finishes, display the out file to see the results of profiling. The name of the out file
will have the JOBID that you saw in the output from `squeue` command.

```bash
cat speed-profile-24591.out
```

You should see something like:
```bash
loading log data in pandas...
log data loading took: 175.0192587375641 seconds
loading finance data in pandas...
finance data loading took: 0.917410135269165 seconds
merge data sets in pandas...
merging datasets took: 633.4607284069061 seconds
writing data sets in pandas...
writing datasets took: 2910.702185153961 seconds
loading log data in dask...
log data loading took: 0.029045820236206055 seconds
loading finance data in dask...
finance data loading took: 0.018599510192871094 seconds
merge data sets in dask...
merging datasets took: 0.03328442573547363 seconds
writing data sets in dask...
writing datasets took: 3696.9374153614044 seconds
```

Let me summarize both output files in a table below which shows the efficiency of `dask` over `pandas`
in both speed and memory utilization:

| `pandas`                   | Memory it took  | Time it took    |
| :---                       |    :----:       |           ----:|
| Loading log data           |        85 GB    |      175.0 sec  |
| Loading finance data       |        22 MB    |       0.92 sec  |
| Merge data sets            |        65 GB    |      633.5 sec  |
| Writing merged data to disk|      0.01 MB    |     2910.7 sec  |

In comparision:

| `dask`                     | Memory it took  | Time it took    |
| :---                       |    :----:       |           ----:|
| Loading log data           |         6 MB    |       0.03 sec  |
| Loading finance data       |       1.5 MB    |       0.02 sec  |
| Merge data sets            |         0 MB    |       0.03 sec  |
| Writing merged data to disk|        35 GB    |     3696.9 sec  |

{% include note.html content="We made the `pandas` and `dask` scripts save the merged dataset as one csv file. That is not 
optimal for dask performance because dask really excels at working on chunks of the dataset in parallel
and it would improve the perfomance for dask to save the dataset in multiple chunks. So, for real projects,
dask can be optimized even further to save big on memory and speed." %}

Finally, I would like to acknowledge Sara Malik and Professor Jung Ho Choi that inspired this `dask` vs `pandas` comparison example.
