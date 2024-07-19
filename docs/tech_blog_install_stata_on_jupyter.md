---
title: How Do I Install Stata on JupyterHub?
layout: indexPages/faqs
subHeader: Data, Analytics, and Research Computing.
keywords: software, Stata, Jupyter
category: faqs
parent: faqs
section: software
order: 1
updateDate: 2022-02-24
---

# {{ page.title }}

## Step 1: Log onto the Yens

## Step 2: Install Miniconda
We are going to use a personal installation of miniconda because Anaconda3 module conda version has a known bug.

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
chmod +x Miniconda3-latest-Linux-x86_64.sh
./Miniconda3-latest-Linux-x86_64.sh
conda config --set auto_activate_base false 
```

Now that miniconda is installed, add path to miniconda to your bash profile:

```bash
echo 'export PATH=$HOME/miniconda3/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile
```


## Step 3: Load Stata and Anaconda modules

```bash
# loading stata module adds correct path to stata bin
ml statamp/17
```

{% include tip.html content="Learn more about modules on the Yens [here](/gettingStarted/5_yen_software.html)." %}


## Step 4: Make a new conda environment

```bash
# create a new conda env for the stata kernel and install necessary packages
conda create -n stata_kernel 

# activate env
source activate stata_kernel

# install stata kernel and jupyter
conda install -c conda-forge -c defaults stata_kernel jupyter 

# install Stata kernel to Jupyter
python -m stata_kernel.install
```

Before you test JupyterHub, it's important to make sure the Stata kernel is using the correct Stata executable.  

```bash
cat ~/.stata_kernel.conf

[stata_kernel]

# Path to stata executable. If you type this in your terminal, it should
# start the Stata console
stata_path = /software/non-free/stata17/stata-mp
```
If you don't see `stata_path= /software/non-free/stata17/stata-mp`, or it goes to a different path, edit the `.stata_kernel.conf` file so that it points to the path listed above.

## Step 5: Start JupyterHub

You should now see Stata kernel under Notebooks:

![](/images/stata-kernel.png)

Let's test that Stata works. Open a new Stata notebook and run:

![](/images/test-stata-kernel.png)

{% include tip.html content="Learn more about JupyterHub on the Yens [here](/yen/webBasedCompute.html)." %}

If you need to uninstall a particular Jupyter kernel, run:

```bash
# to list kernels
jupyter kernelspec list 

# to uninstall kernel called mykernel
jupyter kernelspec uninstall mykernel
```

